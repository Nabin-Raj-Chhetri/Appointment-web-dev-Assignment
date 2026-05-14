import { useEffect, useState } from "react";
import API from "../api";

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);

  const loadAppointments = async () => {
    const res = await API.get("/admin/appointments");
    setAppointments(res.data);
  };

  const updateStatus = async (id, status) => {
    await API.put(`/admin/appointments/${id}/status`, { status });
    loadAppointments();
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  return (
    <div className="page">
      <h1>Admin Appointment Verification</h1>

      <div className="grid">
        {appointments.map((a) => (
          <div className="card" key={a.id}>
            <h2>{a.service?.name}</h2>
            <p>Patient: {a.user?.name}</p>
            <p>Email: {a.user?.email}</p>
            <p>Provider: {a.provider?.name}</p>
            <p>Date: {new Date(a.appointmentDate).toLocaleString()}</p>
            <p>Status: {a.status}</p>

            <button onClick={() => updateStatus(a.id, "confirmed")}>Confirm</button>

            <button onClick={() => updateStatus(a.id, "cancelled")}>Cancel</button>
          </div>
        ))}
      </div>
    </div>
  );
}
