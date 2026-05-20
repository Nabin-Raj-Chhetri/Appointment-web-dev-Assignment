import { useEffect, useState } from "react";
import API from "../api";
import AdminLayout from "../components/AdminLayout";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    appointments: 0,
    services: 0,
    messages: 0,
    doctors: 0,
  });

  const [recentAppointments, setRecentAppointments] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getArray = (data) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.data)) return data.data;
    if (Array.isArray(data.appointments)) return data.appointments;
    if (Array.isArray(data.services)) return data.services;
    if (Array.isArray(data.providers)) return data.providers;
    if (Array.isArray(data.contacts)) return data.contacts;
    return [];
  };

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      const appointmentsRes = await API.get("/appointments");
      const servicesRes = await API.get("/services");
      const providersRes = await API.get("/providers");
      const contactsRes = await API.get("/contact");

      const appointments = getArray(appointmentsRes.data);
      const services = getArray(servicesRes.data);
      const providers = getArray(providersRes.data);
      const messages = getArray(contactsRes.data);

      setStats({
        appointments: appointments.length,
        services: services.length,
        messages: messages.length,
        doctors: providers.length,
      });

      setRecentAppointments(appointments.slice(0, 5));
      setContacts(messages.slice(0, 3));
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const getPatientName = (a) => a.patient?.name || a.User?.name || a.user?.name || a.patientName || "Unknown";

  const getServiceName = (a) => a.service?.name || a.Service?.name || a.serviceName || "Unknown Service";

  const getDate = (a) =>
    a.appointmentDate || a.date || a.createdAt
      ? new Date(a.appointmentDate || a.date || a.createdAt).toLocaleDateString()
      : "N/A";

  const statusClass = (status) => {
    if (status === "confirmed") return "bg-green-100 text-green-700";
    if (status === "pending") return "bg-yellow-100 text-yellow-700";
    if (status === "completed") return "bg-blue-100 text-blue-700";
    return "bg-red-100 text-red-700";
  };

  return (
    <AdminLayout title="Admin Dashboard">
      <div className="space-y-8">
        <div className="bg-gradient-to-r from-teal-700 to-teal-500 rounded-2xl p-8 text-white shadow-lg">
          <h1 className="text-4xl font-bold mb-2">Welcome Back, Admin</h1>
          <p className="text-lg opacity-90">Dashboard data fetched from backend API and MySQL database.</p>
        </div>

        {loading && <div className="bg-white rounded-2xl shadow p-6 text-slate-500">Loading dashboard data...</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <StatCard title="Appointments" value={stats.appointments} />
          <StatCard title="Services" value={stats.services} />
          <StatCard title="Messages" value={stats.messages} />
          <StatCard title="Doctors" value={stats.doctors} />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 bg-white rounded-2xl shadow p-6">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl font-bold">Recent Appointments</h2>

              <button
                onClick={loadDashboardData}
                className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
              >
                Refresh
              </button>
            </div>

            {recentAppointments.length === 0 ? (
              <p className="text-slate-500">No appointments found.</p>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b">
                    <th className="py-3">Patient</th>
                    <th>Service</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>

                <tbody>
                  {recentAppointments.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 font-medium">{getPatientName(item)}</td>
                      <td>{getServiceName(item)}</td>
                      <td>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusClass(item.status)}`}>
                          {item.status || "pending"}
                        </span>
                      </td>
                      <td>{getDate(item)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-2xl font-bold mb-5">Recent Contact Messages</h2>

            {contacts.length === 0 ? (
              <p className="text-slate-500">No messages found.</p>
            ) : (
              <div className="space-y-4">
                {contacts.map((contact) => (
                  <div key={contact.id} className="border-l-4 border-teal-600 pl-4">
                    <p className="font-semibold">{contact.subject}</p>
                    <p className="text-sm text-gray-500">
                      {contact.name} — {contact.email}
                    </p>
                    <p className="text-sm text-slate-600 mt-1 line-clamp-2">{contact.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow hover:shadow-xl transition">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-4xl font-bold text-teal-700 mt-2">{value}</h2>
    </div>
  );
}
