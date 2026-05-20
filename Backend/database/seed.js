const dotenv = require("dotenv");
dotenv.config();

const { connectDB, sequelize } = require("../config/db");
const { User, Service, Provider, Appointment } = require("../models");

const seed = async () => {
  try {
    await connectDB();
    console.log("✅ Connected to MySQL");

    // Clear tables
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");

    await require("../models/Appointment").destroy({
      where: {},
      truncate: true,
      force: true,
    });

    await Provider.destroy({
      where: {},
      truncate: true,
      force: true,
    });

    await Service.destroy({
      where: {},
      truncate: true,
      force: true,
    });

    await User.destroy({
      where: {},
      truncate: true,
      force: true,
    });

    await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");

    console.log("🗑️ Cleared existing data");

    // ── Users ──────────────────────────────────────────────
    await User.create({ name: "Admin User", email: "admin@healthbook.com", password: "password123", role: "admin" });
    await User.create({
      name: "Jane Patient",
      email: "patient@healthbook.com",
      password: "password123",
      role: "patient",
    });
    console.log("👤 Users seeded");

    // ── Services ───────────────────────────────────────────
    await Service.bulkCreate([
      {
        name: "General Consultation",
        description: "General GP visit for common health concerns and check-ups.",
        durationMinutes: 30,
      },
      {
        name: "Mental Health Session",
        description: "Counselling and support session with a mental health professional.",
        durationMinutes: 60,
      },
      {
        name: "Nursing Assessment",
        description: "Wound care, injections, blood pressure, and nursing support.",
        durationMinutes: 20,
      },
      { name: "Physiotherapy", description: "Physical therapy for injury recovery and mobility.", durationMinutes: 45 },
      {
        name: "Dietitian Consult",
        description: "Personalised nutrition planning and dietary advice.",
        durationMinutes: 30,
      },
    ]);
    console.log("🏥 Services seeded");

    // ── Providers ──────────────────────────────────────────
    await Provider.bulkCreate([
      {
        name: "Dr. Sarah Mitchell",
        specialisation: "General Practitioner",
        availableDays: ["Monday", "Tuesday", "Wednesday"],
      },
      { name: "Dr. James Okafor", specialisation: "Mental Health", availableDays: ["Tuesday", "Thursday"] },
      {
        name: "Nurse Emily Chen",
        specialisation: "Community Nursing",
        availableDays: ["Monday", "Wednesday", "Friday"],
      },
      { name: "Mr. Tom Wallace", specialisation: "Physiotherapy", availableDays: ["Wednesday", "Thursday", "Friday"] },
      { name: "Ms. Priya Sharma", specialisation: "Dietetics & Nutrition", availableDays: ["Monday", "Friday"] },
    ]);
    console.log("👨‍⚕️ Providers seeded");

    console.log("\n✅ Database seeded successfully!");
    console.log("─────────────────────────────────────────");
    console.log("Admin:   admin@healthbook.com   / password123");
    console.log("Patient: patient@healthbook.com / password123");
    console.log("─────────────────────────────────────────");
    process.exit(0);
  } catch (error) {
    console.error(" Seed failed:", error.message);
    process.exit(1);
  }
};

seed();
