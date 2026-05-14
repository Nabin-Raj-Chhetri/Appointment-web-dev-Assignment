const jwt = require("jsonwebtoken");
const { User } = require("../models");

// ── protect: verify JWT and attach user to req ──────────────
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorised. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user from MySQL (password excluded by defaultScope)
    req.user = await User.findByPk(decoded.id);

    if (!req.user) {
      return res.status(401).json({ message: "User no longer exists." });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token is invalid or expired." });
  }
};

// ── role: restrict route to specific roles ──────────────────
const role = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Forbidden. Requires role: ${roles.join(" or ")}`,
      });
    }
    next();
  };
};

module.exports = { protect, role };
