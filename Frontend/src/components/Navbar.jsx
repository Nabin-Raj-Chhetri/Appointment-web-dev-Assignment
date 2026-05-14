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
    <nav className="nav">
      <Link to={user?.role === "admin" ? "/admin/appointments" : "/dashboard"}>Health Booking</Link>

      <div>
        {token ? (
          <>
            {user?.role === "admin" ? (
              <Link to="/admin/appointments">Admin Appointments</Link>
            ) : (
              <>
                <Link to="/services">Services</Link>
                <Link to="/appointments">My Appointments</Link>
                <Link to="/book">Book Appointment</Link>
              </>
            )}

            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">User Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
