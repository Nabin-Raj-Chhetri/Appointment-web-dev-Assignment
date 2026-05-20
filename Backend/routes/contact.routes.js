const express = require("express");
const router = express.Router();

const { createContactMessage, getContactMessages } = require("../controllers/contact.controller");

router.post("/", createContactMessage);
router.get("/", getContactMessages);

module.exports = router;
