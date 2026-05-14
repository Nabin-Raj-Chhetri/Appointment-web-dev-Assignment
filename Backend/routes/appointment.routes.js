const express = require("express");
const router = express.Router();
const {
  getMyAppointments,
  getAppointment,
  createAppointment,
  cancelAppointment,
  deleteAppointment,
} = require("../controllers/appointment.controller");
const { protect } = require("../middleware/auth");
const { appointmentRules, validate } = require("../middleware/validate");

router.use(protect);
router.get("/", getMyAppointments);
router.get("/:id", getAppointment);
router.post("/", appointmentRules, validate, createAppointment);
router.put("/:id", cancelAppointment);
router.delete("/:id", deleteAppointment);

module.exports = router;
