import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [accountOpen, setAccountOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const navLink = "block text-white font-medium hover:text-teal-200 transition";

  return (
    <nav className="bg-gradient-to-r from-teal-700 to-emerald-700 shadow-lg">
      <div className="px-5 md:px-10 py-4 flex justify-between items-center">
        <Link
          to={user?.role === "admin" ? "/admin/dashboard" : "/dashboard"}
          className="text-white text-2xl md:text-3xl font-bold tracking-wide"
        >
          Health Booking
        </Link>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden bg-white text-teal-700 px-4 py-2 rounded-lg font-bold"
        >
          ☰
        </button>

        <div className="hidden md:flex items-center gap-8">
          {token ? (
            <>
              {user?.role === "admin" ? (
                <Link to="/admin/dashboard" className={navLink}>
                  Admin Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/services" className={navLink}>
                    Services
                  </Link>
                  <Link to="/appointments" className={navLink}>
                    My Appointments
                  </Link>
                  <Link to="/book" className={navLink}>
                    Book Appointment
                  </Link>
                  <Link to="/contact" className={navLink}>
                    Contact
                  </Link>
                </>
              )}

              <div className="relative">
                <button
                  onClick={() => setAccountOpen(!accountOpen)}
                  className="bg-white text-teal-700 px-5 py-2 rounded-xl font-semibold hover:bg-teal-100"
                >
                  {user?.name || "Account"} ▾
                </button>

                {accountOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border z-50 overflow-hidden">
                    <div className="px-4 py-3 border-b">
                      <p className="font-semibold text-slate-800">{user?.name}</p>
                      <p className="text-sm text-slate-500">{user?.email}</p>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setAccountOpen(false)}
                      className="block px-4 py-3 text-slate-700 hover:bg-slate-100"
                    >
                      Profile
                    </Link>

                    <button onClick={logout} className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className={navLink}>
                Login
              </Link>
              <Link
                to="/register"
                className="bg-white text-teal-700 px-5 py-2 rounded-xl font-semibold hover:bg-teal-100"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden px-5 pb-5 space-y-3">
          {token ? (
            <>
              {user?.role === "admin" ? (
                <Link to="/admin/dashboard" className={navLink}>
                  Admin Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/services" className={navLink}>
                    Services
                  </Link>
                  <Link to="/appointments" className={navLink}>
                    My Appointments
                  </Link>
                  <Link to="/book" className={navLink}>
                    Book Appointment
                  </Link>
                  <Link to="/contact" className={navLink}>
                    Contact
                  </Link>
                </>
              )}

              <Link to="/profile" className={navLink}>
                Profile
              </Link>

              <button onClick={logout} className="w-full bg-white text-red-600 px-4 py-2 rounded-lg font-semibold">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={navLink}>
                Login
              </Link>
              <Link to="/register" className={navLink}>
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
