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

  const statusStyle = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
    completed: "bg-blue-100 text-blue-700",
  };

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-800">My Appointments</h1>
          <p className="text-slate-500 mt-2">View your appointment requests and current status.</p>
        </div>

        {appointments.length === 0 ? (
          <div className="bg-white rounded-3xl shadow p-10 text-center">
            <h2 className="text-2xl font-bold text-slate-800">No appointments yet</h2>
            <p className="text-slate-500 mt-2">Book an appointment and it will appear here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {appointments.map((a) => (
              <div
                key={a.id}
                className="bg-white rounded-3xl shadow p-6 border border-slate-100 hover:shadow-xl transition"
              >
                <div className="flex justify-between items-start gap-4 mb-5">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">
                      {a.provider?.specialisation || "Healthcare Appointment"}
                    </h2>
                    <p className="text-slate-500 mt-1">Provider: {a.provider?.name || "N/A"}</p>
                  </div>

                  <span
                    className={`px-4 py-1 rounded-full text-sm font-semibold ${
                      statusStyle[a.status] || "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {a.status}
                  </span>
                </div>

                <div className="space-y-3 text-slate-700">
                  <p>
                    <span className="font-semibold">Date & Time:</span> {new Date(a.appointmentDate).toLocaleString()}
                  </p>

                  <p>
                    <span className="font-semibold">Notes:</span> {a.notes || "No notes provided"}
                  </p>
                </div>

                <div className="mt-6 bg-slate-50 rounded-2xl p-4">
                  <p className="text-sm text-slate-500">Appointment Status</p>
                  <p className="font-semibold text-slate-800 capitalize">
                    {a.status === "pending" ? "Waiting for admin approval" : a.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
