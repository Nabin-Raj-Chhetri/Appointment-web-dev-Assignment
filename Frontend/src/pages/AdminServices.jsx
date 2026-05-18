import { useState } from "react";
import AdminLayout from "../components/AdminLayout";

export default function AdminServices() {
  const [services, setServices] = useState([
    {
      id: 1,
      name: "General Consultation",
      duration: "30 mins",
      price: "$50",
    },
    {
      id: 2,
      name: "Dental Checkup",
      duration: "45 mins",
      price: "$80",
    },
    {
      id: 3,
      name: "Mental Health Session",
      duration: "60 mins",
      price: "$120",
    },
  ]);

  const deleteService = (id) => {
    setServices(services.filter((s) => s.id !== id));
  };

  return (
    <AdminLayout title="Admin Services">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Healthcare Services</h1>

            <p className="text-slate-500 mt-1">Manage available healthcare services.</p>
          </div>

          <button className="bg-teal-700 text-white px-5 py-3 rounded-xl hover:bg-teal-800">+ Add Service</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-2xl shadow p-6 border border-slate-100">
              <h2 className="text-xl font-bold text-slate-800">{service.name}</h2>

              <div className="mt-4 space-y-2 text-slate-600">
                <p>
                  <span className="font-semibold">Duration:</span> {service.duration}
                </p>

                <p>
                  <span className="font-semibold">Price:</span> {service.price}
                </p>
              </div>

              <div className="mt-6 flex gap-3">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Edit</button>

                <button
                  onClick={() => deleteService(service.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
