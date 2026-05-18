import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({ children, title = "Admin Dashboard" }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-slate-100">
      <AdminSidebar />

      <div className="flex-1">
        <header className="h-20 bg-white shadow flex items-center justify-between px-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
            <p className="text-sm text-slate-500">Health Booking Admin Area</p>
          </div>

          <button
            onClick={logout}
            className="bg-teal-700 text-white px-5 py-2 rounded-lg font-semibold hover:bg-teal-800"
          >
            Logout
          </button>
        </header>

        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
