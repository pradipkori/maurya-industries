const express = require("express");
const router = express.Router();
const multer = require("multer");
const Product = require("../models/Product");
const { storage } = require("../config/cloudinary");

// =========================
// Multer config (Images + Videos)
// =========================
const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB for videos
});

// =========================
// Safe parsers
// =========================
const parseObject = (value) => {
  try {
    if (!value) return {};
    if (typeof value === "string") return JSON.parse(value);
    return value;
  } catch {
    return {};
  }
};

const parseArray = (value) => {
  try {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    return JSON.parse(value);
  } catch {
    return [];
  }
};

// =========================
// ➕ ADD PRODUCT
// =========================
router.post("/", upload.array("media", 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required",
      });
    }

    // Build media array
    const media = req.files.map((file) => ({
      url: file.path,
      public_id: file.filename,
      type: file.mimetype.startsWith("video") ? "video" : "image",
    }));

    // First image → imageUrl (BACKWARD COMPATIBILITY)
    const firstImage = media.find((m) => m.type === "image");
    if (!firstImage) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required",
      });
    }

    const product = await Product.create({
      name: req.body.name,
      model: req.body.model,
      category: req.body.category,
      shortDesc: req.body.shortDesc,
      price: Number(req.body.price) || 0,
      imageUrl: firstImage.url, // 🔴 KEEP OLD UI WORKING
      media, // ✅ NEW (images + videos)
      specs: parseObject(req.body.specs),
      features: parseArray(req.body.features),
    });

    res.status(201).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// =========================
// ✏️ UPDATE PRODUCT
// =========================
router.put("/:id", upload.array("media", 10), async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      model: req.body.model,
      category: req.body.category,
      shortDesc: req.body.shortDesc,
      price: Number(req.body.price) || 0,
      specs: parseObject(req.body.specs),
      features: parseArray(req.body.features),
    };

    if (req.files && req.files.length > 0) {
      const media = req.files.map((file) => ({
        url: file.path,
        public_id: file.filename,
        type: file.mimetype.startsWith("video") ? "video" : "image",
      }));

      updateData.media = media;

      // Update imageUrl if a new image exists
      const firstImage = media.find((m) => m.type === "image");
      if (firstImage) {
        updateData.imageUrl = firstImage.url;
      }
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// =========================
// 📄 GET ALL PRODUCTS
// =========================
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ success: true, products });
  } catch {
    res.status(500).json({ success: false });
  }
});

// =========================
// 📄 GET SINGLE PRODUCT
// =========================
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Not found" });
    }
    res.json({ success: true, product });
  } catch {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch product" });
  }
});

// =========================
// 🗑 DELETE PRODUCT
// =========================
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false });
  }
});

module.exports = router;
