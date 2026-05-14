import { useEffect, useState } from "react";
import API from "../api";

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    API.get("/services").then((res) => setServices(res.data));
  }, []);

  return (
    <div className="page">
      <h1>Services</h1>

      <div className="grid">
        {services.map((service) => (
          <div className="card" key={service.id}>
            <h2>{service.name}</h2>
            <p>{service.description}</p>
            <strong>{service.durationMinutes} minutes</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
