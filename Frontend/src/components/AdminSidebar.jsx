import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <aside className="w-64 min-h-screen bg-teal-900 text-white p-6">
      <h2 className="text-2xl font-bold mb-10">Admin Panel</h2>

      <nav className="flex flex-col gap-4">
        <Link to="/admin/dashboard" className="hover:bg-teal-700 p-3 rounded-lg">
          Dashboard
        </Link>

        <Link to="/admin/appointments" className="hover:bg-teal-700 p-3 rounded-lg">
          Appointments
        </Link>

        <Link to="/admin/services" className="hover:bg-teal-700 p-3 rounded-lg">
          Services
        </Link>

        <Link to="/admin/contacts" className="hover:bg-teal-700 p-3 rounded-lg">
          Contact Messages
        </Link>
      </nav>
    </aside>
  );
}
