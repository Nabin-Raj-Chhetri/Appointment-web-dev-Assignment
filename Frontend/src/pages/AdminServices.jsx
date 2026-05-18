import { useEffect, useState } from "react";
import API from "../api";
import AdminLayout from "../components/AdminLayout";

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    durationMinutes: "",
  });

  const loadServices = async () => {
    const res = await API.get("/services");
    setServices(res.data);
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      durationMinutes: "",
    });

    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await API.put(`/services/${editingId}`, form);
    } else {
      await API.post("/services", form);
    }

    resetForm();
    loadServices();
  };

  const handleEdit = (service) => {
    setEditingId(service.id);

    setForm({
      name: service.name,
      description: service.description,
      durationMinutes: service.durationMinutes,
    });
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this service?")) return;

    await API.delete(`/services/${id}`);
    loadServices();
  };

  return (
    <AdminLayout title="Admin Services">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Healthcare Services</h1>
          <p className="text-slate-500 mt-1">Add, edit, and delete services used for appointment bookings.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Service name"
            className="border rounded-xl px-4 py-3"
            required
          />

          <input
            name="durationMinutes"
            value={form.durationMinutes}
            onChange={handleChange}
            placeholder="Duration minutes"
            type="number"
            className="border rounded-xl px-4 py-3"
            required
          />

          <input
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="border rounded-xl px-4 py-3"
            required
          />

          <div className="flex gap-2">
            <button type="submit" className="bg-teal-700 text-white px-5 py-3 rounded-xl hover:bg-teal-800">
              {editingId ? "Update" : "Add"}
            </button>

            {editingId && (
              <button type="button" onClick={resetForm} className="bg-slate-200 text-slate-700 px-5 py-3 rounded-xl">
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-2xl shadow p-6 border border-slate-100">
              <h2 className="text-xl font-bold text-slate-800">{service.name}</h2>

              <p className="text-slate-500 mt-2">{service.description}</p>

              <p className="mt-4 text-slate-700">
                <span className="font-semibold">Duration:</span> {service.durationMinutes} minutes
              </p>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => handleEdit(service)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(service.id)}
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
