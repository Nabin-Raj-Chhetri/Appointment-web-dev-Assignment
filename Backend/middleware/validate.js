const { body, validationResult } = require("express-validator");

// Run validation — return errors if any
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

const registerRules = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 100 })
    .withMessage("Max 100 characters"),
  body("email").trim().notEmpty().withMessage("Email is required").isEmail().withMessage("Enter a valid email"),
  body("password").notEmpty().withMessage("Password is required").isLength({ min: 8 }).withMessage("Min 8 characters"),
];

const loginRules = [
  body("email").trim().notEmpty().withMessage("Email is required").isEmail().withMessage("Enter a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

const appointmentRules = [
  body("serviceId").notEmpty().withMessage("Service is required").isInt().withMessage("Invalid service ID"),
  body("providerId").notEmpty().withMessage("Provider is required").isInt().withMessage("Invalid provider ID"),
  body("appointmentDate")
    .notEmpty()
    .withMessage("Appointment date is required")
    .isISO8601()
    .withMessage("Enter a valid date")
    .custom((value) => {
      if (new Date(value) <= new Date()) {
        throw new Error("Appointment date must be in the future");
      }
      return true;
    }),
  body("notes").optional().isLength({ max: 500 }).withMessage("Notes cannot exceed 500 characters"),
];

module.exports = { validate, registerRules, loginRules, appointmentRules };
