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
    // MAIN IMAGE (Backward Compatibility)
    // =========================
    imageUrl: {
      type: String,
      required: true, // 🔴 KEEPING THIS SO NOTHING BREAKS
    },

    // =========================
    // MEDIA (Images + Videos - Cloudinary)
    // =========================
    media: [
      {
        url: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          enum: ["image", "video"],
          required: true,
        },
        public_id: {
          type: String,
          default: "",
        },
      },
    ],

    // =========================
    // YOUTUBE VIDEOS (NEW - SAFE ADDITION)
    // =========================
    youtubeVideos: {
      type: [
        {
          youtubeId: {
            type: String,
            trim: true,
          },
        },
      ],
      default: [],
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
