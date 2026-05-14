// models/index.js
// Import all models and define associations here.
// This ensures foreign keys and joins work correctly with Sequelize.

const User = require("./User");
const Service = require("./Service");
const Provider = require("./Provider");
const Appointment = require("./Appointment");

// ── Associations ────────────────────────────────────────────

// A User (patient) has many Appointments
User.hasMany(Appointment, { foreignKey: "userId", as: "appointments" });
Appointment.belongsTo(User, { foreignKey: "userId", as: "user" });

// A Service has many Appointments
Service.hasMany(Appointment, { foreignKey: "serviceId", as: "appointments" });
Appointment.belongsTo(Service, { foreignKey: "serviceId", as: "service" });

// A Provider has many Appointments
Provider.hasMany(Appointment, { foreignKey: "providerId", as: "appointments" });
Appointment.belongsTo(Provider, { foreignKey: "providerId", as: "provider" });

module.exports = { User, Service, Provider, Appointment };
