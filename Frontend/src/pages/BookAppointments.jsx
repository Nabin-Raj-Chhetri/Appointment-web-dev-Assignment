import { useEffect, useState } from "react";
import API from "../api";

export default function BookAppointment() {
  const [services, setServices] = useState([]);
  const [providers, setProviders] = useState([]);

  const [form, setForm] = useState({
    serviceId: "",
    providerId: "",
    appointmentDate: "",
    notes: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const servicesRes = await API.get("/services");
    const providersRes = await API.get("/providers");

    setServices(servicesRes.data);
    setProviders(providersRes.data);
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/appointments", form);

      setMessage("Appointment booked successfully");

      setForm({
        serviceId: "",
        providerId: "",
        appointmentDate: "",
        notes: "",
      });
    } catch (err) {
      setMessage(err.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h1>Book Appointment</h1>

        {message && <p>{message}</p>}

        <form onSubmit={submit}>
          <label>Service</label>

          <select
            value={form.serviceId}
            onChange={(e) =>
              setForm({
                ...form,
                serviceId: e.target.value,
              })
            }
            required
          >
            <option value="">Select Service</option>

            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>

          <label>Provider</label>

          <select
            value={form.providerId}
            onChange={(e) =>
              setForm({
                ...form,
                providerId: e.target.value,
              })
            }
            required
          >
            <option value="">Select Provider</option>

            {providers.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          <label>Date & Time</label>

          <input
            type="datetime-local"
            value={form.appointmentDate}
            onChange={(e) =>
              setForm({
                ...form,
                appointmentDate: e.target.value,
              })
            }
            required
          />

          <label>Notes</label>

          <textarea
            value={form.notes}
            onChange={(e) =>
              setForm({
                ...form,
                notes: e.target.value,
              })
            }
          />

          <button type="submit">Book Appointment</button>
        </form>
      </div>
    </div>
  );
}
