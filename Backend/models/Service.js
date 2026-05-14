const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Service = sequelize.define(
  "Service",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Service name is required" },
        len: { args: [1, 100], msg: "Name cannot exceed 100 characters" },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Description is required" },
      },
    },
    durationMinutes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: { args: 10, msg: "Duration must be at least 10 minutes" },
        max: { args: 120, msg: "Duration cannot exceed 120 minutes" },
      },
    },
  },
  {
    tableName: "services",
    timestamps: true,
  },
);

module.exports = Service;
