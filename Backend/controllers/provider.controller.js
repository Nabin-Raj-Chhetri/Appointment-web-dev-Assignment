const { Provider } = require("../models");

const getProviders = async (req, res) => {
  try {
    const providers = await Provider.findAll({ order: [["name", "ASC"]] });
    res.json(providers);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getProvider = async (req, res) => {
  try {
    const provider = await Provider.findByPk(req.params.id);
    if (!provider) return res.status(404).json({ message: "Provider not found" });
    res.json(provider);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const createProvider = async (req, res) => {
  try {
    const { name, specialisation, availableDays } = req.body;
    const provider = await Provider.create({ name, specialisation, availableDays });
    res.status(201).json({ message: "Provider created", provider });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateProvider = async (req, res) => {
  try {
    const provider = await Provider.findByPk(req.params.id);
    if (!provider) return res.status(404).json({ message: "Provider not found" });
    await provider.update(req.body);
    res.json({ message: "Provider updated", provider });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteProvider = async (req, res) => {
  try {
    const provider = await Provider.findByPk(req.params.id);
    if (!provider) return res.status(404).json({ message: "Provider not found" });
    await provider.destroy();
    res.json({ message: "Provider deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getProviders, getProvider, createProvider, updateProvider, deleteProvider };
