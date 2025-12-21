const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// =========================
// Middleware
// =========================
app.use(
  cors({
    origin: [
      "http://localhost:8080",
      "http://localhost:5173",
      "https://maurya-industries-1.onrender.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// 🔴 THIS WAS MISSING (VERY IMPORTANT)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// =========================
// MongoDB Connection
// =========================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => {
    console.error("MongoDB error ❌", err);
    process.exit(1);
  });

// =========================
// Test Route
// =========================
app.get("/", (req, res) => {
  res.send("Backend + MongoDB running 🚀");
});

// =========================
// Routes
// =========================

// Enquiry routes
app.use("/api/enquiries", require("./routes/enquiryRoutes"));

// Product routes
app.use("/api/products", require("./routes/productRoutes"));

// Admin auth routes
app.use("/api/admin", require("./routes/adminAuthRoutes"));

// Achievement routes
app.use("/api/achievements", require("./routes/achievementRoutes"));

// =========================
// Server Start
// =========================
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
