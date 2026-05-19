import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (form.name.trim().length < 2) {
      return "Name must be at least 2 characters";
    }

    if (!form.email.includes("@")) {
      return "Enter a valid email address";
    }

    if (form.password.length < 8) {
      return "Password must be at least 8 characters";
    }

    if (form.password !== form.confirmPassword) {
      return "Passwords do not match";
    }

    return "";
  };

  const submit = async (e) => {
    e.preventDefault();

    setError("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const res = await API.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-700 via-emerald-700 to-teal-900 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800">Create Account</h1>

          <p className="text-slate-500 mt-3">Register to book healthcare appointments</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-5">{error}</div>
        )}

        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="block mb-2 font-semibold text-slate-700">Full Name</label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-slate-700">Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-600"
              requied
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-slate-700">Password</label>

            <input
              type="password"
              placeholder="Minimum 8 characters"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
              className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-slate-700">Confirm Password</label>

            <input
              type="password"
              placeholder="Confirm your password"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({
                  ...form,
                  confirmPassword: e.target.value,
                })
              }
              className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-700 hover:bg-teal-800 text-white font-semibold py-3 rounded-xl transition disabled:opacity-70"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-slate-600">
            Already have an account?{" "}
            <Link to="/login" className="text-teal-700 font-semibold hover:text-teal-800">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
