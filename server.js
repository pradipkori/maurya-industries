const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// =========================
// Middleware (ORDER MATTERS)
// =========================
app.use(
  cors({
    origin: [
      "http://localhost:8080",
      "http://localhost:5173",
      "https://maurya-industries-1.onrender.com",
       "https://maurya-industries.com",
      "https://www.maurya-industries.com"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ REQUIRED for multer + multipart/form-data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// =========================
// Request Logger (safe)
// =========================
if (process.env.NODE_ENV !== "production") {
  app.use((req, res, next) => {
    console.log(`➡️ ${req.method} ${req.originalUrl}`);
    next();
  });
}

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
// Health Check Route
// =========================
app.get("/", (req, res) => {
  res.status(200).send("Backend + MongoDB running 🚀");
});

// =========================
// Routes
// =========================
app.use("/api/enquiries", require("./routes/enquiryRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/admin", require("./routes/adminAuthRoutes"));
app.use("/api/achievements", require("./routes/achievementRoutes"));

// =========================
// Global Error Handler (prevents crash)
// =========================
app.use((err, req, res, next) => {
  console.error("🔥 UNHANDLED ERROR:", err);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

// =========================
// Server Start (Render-safe)
// =========================
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
