import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Services() {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadServices = async () => {
      try {
        const res = await API.get("/services");
        setServices(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    loadServices();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-800">Healthcare Services</h1>

          <p className="text-slate-500 mt-2">Browse healthcare services available in our clinic.</p>
        </div>

        {services.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-10 text-center">
            <h2 className="text-xl font-semibold text-slate-700">No services available</h2>

            <p className="text-slate-500 mt-2">Services added by admin will appear here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-3xl shadow-md hover:shadow-xl transition overflow-hidden border border-slate-100"
              >
                <div className="bg-gradient-to-r from-teal-700 to-emerald-600 p-6 text-white">
                  <h2 className="text-2xl font-bold">{service.name}</h2>

                  <p className="text-teal-100 mt-2">Duration: {service.durationMinutes} mins</p>
                </div>

                <div className="p-6">
                  <p className="text-slate-600 leading-7 min-h-[90px]">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
