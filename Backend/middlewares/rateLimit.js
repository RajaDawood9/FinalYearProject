const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 minutes window
  max: 50,
  message: "Too many login attempts. Please try again",
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = loginLimiter;
