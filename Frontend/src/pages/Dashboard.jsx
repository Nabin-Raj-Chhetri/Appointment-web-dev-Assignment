import { Link } from "react-router-dom";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-teal-800 via-emerald-700 to-teal-700 text-white px-8 py-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-teal-200 font-semibold mb-4">Welcome, {user?.name}</p>

            <h1 className="text-5xl font-bold leading-tight mb-6">
              Simple Healthcare Booking for Patients and Providers
            </h1>

            <p className="text-lg text-teal-50 mb-8">
              Browse services, choose a healthcare provider, and request an appointment online with admin approval.
            </p>

            <div className="flex gap-4">
              <Link
                to="/book"
                className="bg-white text-teal-700 px-7 py-3 rounded-xl font-semibold hover:bg-teal-100 transition"
              >
                Book Appointment
              </Link>

              <Link
                to="/services"
                className="border border-white px-7 py-3 rounded-xl font-semibold hover:bg-white hover:text-teal-700 transition"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="px-8 py-16">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-4xl font-bold text-slate-800 mb-5">About Our Booking System</h2>

            <p className="text-slate-600 leading-8">
              Health Booking is a full-stack healthcare appointment system designed to help patients request
              appointments with available healthcare providers. Administrators can manage services, providers, and
              appointment statuses from a secure dashboard.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-3xl font-bold text-teal-700">24/7</h3>
              <p className="text-slate-500 mt-2">Online appointment booking available anytime.</p>
            </div>

            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-3xl font-bold text-teal-700">20+</h3>
              <p className="text-slate-500 mt-2">Healthcare services available for patients.</p>
            </div>

            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-3xl font-bold text-teal-700">15+</h3>
              <p className="text-slate-500 mt-2">Experienced healthcare providers and specialists.</p>
            </div>

            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-3xl font-bold text-teal-700">100%</h3>
              <p className="text-slate-500 mt-2">Secure patient appointment management system.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="bg-white px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h2 className="text-4xl font-bold text-slate-800">What You Can Do</h2>
            <p className="text-slate-500 mt-2">Access the core features of the healthcare booking platform.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 rounded-3xl p-8 shadow">
              <h3 className="text-2xl font-bold text-slate-800 mb-3">Browse Services</h3>
              <p className="text-slate-600 mb-6">View available healthcare services managed by the admin team.</p>
              <Link to="/services" className="text-teal-700 font-semibold">
                View Services →
              </Link>
            </div>

            <div className="bg-slate-50 rounded-3xl p-8 shadow">
              <h3 className="text-2xl font-bold text-slate-800 mb-3">Book Providers</h3>
              <p className="text-slate-600 mb-6">Choose a provider based on specialisation and available days.</p>
              <Link to="/book" className="text-teal-700 font-semibold">
                Book Now →
              </Link>
            </div>

            <div className="bg-slate-50 rounded-3xl p-8 shadow">
              <h3 className="text-2xl font-bold text-slate-800 mb-3">Track Appointments</h3>
              <p className="text-slate-600 mb-6">Check whether your appointment is pending, confirmed, or cancelled.</p>
              <Link to="/appointments" className="text-teal-700 font-semibold">
                My Appointments →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="px-8 py-16">
        <div className="max-w-7xl mx-auto bg-gradient-to-r from-teal-700 to-emerald-600 rounded-3xl p-10 text-white shadow-xl">
          <h2 className="text-4xl font-bold mb-4">Need Help?</h2>
          <p className="text-teal-100 mb-8">Contact our support team for booking assistance or service information.</p>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-teal-100">Email</p>
              <p className="font-semibold">support@healthbooking.com</p>
            </div>

            <div>
              <p className="text-teal-100">Phone</p>
              <p className="font-semibold">+61 400 000 000</p>
            </div>

            <div>
              <p className="text-teal-100">Location</p>
              <p className="font-semibold">Sydney, Australia</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
