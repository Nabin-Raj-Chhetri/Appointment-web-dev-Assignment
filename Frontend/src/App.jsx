import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Services from "./pages/Services";
import Appointments from "./pages/Appointments";
import BookAppointment from "./pages/BookAppointments";
import Navbar from "./components/Navbar";
import AdminAppointments from "./pages/AdminAppointments";
import "./style.css";

function PrivateRoute({ children }) {
  return localStorage.getItem("token") ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/services"
          element={
            <PrivateRoute>
              <Services />
            </PrivateRoute>
          }
        />

        <Route
          path="/appointments"
          element={
            <PrivateRoute>
              <Appointments />
            </PrivateRoute>
          }
        />

        <Route
          path="/book"
          element={
            <PrivateRoute>
              <BookAppointment />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/appointments"
          element={
            <PrivateRoute>
              <AdminAppointments />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
