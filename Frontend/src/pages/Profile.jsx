import { Link } from "react-router-dom";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen bg-slate-100 px-8 py-10">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="bg-gradient-to-r from-teal-700 to-emerald-600 rounded-3xl p-8 text-white shadow-xl">
          <h1 className="text-4xl font-bold mb-2">Welcome, {user?.name}</h1>
          <p className="text-teal-100">Manage your healthcare appointments from one place.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-slate-500">Account Role</p>
            <h2 className="text-2xl font-bold text-teal-700 capitalize">{user?.role}</h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-slate-500">Email</p>
            <h2 className="text-lg font-semibold text-slate-800">{user?.email}</h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-slate-500">Status</p>
            <h2 className="text-2xl font-bold text-green-600">Active</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Quick Actions</h2>

            <div className="grid gap-4">
              <Link
                to="/services"
                className="bg-teal-700 text-white px-5 py-4 rounded-xl font-semibold hover:bg-teal-800 transition"
              >
                View Healthcare Services
              </Link>

              <Link
                to="/book"
                className="bg-emerald-600 text-white px-5 py-4 rounded-xl font-semibold hover:bg-emerald-700 transition"
              >
                Book Appointment
              </Link>

              <Link
                to="/appointments"
                className="bg-slate-800 text-white px-5 py-4 rounded-xl font-semibold hover:bg-slate-900 transition"
              >
                My Appointments
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Profile Summary</h2>

            <div className="space-y-4 text-slate-700">
              <p>
                <span className="font-semibold">Name:</span> {user?.name}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {user?.email}
              </p>
              <p>
                <span className="font-semibold">Role:</span> {user?.role}
              </p>
            </div>

            <div className="mt-6 bg-teal-50 border border-teal-100 rounded-xl p-4 text-teal-800">
              Your account is ready to book and manage appointments.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
