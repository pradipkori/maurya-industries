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
      "http://localhost:8080",            // local Vite
      "http://localhost:5173",            // local Vite (alt)
      "https://maurya-industries-1.onrender.com" // production frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

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
const enquiryRoutes = require("./routes/enquiryRoutes");
app.use("/api/enquiries", enquiryRoutes);

// Product routes
const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);

// AUTH ROUTES

const adminAuthRoutes = require("./routes/adminAuthRoutes");
app.use("/api/admin", adminAuthRoutes);

// ACHIEVEMENT ROUTE

const achievementRoutes = require("./routes/achievementRoutes");
app.use("/api/achievements", achievementRoutes);



// =========================
// Server Start
// =========================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
