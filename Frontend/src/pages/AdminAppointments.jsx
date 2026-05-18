import { useEffect, useState } from "react";
import API from "../api";
import AdminLayout from "../components/AdminLayout";

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("all");

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

  const filteredAppointments = filter === "all" ? appointments : appointments.filter((a) => a.status === filter);

  const statusStyle = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
    completed: "bg-blue-100 text-blue-700",
  };

  return (
    <AdminLayout title="Admin Appointments">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Appointments</h1>
          <p className="text-slate-500 mt-1">Review, confirm, cancel, or complete patient appointment requests.</p>
        </div>

        <div className="flex gap-3 flex-wrap">
          {["all", "pending", "confirmed", "cancelled", "completed"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-5 py-2 rounded-lg font-semibold ${
                filter === item ? "bg-teal-700 text-white" : "bg-white text-slate-700 hover:bg-slate-100"
              }`}
            >
              {item.toUpperCase()}
            </button>
          ))}
        </div>

        {filteredAppointments.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-10 text-center">
            <h2 className="text-xl font-semibold text-slate-700">No appointments found</h2>
            <p className="text-slate-500 mt-2">No appointments match the selected status.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {filteredAppointments.map((a) => (
              <div key={a._id || a.id} className="bg-white rounded-2xl shadow p-6 border border-slate-100">
                <div className="flex justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">{a.service?.name || "Appointment"}</h2>
                    <p className="text-sm text-slate-500">Patient: {a.patient?.name || "Unknown"}</p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold h-fit ${
                      statusStyle[a.status] || "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {a.status}
                  </span>
                </div>

                <div className="space-y-2 text-slate-700">
                  <p>
                    <b>Email:</b> {a.patient?.email || "N/A"}
                  </p>
                  <p>
                    <b>Provider:</b> {a.provider?.name || "N/A"}
                  </p>
                  <p>
                    <b>Date:</b> {new Date(a.appointmentDate).toLocaleString()}
                  </p>
                </div>

                <div className="mt-5 flex gap-3 flex-wrap">
                  {a.status === "pending" && (
                    <>
                      <button
                        onClick={() => updateStatus(a._id, "confirmed")}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                      >
                        Confirm
                      </button>

                      <button
                        onClick={() => updateStatus(a._id, "cancelled")}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                      >
                        Cancel
                      </button>
                    </>
                  )}

                  {a.status === "confirmed" && (
                    <button
                      onClick={() => updateStatus(a._id, "completed")}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                      Mark Completed
                    </button>
                  )}

                  {["cancelled", "completed"].includes(a.status) && (
                    <p className="text-slate-500 font-medium">No action needed</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
