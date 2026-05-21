const { Op } = require("sequelize");
const { Appointment, Service, Provider, User } = require("../models");

// Reusable include config for joins
const appointmentIncludes = [{ model: Provider, as: "provider", attributes: ["id", "name", "specialisation"] }];

// Get Appoiuntments
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

// Get single appountment
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

// create appointments
const createAppointment = async (req, res) => {
  try {
    const { providerId, appointmentDate, notes } = req.body;

    if (!providerId || !appointmentDate) {
      return res.status(400).json({
        message: "Provider and appointment date are required",
      });
    }

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

    const appointment = await Appointment.create({
      userId: req.user.id,
      providerId,
      appointmentDate,
      notes: notes || "",
      status: "pending",
    });

    const populated = await Appointment.findByPk(appointment.id, {
      include: appointmentIncludes,
    });

    res.status(201).json({
      message: "Appointment request submitted successfully",
      appointment: populated,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// update appointments
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

// delete appointments
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

const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["pending", "confirmed", "cancelled", "completed"].includes(status)) {
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

const getBookedSlotsByProvider = async (req, res) => {
  try {
    const { providerId } = req.params;
    const { date } = req.query;

    if (!providerId || !date) {
      return res.status(400).json({ message: "Provider ID and date are required" });
    }

    const startOfDay = new Date(`${date}T00:00:00`);
    const endOfDay = new Date(`${date}T23:59:59`);

    const appointments = await Appointment.findAll({
      where: {
        providerId,
        appointmentDate: {
          [Op.between]: [startOfDay, endOfDay],
        },
        status: {
          [Op.ne]: "cancelled",
        },
      },
      attributes: ["appointmentDate"],
    });

    const bookedSlots = appointments.map((item) => {
      const d = new Date(item.appointmentDate);
      return d.toTimeString().slice(0, 5);
    });

    res.json(bookedSlots);
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
  getBookedSlotsByProvider,
};
