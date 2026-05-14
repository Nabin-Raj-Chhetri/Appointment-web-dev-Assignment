import { useEffect, useState } from "react";
import API from "../api";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);

  const loadAppointments = async () => {
    const res = await API.get("/appointments");
    setAppointments(res.data);
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  return (
    <div className="page">
      <h1>My Appointments</h1>

      {appointments.length === 0 && <p>No appointments yet.</p>}

      <div className="grid">
        {appointments.map((a) => (
          <div className="card" key={a.id}>
            <h2>{a.service?.name}</h2>
            <p>Provider: {a.provider?.name}</p>
            <p>Date: {new Date(a.appointmentDate).toLocaleString()}</p>
            <p>Status: {a.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
