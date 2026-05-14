const { Sequelize } = require("sequelize");

require("dotenv").config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  dialect: "mysql",
  logging: false, // set to console.log to see SQL queries
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL Connected successfully");

    // Sync all models — creates tables if they don't exist
    // Use { force: true } ONLY during development to drop & recreate tables
    await sequelize.sync({ alter: true });
    console.log("✅ Database tables synced");
  } catch (error) {
    console.error("❌ MySQL connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
