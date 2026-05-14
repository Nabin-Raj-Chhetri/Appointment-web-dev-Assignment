const express = require("express");
const router = express.Router();
const { getProviders, getProvider } = require("../controllers/provider.controller");

router.get("/", getProviders);
router.get("/:id", getProvider);

module.exports = router;
