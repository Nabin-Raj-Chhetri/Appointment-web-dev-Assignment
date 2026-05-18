import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Services() {
  const [services, setServices] = useState([]);
  const [providers, setProviders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      const serviceRes = await API.get("/services");
      const providerRes = await API.get("/providers");

      setServices(serviceRes.data);
      setProviders(providerRes.data);
    };

    loadData();
  }, []);

  const findProvider = (serviceName) => {
    return providers.find((provider) => {
      const service = serviceName.toLowerCase();
      const spec = provider.specialisation.toLowerCase();

      return (
        (service.includes("general") && spec.includes("general")) ||
        (service.includes("mental") && spec.includes("mental")) ||
        (service.includes("nursing") && spec.includes("nursing")) ||
        (service.includes("physio") && spec.includes("physio")) ||
        (service.includes("diet") && spec.includes("diet"))
      );
    });
  };

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
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-800">Healthcare Services</h1>
          <p className="text-slate-500 mt-2">Browse available healthcare services and book with a suitable provider.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {services.map((service) => {
            const provider = findProvider(service.name);

            return (
              <div
                key={service.id}
                className="bg-white rounded-3xl shadow-md hover:shadow-xl transition border border-slate-100 overflow-hidden"
              >
                <div className="bg-gradient-to-r from-teal-700 to-emerald-600 p-6 text-white">
                  <h2 className="text-2xl font-bold">{service.name}</h2>
                  <p className="text-teal-100 mt-1">{service.durationMinutes} minutes</p>
                </div>

                <div className="p-6">
                  <p className="text-slate-600 min-h-20">{service.description}</p>

                  <div className="mt-5 bg-slate-50 rounded-2xl p-4 space-y-2">
                    <p className="text-sm text-slate-500">Available Provider</p>

                    <p className="font-semibold text-slate-800">{provider?.name || "Provider not assigned"}</p>

                    <p className="text-sm text-slate-600">{provider?.specialisation || "N/A"}</p>

                    <p className="text-sm text-slate-500">
                      Available: {provider?.availableDays ? formatDays(provider.availableDays) : "N/A"}
                    </p>
                  </div>

                  <button
                    onClick={() => navigate("/book")}
                    className="mt-6 w-full bg-teal-700 text-white py-3 rounded-xl font-semibold hover:bg-teal-800 transition"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {services.length === 0 && (
          <div className="bg-white rounded-2xl shadow p-10 text-center">
            <h2 className="text-xl font-semibold text-slate-700">No services available</h2>
            <p className="text-slate-500 mt-2">Services added by admin will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
