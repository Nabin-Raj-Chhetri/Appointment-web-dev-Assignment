const { Op } = require("sequelize");
const { Appointment, Service, Provider, User } = require("../models");

// Reusable include config for joins
const appointmentIncludes = [
  { model: Service, as: "service", attributes: ["id", "name", "durationMinutes"] },
  { model: Provider, as: "provider", attributes: ["id", "name", "specialisation"] },
];

// ── GET /api/appointments ───────────────────────────────────
const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      where: { userId: req.user.id },
      include: appointmentIncludes,
      order: [["appointmentDate", "ASC"]],
    });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ── GET /api/appointments/:id ───────────────────────────────
const getAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      where: { id: req.params.id, userId: req.user.id },
      include: appointmentIncludes,
    });
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ── POST /api/appointments ──────────────────────────────────
const createAppointment = async (req, res) => {
  try {
    const { serviceId, providerId, appointmentDate, notes } = req.body;

    // Check for conflicting booking (same provider + same date/time, not cancelled)
    const conflict = await Appointment.findOne({
      where: {
        providerId,
        appointmentDate: new Date(appointmentDate),
        status: { [Op.ne]: "cancelled" },
      },
    });

    if (conflict) {
      return res.status(422).json({
        message: "This time slot is already booked. Please choose another.",
      });
    }
    const existingAppointment = await Appointment.findOne({
      where: {
        providerId,
        appointmentDate,
        appointmentTime,
        status: "confirmed",
      },
    });

    if (existingAppointment) {
      return res.status(400).json({
        message: "This time slot is already booked",
      });
    }

    const appointment = await Appointment.create({
      userId: req.user.id,
      serviceId,
      providerId,
      appointmentDate,
      notes: notes || "",
    });

    // Return with joins
    const populated = await Appointment.findByPk(appointment.id, {
      include: appointmentIncludes,
    });

    res.status(201).json({ message: "Appointment booked successfully", appointment: populated });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ── PUT /api/appointments/:id — patient cancels ─────────────
const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!appointment) return res.status(404).json({ message: "Appointment not found" });
    if (appointment.status === "cancelled") {
      return res.status(400).json({ message: "Appointment is already cancelled" });
    }

    await appointment.update({ status: "cancelled" });
    res.json({ message: "Appointment cancelled successfully", appointment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ── DELETE /api/appointments/:id ────────────────────────────
const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });
    await appointment.destroy();
    res.json({ message: "Appointment deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ── ADMIN: GET /api/admin/appointments ─────────────────────
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      include: [...appointmentIncludes, { model: User, as: "user", attributes: ["id", "name", "email"] }],
      order: [["appointmentDate", "ASC"]],
    });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ── ADMIN: PUT /api/admin/appointments/:id/status ───────────
const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["pending", "confirmed", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const appointment = await Appointment.findByPk(req.params.id);
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });

    await appointment.update({ status });

    const updated = await Appointment.findByPk(appointment.id, {
      include: [...appointmentIncludes, { model: User, as: "user", attributes: ["id", "name", "email"] }],
    });

    res.json({ message: "Status updated", appointment: updated });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getMyAppointments,
  getAppointment,
  createAppointment,
  cancelAppointment,
  deleteAppointment,
  getAllAppointments,
  updateAppointmentStatus,
};
