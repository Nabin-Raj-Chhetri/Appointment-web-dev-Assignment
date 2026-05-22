import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";

const TIME_SLOTS = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
];

export default function BookAppointment() {
  const { providerId } = useParams();

  const navigate = useNavigate();

  const [provider, setProvider] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    loadProvider();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      loadBookedSlots();
      setSelectedTime("");
    }
  }, [selectedDate]);

  const loadProvider = async () => {
    try {
      const res = await API.get(`/providers/${providerId}`);
      setProvider(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadBookedSlots = async () => {
    try {
      setLoadingSlots(true);

      const res = await API.get(`/appointments/provider/${providerId}/booked-slots?date=${selectedDate}`);

      setBookedSlots(res.data || []);
    } catch (err) {
      console.log(err);
      setBookedSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  };

  const getAvailableDays = () => {
    if (!provider?.availableDays) return [];

    if (Array.isArray(provider.availableDays)) {
      return provider.availableDays;
    }

    try {
      return JSON.parse(provider.availableDays);
    } catch {
      return [];
    }
  };

  const getSelectedDay = () => {
    if (!selectedDate) return "";

    return new Date(`${selectedDate}T00:00:00`).toLocaleDateString("en-US", {
      weekday: "long",
    });
  };

  const isAvailableDay = () => {
    if (!selectedDate) return true;
    return getAvailableDays().includes(getSelectedDay());
  };

  const isPastSlot = (time) => {
    if (!selectedDate) return false;

    const slotDateTime = new Date(`${selectedDate}T${time}`);
    return slotDateTime <= new Date();
  };

  const isBooked = (time) => {
    return bookedSlots.includes(time);
  };

  const submit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!selectedDate || !selectedTime) {
      setMessage("Please select appointment date and time.");
      return;
    }

    if (!isAvailableDay()) {
      setMessage(
        `This provider is not available on ${getSelectedDay()}. Please choose: ${getAvailableDays().join(", ")}.`,
      );
      return;
    }

    if (isBooked(selectedTime)) {
      setMessage("This time slot is already booked. Please choose another.");
      return;
    }

    if (isPastSlot(selectedTime)) {
      setMessage("Appointment time must be in the future.");
      return;
    }

    try {
      setBooking(true);

      await API.post("/appointments", {
        providerId,
        appointmentDate: `${selectedDate}T${selectedTime}`,
        notes,
      });

      setMessage("Appointment confirmed successfully. Redirecting...");

      setTimeout(() => {
        navigate("/appointments");
      }, 1200);
    } catch (err) {
      setMessage(err.response?.data?.message || "Booking failed");
    } finally {
      setBooking(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-6">Book Appointment</h1>
        {provider && (
          <div className="bg-teal-50 border border-teal-100 rounded-2xl p-5 mb-6">
            <h2 className="text-2xl font-bold text-teal-800">{provider.name}</h2>

            <p className="text-slate-700 mt-1">{provider.specialisation}</p>

            <p className="mt-3 text-sm text-slate-500">Available Days:</p>

            <div className="flex flex-wrap gap-2 mt-2">
              {getAvailableDays().map((day) => (
                <span key={day} className="bg-teal-600 text-white px-3 py-1 rounded-full text-sm">
                  {day}
                </span>
              ))}
            </div>
          </div>
        )}
        {message && (
          <div className="bg-green-100 border border-green-400 text-green-800 font-bold text-center rounded-xl p-4 mb-4 shadow-md">
            {message}
          </div>
        )}{" "}
        <form onSubmit={submit} className="space-y-6">
          <div>
            <label className="block mb-2 font-semibold text-slate-700">Appointment Date</label>

            <input
              type="date"
              value={selectedDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setSelectedDate(e.target.value)}
              className={`w-full border rounded-xl px-4 py-3 ${
                selectedDate && !isAvailableDay() ? "border-red-500" : "border-slate-300"
              }`}
              required
            />

            {selectedDate && (
              <p className={`text-sm mt-2 ${isAvailableDay() ? "text-green-600" : "text-red-600"}`}>
                Selected day: {getSelectedDay()}{" "}
                {isAvailableDay() ? "is available." : `is not available. Choose: ${getAvailableDays().join(", ")}.`}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-3 font-semibold text-slate-700">Available Time Slots</label>

            {!selectedDate ? (
              <p className="text-slate-500">Select a date first.</p>
            ) : loadingSlots ? (
              <p className="text-slate-500">Loading time slots...</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {TIME_SLOTS.map((time) => {
                  const disabled = !isAvailableDay() || isBooked(time) || isPastSlot(time);

                  return (
                    <button
                      key={time}
                      type="button"
                      aria-label="Confirm appointment booking"
                      disabled={disabled}
                      onClick={() => setSelectedTime(time)}
                      className={`rounded-xl px-4 py-3 font-semibold border transition ${
                        selectedTime === time
                          ? "bg-teal-700 text-white border-teal-700"
                          : disabled
                            ? "bg-slate-200 text-slate-400 border-slate-200 cursor-not-allowed"
                            : "bg-white text-slate-700 border-slate-300 hover:bg-teal-50 hover:border-teal-600"
                      }`}
                    >
                      {time}
                      {isBooked(time) && <span className="block text-xs mt-1">Booked</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div>
            <label className="block mb-2 font-semibold text-slate-700">Notes</label>

            <textarea
              value={notes}
              aria-label="Appointment notes"
              onChange={(e) => setNotes(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 min-h-[120px]"
              placeholder="Describe your issue..."
            />
          </div>

          <button
            type="submit"
            disabled={booking || !selectedDate || !selectedTime || !isAvailableDay()}
            className={`w-full text-white font-semibold py-3 rounded-xl transition ${
              booking || !selectedDate || !selectedTime || !isAvailableDay()
                ? "bg-slate-400 cursor-not-allowed"
                : "bg-teal-700 hover:bg-teal-800"
            }`}
          >
            {booking ? "Confirming..." : "Confirm Appointment"}
          </button>
        </form>
      </div>
    </div>
  );
}
