const jwt = require("jsonwebtoken");
const { User } = require("../models");

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });

// ── POST /api/auth/register ─────────────────────────────────
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const user = await User.create({ name, email, password, role: "patient" });
    const token = generateToken(user.id);

    res.status(201).json({
      message: "Registration successful",
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ── POST /api/auth/login ────────────────────────────────────
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Use withPassword scope to include hashed password
    const user = await User.scope("withPassword").findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user.id);

    res.json({
      message: "Login successful",
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ── GET /api/auth/me ────────────────────────────────────────
const getMe = (req, res) => {
  const { id, name, email, role, createdAt } = req.user;
  res.json({ id, name, email, role, createdAt });
};

// ── POST /api/auth/logout ───────────────────────────────────
const logout = (req, res) => {
  res.json({ message: "Logged out. Please delete your token on the client." });
};

module.exports = { register, login, getMe, logout };
