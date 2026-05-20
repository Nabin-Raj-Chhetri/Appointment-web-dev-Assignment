const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./config/db");
require("dotenv").config();

require("./models");

dotenv.config();

connectDB();

const app = express();
app.use(cors());

app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/services", require("./routes/service.routes"));
app.use("/api/providers", require("./routes/provider.routes"));
app.use("/api/appointments", require("./routes/appointment.routes"));
app.use("/api/admin", require("./routes/admin.routes"));
app.use("/api/contact", require("./routes/contact.routes"));

app.get("/", (req, res) => {
  res.json({ message: "Health Booking API is running " });
});

// ── Global Error Handler ────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error", error: err.message });
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
