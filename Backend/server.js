const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./config/db");
require("dotenv").config();
// Must import models/index.js so associations are registered
require("./models");

dotenv.config();

// Connect to MySQL and sync tables
connectDB();

const app = express();

// ── Middleware ──────────────────────────────────────────────
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// ── Routes ─────────────────────────────────────────────────
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/services", require("./routes/service.routes"));
app.use("/api/providers", require("./routes/provider.routes"));
app.use("/api/appointments", require("./routes/appointment.routes"));
app.use("/api/admin", require("./routes/admin.routes"));

// ── Health Check ────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ message: "Health Booking API is running ✅" });
});

// ── Global Error Handler ────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error", error: err.message });
});

// ── 404 Handler ─────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
