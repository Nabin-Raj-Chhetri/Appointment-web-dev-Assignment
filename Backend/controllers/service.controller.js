const { Service } = require("../models");

const getServices = async (req, res) => {
  try {
    const services = await Service.findAll({ order: [["name", "ASC"]] });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getService = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const createService = async (req, res) => {
  try {
    const { name, description, durationMinutes } = req.body;
    const service = await Service.create({ name, description, durationMinutes });
    res.status(201).json({ message: "Service created", service });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateService = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    await service.update(req.body);
    res.json({ message: "Service updated", service });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteService = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    await service.destroy();
    res.json({ message: "Service deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getServices, getService, createService, updateService, deleteService };
