import { useEffect, useState } from "react";
import API from "../api";
import AdminLayout from "../components/AdminLayout";

export default function AdminProviders() {
  const [providers, setProviders] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    specialisation: "",
    availableDays: "",
  });

  const loadProviders = async () => {
    const res = await API.get("/providers");
    setProviders(res.data);
  };

  useEffect(() => {
    loadProviders();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ...form,
      availableDays: form.availableDays
        .split(",")
        .map((day) => day.trim())
        .filter(Boolean),
    };

    if (editingId) {
      await API.put(`/providers/${editingId}`, data);
    } else {
      await API.post("/providers", data);
    }

    setForm({ name: "", specialisation: "", availableDays: "" });
    setEditingId(null);
    loadProviders();
  };

  const handleEdit = (provider) => {
    setEditingId(provider.id);
    setForm({
      name: provider.name,
      specialisation: provider.specialisation,
      availableDays: Array.isArray(provider.availableDays)
        ? provider.availableDays.join(", ")
        : JSON.parse(provider.availableDays).join(", "),
    });
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this provider?")) return;
    await API.delete(`/providers/${id}`);
    loadProviders();
  };

  const showDays = (days) => {
    if (Array.isArray(days)) return days.join(", ");
    try {
      return JSON.parse(days).join(", ");
    } catch {
      return days;
    }
  };

  return (
    <AdminLayout title="Admin Providers">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Providers</h1>
          <p className="text-slate-500 mt-1">Manage doctors, specialisations, and available working days.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Provider name"
            className="border rounded-xl px-4 py-3"
            required
          />

          <input
            value={form.specialisation}
            onChange={(e) => setForm({ ...form, specialisation: e.target.value })}
            placeholder="Specialisation"
            className="border rounded-xl px-4 py-3"
            required
          />

          <input
            value={form.availableDays}
            onChange={(e) => setForm({ ...form, availableDays: e.target.value })}
            placeholder="Monday, Tuesday, Friday"
            className="border rounded-xl px-4 py-3"
            required
          />

          <button type="submit" className="bg-teal-700 text-white px-5 py-3 rounded-xl hover:bg-teal-800">
            {editingId ? "Update" : "Add Provider"}
          </button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {providers.map((provider) => (
            <div key={provider.id} className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-xl font-bold text-slate-800">{provider.name}</h2>

              <p className="text-slate-600 mt-2">{provider.specialisation}</p>

              <p className="text-sm text-slate-500 mt-3">Available: {showDays(provider.availableDays)}</p>

              <div className="mt-6 flex gap-3">
                <button onClick={() => handleEdit(provider)} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(provider.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg"
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
