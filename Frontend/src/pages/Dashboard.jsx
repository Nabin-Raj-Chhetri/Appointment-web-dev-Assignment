export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="page">
      <h1>Dashboard</h1>
      <div className="card">
        <h2>Welcome, {user?.name}</h2>
        <p>Email: {user?.email}</p>
        <p>Role: {user?.role}</p>
      </div>
    </div>
  );
}
