const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    // Basic Info
    name: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },

    // Description
    shortDesc: {
      type: String,
    },

    // Image
    imageUrl: {
      type: String,
    },

    // Technical Specifications
    specs: {
      bladeLength: String,
      power: String,
      capacity: String,
      throatSize: String,
      rotorSpeed: String,
      weight: String,
    },

    // Features list
    features: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
