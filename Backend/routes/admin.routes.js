const express = require("express");
const router = express.Router();
const { protect, role } = require("../middleware/auth");
const { getAllAppointments, updateAppointmentStatus } = require("../controllers/appointment.controller");
const { createService, updateService, deleteService } = require("../controllers/service.controller");
const { createProvider, updateProvider, deleteProvider } = require("../controllers/provider.controller");

// All admin routes require login + admin role
router.use(protect, role("admin"));

router.get("/appointments", getAllAppointments);
router.put("/appointments/:id/status", updateAppointmentStatus);

router.post("/services", createService);
router.put("/services/:id", updateService);
router.delete("/services/:id", deleteService);

router.post("/providers", createProvider);
router.put("/providers/:id", updateProvider);
router.delete("/providers/:id", deleteProvider);

module.exports = router;
