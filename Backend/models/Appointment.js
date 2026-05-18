const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Appointment = sequelize.define(
  "Appointment",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "services", key: "id" },
    },
    providerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "providers", key: "id" },
    },
    appointmentDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: { msg: "Enter a valid date" },
        isAfter: {
          args: new Date().toISOString(),
          msg: "Appointment date must be in the future",
        },
      },
    },
    notes: {
      type: DataTypes.TEXT,
      defaultValue: "",
    },
    status: {
      type: DataTypes.ENUM("pending", "confirmed", "cancelled"),
      defaultValue: "pending",
    },
  },
  {
    tableName: "appointments",
    timestamps: true,
  },
);

module.exports = Appointment;
