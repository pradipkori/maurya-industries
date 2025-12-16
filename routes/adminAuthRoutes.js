const express = require("express");
const router = express.Router();

// Admin login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    return res.json({
      success: true,
      token: "admin-authenticated", // simple token
    });
  }

  res.status(401).json({
    success: false,
    message: "Invalid admin credentials",
  });
});

module.exports = router;
