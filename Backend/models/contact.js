const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Contact = sequelize.define(
  "Contact",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    subject: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "contact_messages",
    timestamps: true,
  },
);

module.exports = Contact;
