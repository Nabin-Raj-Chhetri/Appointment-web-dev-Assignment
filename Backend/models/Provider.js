const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Provider = sequelize.define(
  "Provider",
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
        notEmpty: { msg: "Provider name is required" },
      },
    },
    specialisation: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Specialisation is required" },
      },
    },
    // Store as JSON string — MySQL doesn't have native array type
    availableDays: {
      type: DataTypes.TEXT,
      allowNull: false,
      // Parse on read, stringify on write
      get() {
        const raw = this.getDataValue("availableDays");
        try {
          return JSON.parse(raw);
        } catch {
          return [];
        }
      },
      set(value) {
        this.setDataValue("availableDays", JSON.stringify(value));
      },
    },
  },
  {
    tableName: "providers",
    timestamps: true,
  },
);

module.exports = Provider;
