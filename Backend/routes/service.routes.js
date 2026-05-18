const express = require("express");
const sRouter = express.Router();

const {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
} = require("../controllers/service.controller");

// Public/patient routes
sRouter.get("/", getServices);
sRouter.get("/:id", getService);

// Admin CRUD routes
sRouter.post("/", createService);
sRouter.put("/:id", updateService);
sRouter.delete("/:id", deleteService);

module.exports = sRouter;
