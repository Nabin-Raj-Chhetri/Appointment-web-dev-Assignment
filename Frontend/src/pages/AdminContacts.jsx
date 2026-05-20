import { useEffect, useState } from "react";
import API from "../api";
import AdminLayout from "../components/AdminLayout";

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadContacts = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await API.get("/contact");
      setContacts(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch contact messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  return (
    <AdminLayout title="Admin Contacts">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Contact Messages</h1>
          <p className="text-slate-500 mt-1">View messages submitted by users through the contact form.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow p-6 border border-slate-100">
            <p className="text-slate-500">Total Messages</p>
            <h2 className="text-3xl font-bold text-teal-700 mt-2">{contacts.length}</h2>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4 font-semibold">{error}</div>
        )}

        <div className="bg-white rounded-2xl shadow border border-slate-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Submitted Messages</h2>
              <p className="text-slate-500 text-sm mt-1">Messages are fetched from the MySQL contact_messages table.</p>
            </div>
          </div>

          {loading ? (
            <div className="p-8 text-slate-500">Loading contact messages...</div>
          ) : contacts.length === 0 ? (
            <div className="p-8 text-slate-500">No contact messages found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-100 text-slate-700">
                  <tr>
                    <th className="px-6 py-4 font-semibold">ID</th>
                    <th className="px-6 py-4 font-semibold">Name</th>
                    <th className="px-6 py-4 font-semibold">Email</th>
                    <th className="px-6 py-4 font-semibold">Subject</th>
                    <th className="px-6 py-4 font-semibold">Message</th>
                    <th className="px-6 py-4 font-semibold">Date</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {contacts.map((contact) => (
                    <tr key={contact.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 text-slate-700">{contact.id}</td>

                      <td className="px-6 py-4">
                        <span className="font-semibold text-slate-800">{contact.name}</span>
                      </td>

                      <td className="px-6 py-4 text-slate-600">{contact.email}</td>

                      <td className="px-6 py-4">
                        <span className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-sm font-semibold">
                          {contact.subject}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-slate-600 max-w-md">{contact.message}</td>

                      <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                        {contact.createdAt ? new Date(contact.createdAt).toLocaleString() : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
