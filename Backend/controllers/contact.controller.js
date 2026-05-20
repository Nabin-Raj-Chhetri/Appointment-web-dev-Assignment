const { Contact } = require("../models");

exports.createContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    res.status(201).json({
      message: "Message sent successfully",
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to send message",
      error: error.message,
    });
  }
};

exports.getContactMessages = async (req, res) => {
  try {
    const messages = await Contact.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.json(messages);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch contact messages",
      error: error.message,
    });
  }
};
