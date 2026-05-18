import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-teal-700 to-emerald-700 shadow-lg px-10 py-4 flex justify-between items-center">
      {/* Logo */}
      <Link
        to={user?.role === "admin" ? "/admin/appointments" : "/dashboard"}
        className="text-white text-3xl font-bold tracking-wide hover:text-teal-200 transition"
      >
        Health Booking
      </Link>

      {/* Navigation */}
      <div className="flex items-center gap-8">
        {token ? (
          <>
            {/* Admin Links */}
            {user?.role === "admin" ? (
              <Link to="/admin/appointments" className="text-white font-medium hover:text-teal-200 transition">
                Admin Appointments
              </Link>
            ) : (
              <>
                {/* Patient Links */}
                <Link to="/services" className="text-white font-medium hover:text-teal-200 transition">
                  Services
                </Link>

                <Link to="/appointments" className="text-white font-medium hover:text-teal-200 transition">
                  My Appointments
                </Link>

                <Link to="/book" className="text-white font-medium hover:text-teal-200 transition">
                  Book Appointment
                </Link>
              </>
            )}

            {/* Logout Button */}
            <button
              onClick={logout}
              className="bg-white text-teal-700 px-5 py-2 rounded-xl font-semibold hover:bg-teal-100 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {/* Public Links */}
            <Link to="/login" className="text-white font-medium hover:text-teal-200 transition">
              User Login
            </Link>

            <Link
              to="/register"
              className="bg-white text-teal-700 px-5 py-2 rounded-xl font-semibold hover:bg-teal-100 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
