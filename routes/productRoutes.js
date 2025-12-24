const express = require("express");
const router = express.Router();
const multer = require("multer");
const Product = require("../models/Product");
const { storage } = require("../config/cloudinary");

// =========================
// Multer config
// =========================
const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
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

const parseYoutubeVideos = (value) => {
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

    const media = req.files.map((file) => ({
      url: file.path,
      public_id: file.filename,
      type: file.mimetype.startsWith("video") ? "video" : "image",
    }));

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

      imageUrl: firstImage.url, // backward compatibility
      media,

      youtubeVideos: parseYoutubeVideos(req.body.youtubeVideos),
      specs: parseObject(req.body.specs),
      features: parseArray(req.body.features),
    });

    res.status(201).json({ success: true, product });
  } catch (err) {
    console.error("ADD PRODUCT ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// =========================
// ✏️ UPDATE PRODUCT (FIXED)
// =========================
router.put("/:id", upload.array("media", 10), async (req, res) => {
  try {
    const existingProduct = await Product.findById(req.params.id);
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const updateData = {
      name: req.body.name,
      model: req.body.model,
      category: req.body.category,
      shortDesc: req.body.shortDesc,
      price: Number(req.body.price) || existingProduct.price,
      specs: parseObject(req.body.specs),
      features: parseArray(req.body.features),
      youtubeVideos: parseYoutubeVideos(req.body.youtubeVideos),
    };

    // ===============================
    // START WITH EXISTING MEDIA
    // ===============================
    let media = [...(existingProduct.media || [])];

    // ===============================
    // DELETE MEDIA (FIXED)
    // ===============================
    const deletedIndexes = parseArray(req.body.deletedMediaIndexes);
    if (deletedIndexes.length > 0) {
      media = media.filter((_, index) => !deletedIndexes.includes(index));
    }

    // ===============================
    // ADD NEW UPLOADS
    // ===============================
    if (req.files && req.files.length > 0) {
      const newMedia = req.files.map((file) => ({
        url: file.path,
        public_id: file.filename,
        type: file.mimetype.startsWith("video") ? "video" : "image",
      }));
      media.push(...newMedia);
    }

    // ===============================
    // SAVE MEDIA
    // ===============================
    updateData.media = media;

    // ===============================
    // UPDATE MAIN IMAGE
    // ===============================
    const firstImage = media.find((m) => m.type === "image");
    if (firstImage) {
      updateData.imageUrl = firstImage.url;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json({ success: true, product: updatedProduct });
  } catch (err) {
    console.error("UPDATE PRODUCT ERROR:", err);
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
  } catch (err) {
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
      return res.status(404).json({ success: false, message: "Not found" });
    }
    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// =========================
// 🗑 DELETE PRODUCT
// =========================
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

module.exports = router;
