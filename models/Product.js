const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    // =========================
    // Basic Info
    // =========================
    name: {
      type: String,
      required: true,
      trim: true,
    },

    model: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    // =========================
    // Description
    // =========================
    shortDesc: {
      type: String,
      trim: true,
      default: "",
    },

    // =========================
    // Image (Cloudinary URL)
    // =========================
    imageUrl: {
      type: String,
      required: true, // 🔴 IMPORTANT
    },

    // =========================
    // Technical Specifications
    // =========================
    specs: {
      bladeLength: { type: String, default: "" },
      power: { type: String, default: "" },
      capacity: { type: String, default: "" },
      throatSize: { type: String, default: "" },
      rotorSpeed: { type: String, default: "" },
      weight: { type: String, default: "" },
    },

    // =========================
    // Features
    // =========================
    features: {
      type: [String],
      default: [],
    },

    // =========================
    // Price
    // =========================
    price: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
