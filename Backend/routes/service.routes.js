// ── service.routes.js ───────────────────────────────────────
const express = require("express");
const sRouter = express.Router();
const { getServices, getService } = require("../controllers/service.controller");
sRouter.get("/", getServices);
sRouter.get("/:id", getService);
module.exports = sRouter;

// NOTE: Save the sections below as separate files:
// routes/provider.routes.js
// routes/appointment.routes.js
// routes/admin.routes.js
