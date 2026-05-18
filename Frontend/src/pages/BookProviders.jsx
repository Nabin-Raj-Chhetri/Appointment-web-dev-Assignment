import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function BookProviders() {
  const [providers, setProviders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/providers").then((res) => setProviders(res.data));
  }, []);

  const formatDays = (days) => {
    try {
      return JSON.parse(days).join(", ");
    } catch {
      return days;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-10 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-800">Book Appointment</h1>
        <p className="text-slate-500 mt-2 mb-10">Choose a provider and book an available appointment.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {providers.map((provider) => (
            <div
              key={provider.id}
              className="bg-white rounded-3xl shadow-md hover:shadow-xl transition overflow-hidden"
            >
              <div className="bg-gradient-to-r from-teal-700 to-emerald-600 p-6 text-white">
                <h2 className="text-2xl font-bold">{provider.name}</h2>
                <p className="text-teal-100">{provider.specialisation}</p>
              </div>

              <div className="p-6">
                <div className="bg-slate-50 rounded-2xl p-4">
                  <p className="text-sm text-slate-500">Available Days</p>
                  <p className="font-semibold text-slate-800">{formatDays(provider.availableDays)}</p>
                </div>

                <button
                  onClick={() => navigate(`/book/${provider.id}`)}
                  className="mt-6 w-full bg-teal-700 text-white py-3 rounded-xl font-semibold hover:bg-teal-800"
                >
                  Book with {provider.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
