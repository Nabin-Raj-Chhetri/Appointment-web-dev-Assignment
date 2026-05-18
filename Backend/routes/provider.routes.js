// routes/provider.routes.js
const express = require("express");
const router = express.Router();

const {
  getProviders,
  getProvider,
  createProvider,
  updateProvider,
  deleteProvider,
} = require("../controllers/provider.controller");

router.get("/", getProviders);
router.get("/:id", getProvider);
router.post("/", createProvider);
router.put("/:id", updateProvider);
router.delete("/:id", deleteProvider);

module.exports = router;
