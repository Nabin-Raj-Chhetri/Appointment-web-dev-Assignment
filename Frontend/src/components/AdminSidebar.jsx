import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <aside className="w-64 min-h-screen bg-teal-900 text-white p-6">
      <h2 className="text-2xl font-bold mb-10">Admin Panel</h2>

      <nav className="flex flex-col gap-3">
        <Link className="p-3 rounded-lg hover:bg-teal-700" to="/admin/dashboard">
          Dashboard
        </Link>

        <Link className="p-3 rounded-lg hover:bg-teal-700" to="/admin/appointments">
          Appointments
        </Link>

        <Link className="p-3 rounded-lg hover:bg-teal-700" to="/admin/providers">
          Providers
        </Link>

        <Link className="p-3 rounded-lg hover:bg-teal-700" to="/admin/services">
          Services
        </Link>

        <Link className="p-3 rounded-lg hover:bg-teal-700" to="/admin/contacts">
          Contact Messages
        </Link>
      </nav>
    </aside>
  );
}
