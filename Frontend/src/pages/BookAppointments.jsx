import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

export default function BookAppointment() {
  const { providerId } = useParams();

  const [provider, setProvider] = useState(null);

  const [form, setForm] = useState({
    providerId: providerId,
    appointmentDate: "",
    notes: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    loadProvider();
  }, []);

  const loadProvider = async () => {
    try {
      const res = await API.get(`/providers/${providerId}`);
      setProvider(res.data);
    } catch (err) {
      console.log(err);
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
    if (!form.appointmentDate) return "";

    return new Date(form.appointmentDate).toLocaleDateString("en-US", {
      weekday: "long",
    });
  };

  const isAvailableDay = () => {
    if (!form.appointmentDate) return true;

    return getAvailableDays().includes(getSelectedDay());
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!isAvailableDay()) {
      setMessage(
        `This provider is not available on ${getSelectedDay()}. Please choose: ${getAvailableDays().join(", ")}.`,
      );
      return;
    }

    try {
      await API.post("/appointments", form);

      setMessage("Appointment booked successfully");

      setForm({
        providerId: providerId,
        appointmentDate: "",
        notes: "",
      });
    } catch (err) {
      setMessage(err.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-6">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-6">Book Appointment</h1>

        {provider && (
          <div className="bg-teal-50 border border-teal-100 rounded-2xl p-5 mb-6">
            <h2 className="text-2xl font-bold text-teal-800">{provider.name}</h2>

            <p className="text-slate-700 mt-1">{provider.specialisation}</p>

            <p className="mt-3 text-sm text-slate-500">Available Days:</p>

            <div className="flex flex-wrap gap-2 mt-2">
              {getAvailableDays().map((day, index) => (
                <span key={index} className="bg-teal-600 text-white px-3 py-1 rounded-full text-sm">
                  {day}
                </span>
              ))}
            </div>
          </div>
        )}

        {message && <div className="bg-slate-100 rounded-xl p-3 mb-4 text-slate-700">{message}</div>}

        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="block mb-2 font-semibold text-slate-700">Appointment Date & Time</label>

            <input
              type="datetime-local"
              value={form.appointmentDate}
              onChange={(e) =>
                setForm({
                  ...form,
                  appointmentDate: e.target.value,
                })
              }
              className={`w-full border rounded-xl px-4 py-3 ${
                form.appointmentDate && !isAvailableDay() ? "border-red-500" : "border-slate-300"
              }`}
              required
            />

            {form.appointmentDate && (
              <p className={`text-sm mt-2 ${isAvailableDay() ? "text-green-600" : "text-red-600"}`}>
                Selected day: {getSelectedDay()}{" "}
                {isAvailableDay() ? "is available." : `is not available. Choose: ${getAvailableDays().join(", ")}.`}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-semibold text-slate-700">Notes</label>

            <textarea
              value={form.notes}
              onChange={(e) =>
                setForm({
                  ...form,
                  notes: e.target.value,
                })
              }
              className="w-full border border-slate-300 rounded-xl px-4 py-3 min-h-[120px]"
              placeholder="Describe your issue..."
            />
          </div>

          <button
            type="submit"
            disabled={form.appointmentDate && !isAvailableDay()}
            className={`w-full text-white font-semibold py-3 rounded-xl transition ${
              form.appointmentDate && !isAvailableDay()
                ? "bg-slate-400 cursor-not-allowed"
                : "bg-teal-700 hover:bg-teal-800"
            }`}
          >
            Confirm Appointment
          </button>
        </form>
      </div>
    </div>
  );
}
