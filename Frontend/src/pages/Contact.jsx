import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const response = await fetch("http://localhost:8000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus(data.message || "Something went wrong");
      }
    } catch {
      setStatus("Server error");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-14">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10">
          <h1 className="text-5xl font-extrabold text-slate-800">Contact Us</h1>
          <p className="mt-3 text-lg text-slate-500">
            Send us your questions, appointment issues, or service feedback.
          </p>
        </div>

        <div className="overflow-hidden rounded-[28px] bg-white shadow-lg">
          <div className="bg-gradient-to-r from-teal-700 to-emerald-600 px-8 py-8">
            <h2 className="text-3xl font-bold text-white">Health Booking Support</h2>
            <p className="mt-2 text-teal-50">Our team will review your message and respond as soon as possible.</p>
          </div>

          <div className="p-8">
            {status === "success" && (
              <div className="mb-6 rounded-2xl bg-emerald-50 px-5 py-4 font-semibold text-emerald-700">
                Message sent successfully.
              </div>
            )}

            {status && status !== "success" && (
              <div className="mb-6 rounded-2xl bg-red-50 px-5 py-4 font-semibold text-red-700">{status}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="mb-2 block font-semibold text-slate-700">Full Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl bg-slate-50 px-5 py-4 text-slate-800 outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-teal-600"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold text-slate-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl bg-slate-50 px-5 py-4 text-slate-800 outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-teal-600"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold text-slate-700">Subject</label>
                <input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl bg-slate-50 px-5 py-4 text-slate-800 outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-teal-600"
                  placeholder="Enter message subject"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold text-slate-700">Message</label>
                <textarea
                  rows="6"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full resize-none rounded-2xl bg-slate-50 px-5 py-4 text-slate-800 outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-teal-600"
                  placeholder="Write your message..."
                />
              </div>

              <button
                disabled={loading}
                className="w-full rounded-2xl bg-teal-700 px-6 py-4 font-bold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
