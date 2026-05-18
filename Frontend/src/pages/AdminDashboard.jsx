import AdminLayout from "../components/AdminLayout";

export default function AdminDashboard() {
  const stats = [
    { title: "Appointments", value: 24 },
    { title: "Services", value: 8 },
    { title: "Messages", value: 12 },
    { title: "Doctors", value: 5 },
  ];

  const appointments = [
    {
      patient: "Babin",
      service: "Dental Checkup",
      status: "Confirmed",
      date: "20 May 2026",
    },
    {
      patient: "John Doe",
      service: "Eye Consultation",
      status: "Pending",
      date: "22 May 2026",
    },
    {
      patient: "Sarah",
      service: "General Checkup",
      status: "Cancelled",
      date: "23 May 2026",
    },
  ];

  return (
    <AdminLayout title="Admin Dashboard">
      <div className="space-y-8">
        {/* Welcome */}
        <div className="bg-gradient-to-r from-teal-700 to-teal-500 rounded-2xl p-8 text-white shadow-lg">
          <h1 className="text-4xl font-bold mb-2">Welcome Back, Admin 👋</h1>

          <p className="text-lg opacity-90">Manage appointments, services, users and monitor healthcare activities.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {stats.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow hover:shadow-xl transition">
              <p className="text-gray-500 text-sm">{item.title}</p>

              <h2 className="text-4xl font-bold text-teal-700 mt-2">{item.value}</h2>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Appointments Table */}
          <div className="xl:col-span-2 bg-white rounded-2xl shadow p-6">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl font-bold">Recent Appointments</h2>

              <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700">View All</button>
            </div>

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
                {appointments.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-4 font-medium">{item.patient}</td>

                    <td>{item.service}</td>

                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          item.status === "Confirmed"
                            ? "bg-green-100 text-green-700"
                            : item.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td>{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Activity */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-2xl font-bold mb-5">Recent Activity</h2>

            <div className="space-y-4">
              <div className="border-l-4 border-teal-600 pl-4">
                <p className="font-semibold">New Appointment Booked</p>

                <p className="text-sm text-gray-500">Babin booked a dental consultation.</p>
              </div>

              <div className="border-l-4 border-blue-600 pl-4">
                <p className="font-semibold">Service Updated</p>

                <p className="text-sm text-gray-500">Eye consultation timing changed.</p>
              </div>

              <div className="border-l-4 border-red-600 pl-4">
                <p className="font-semibold">Appointment Cancelled</p>

                <p className="text-sm text-gray-500">Sarah cancelled her booking.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-2xl font-bold mb-5">Quick Actions</h2>

          <div className="flex flex-wrap gap-4">
            <button className="bg-teal-600 text-white px-6 py-3 rounded-xl hover:bg-teal-700">Add Service</button>

            <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700">View Reports</button>

            <button className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700">Manage Users</button>

            <button className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700">Contact Requests</button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
