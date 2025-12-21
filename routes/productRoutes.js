const express = require("express");
const router = express.Router();
const multer = require("multer");
const Product = require("../models/Product");
const { storage } = require("../config/cloudinary");

const upload = multer({ storage });

/**
 * 🛡 SAFE PARSERS
 */

// Always return object
const parseObject = (value) => {
  try {
    if (!value) return {};
    if (typeof value === "string") return JSON.parse(value);
    if (typeof value === "object") return value;
    return {};
  } catch {
    return {};
  }
};

// Always return string array
const parseArray = (value) => {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value.map(String);
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed.map(String) : [value];
    } catch {
      return [value];
    }
  }

  return [];
};

/**
 * ➕ ADD PRODUCT
 */
router.post("/", upload.single("image"), async (req, res) => {
  try {
    console.log("➡️ ADD PRODUCT HIT");
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Product image is required",
      });
    }

    const product = await Product.create({
      name: req.body.name?.trim(),
      model: req.body.model?.trim(),
      category: req.body.category?.trim(),
      shortDesc: req.body.shortDesc?.trim(),
      imageUrl: req.file.path, // Cloudinary URL
      specs: parseObject(req.body.specs),
      features: parseArray(req.body.features),
    });

    console.log("✅ PRODUCT CREATED:", product._id);

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("🔥 ADD PRODUCT ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/**
 * ✏️ UPDATE PRODUCT
 */
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const updateData = {
      name: req.body.name?.trim(),
      model: req.body.model?.trim(),
      category: req.body.category?.trim(),
      shortDesc: req.body.shortDesc?.trim(),
      specs: parseObject(req.body.specs),
      features: parseArray(req.body.features),
    };

    if (req.file) {
      updateData.imageUrl = req.file.path;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json({ success: true, product });
  } catch (error) {
    console.error("🔥 UPDATE PRODUCT ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/**
 * 🗑 DELETE PRODUCT
 */
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

/**
 * 📄 GET PRODUCTS
 */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

module.exports = router;
