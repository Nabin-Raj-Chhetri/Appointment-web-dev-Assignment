import { useEffect, useState } from "react";
import API from "../api";
import AdminLayout from "../components/AdminLayout";

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");

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

  const sameDate = (appointmentDate, selectedDate) => {
    if (!selectedDate) return true;

    const appointmentOnlyDate = new Date(appointmentDate).toISOString().split("T")[0];

    return appointmentOnlyDate === selectedDate;
  };

  const filteredAppointments = appointments.filter((a) => {
    const matchesStatus = filter === "all" || a.status === filter;

    const searchText = search.toLowerCase();

    const matchesSearch =
      !search ||
      a.user?.name?.toLowerCase().includes(searchText) ||
      a.user?.email?.toLowerCase().includes(searchText) ||
      a.provider?.name?.toLowerCase().includes(searchText) ||
      a.provider?.specialisation?.toLowerCase().includes(searchText);

    const matchesDate = sameDate(a.appointmentDate, dateFilter);

    return matchesStatus && matchesSearch && matchesDate;
  });

  const statusStyle = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
    completed: "bg-blue-100 text-blue-700",
  };

  const clearFilters = () => {
    setFilter("all");
    setSearch("");
    setDateFilter("");
  };

  return (
    <AdminLayout title="Admin Appointments">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Appointments</h1>
          <p className="text-slate-500 mt-1">Review, confirm, cancel, or complete patient appointment requests.</p>
        </div>

        <div className="bg-white rounded-2xl shadow p-5 space-y-4">
          <div className="flex gap-3 flex-wrap">
            {["all", "pending", "confirmed", "cancelled", "completed"].map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                aria-label={`Filter appointments by ${item} status`}
                aria-pressed={filter === item}
                className={`px-5 py-2 rounded-lg font-semibold transition focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  filter === item ? "bg-teal-700 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {item.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search patient, email, provider..."
              aria-label="Search appointments"
              className="border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />

            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              aria-label="Filter appointments by date"
              className="border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />

            <button
              onClick={clearFilters}
              className="bg-slate-700 text-white px-5 py-3 rounded-xl font-semibold hover:bg-slate-800"
            >
              Clear Filters
            </button>
          </div>

          <div className="text-sm text-slate-500">
            Showing {filteredAppointments.length} of {appointments.length} appointments
          </div>
        </div>

        <div className="max-h-[70vh] overflow-y-auto pr-2">
          {filteredAppointments.length === 0 ? (
            <div className="bg-white rounded-2xl shadow p-10 text-center">
              <h2 className="text-xl font-semibold text-slate-700">No appointments found</h2>
              <p className="text-slate-500 mt-2">No appointments match the selected filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {filteredAppointments.map((a) => (
                <div key={a.id} className="bg-white rounded-2xl shadow p-6 border border-slate-100">
                  <div className="flex justify-between gap-4 mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-slate-800">
                        {a.provider?.specialisation || "Appointment"}
                      </h2>
                      <p className="text-sm text-slate-500">Patient: {a.user?.name || "Unknown"}</p>
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
                      <b>Email:</b> {a.user?.email || "N/A"}
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
                          onClick={() => updateStatus(a.id, "confirmed")}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                        >
                          Confirm
                        </button>

                        <button
                          onClick={() => updateStatus(a.id, "cancelled")}
                          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                        >
                          Cancel
                        </button>
                      </>
                    )}

                    {a.status === "confirmed" && (
                      <>
                        <button
                          onClick={() => updateStatus(a.id, "completed")}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        >
                          Mark Completed
                        </button>

                        <button
                          onClick={() => updateStatus(a.id, "cancelled")}
                          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                        >
                          Cancel Appointment
                        </button>
                      </>
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
      </div>
    </AdminLayout>
  );
}
