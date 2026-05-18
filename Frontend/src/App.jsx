import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Services from "./pages/Services";
import Appointments from "./pages/Appointments";
import BookAppointment from "./pages/BookAppointments";

import AdminDashboard from "./pages/AdminDashboard";
import AdminAppointments from "./pages/AdminAppointments";
import AdminServices from "./pages/AdminServices";
import AdminContacts from "./pages/AdminContacts";

import Navbar from "./components/Navbar";
import "./style.css";

function PrivateRoute({ children }) {
  return localStorage.getItem("token") ? children : <Navigate to="/login" />;
}

function AdminRoute({ children }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) {
    return <Navigate to="/login" />;
  }

  return user?.role === "admin" ? children : <Navigate to="/dashboard" />;
}

export default function App() {
  return (
    <BrowserRouter>
      {!window.location.pathname.startsWith("/admin") && <Navbar />}
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
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/appointments"
          element={
            <AdminRoute>
              <AdminAppointments />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/services"
          element={
            <AdminRoute>
              <AdminServices />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/contacts"
          element={
            <AdminRoute>
              <AdminContacts />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
