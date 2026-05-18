export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 px-8 py-10 mt-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">Health Booking</h2>

          <p className="text-slate-400 leading-7">
            A healthcare appointment management system for patients, providers, and administrators.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>

          <div className="space-y-2">
            <p>Services</p>
            <p>Book Appointment</p>
            <p>My Appointments</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>

          <div className="space-y-2">
            <p>support@healthbooking.com</p>
            <p>+61 400 000 000</p>
            <p>Sydney, Australia</p>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-700 mt-10 pt-5 text-center text-slate-500">
        © 2025 Health Booking System. All rights reserved.
      </div>
    </footer>
  );
}
