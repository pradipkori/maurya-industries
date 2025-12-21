const express = require("express");
const router = express.Router();
const multer = require("multer");
const Product = require("../models/Product");
const { storage } = require("../config/cloudinary");

const upload = multer({ storage });

/**
 * ➕ ADD PRODUCT
 */
router.post("/", upload.single("image"), async (req, res) => {
  try {
    console.log("➡️ ADD PRODUCT HIT");
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    // ❌ Image missing
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Product image is required",
      });
    }

    const product = await Product.create({
      name: req.body.name,
      model: req.body.model,
      category: req.body.category,
      shortDesc: req.body.shortDesc,
      imageUrl: req.file.path, // ✅ Cloudinary URL
      specs: req.body.specs ? JSON.parse(req.body.specs) : {},
      features: req.body.features ? JSON.parse(req.body.features) : [],
    });

    console.log("✅ PRODUCT CREATED");

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("🔥 ADD PRODUCT ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add product",
    });
  }
});

/**
 * ✏️ UPDATE PRODUCT
 */
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    console.log("➡️ UPDATE PRODUCT HIT");

    const updateData = {
      name: req.body.name,
      model: req.body.model,
      category: req.body.category,
      shortDesc: req.body.shortDesc,
      specs: req.body.specs ? JSON.parse(req.body.specs) : {},
      features: req.body.features ? JSON.parse(req.body.features) : [],
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
      message: "Failed to update product",
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
    console.error("🔥 DELETE PRODUCT ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete product",
    });
  }
});

/**
 * 📄 GET ALL PRODUCTS
 */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ success: true, products });
  } catch (error) {
    console.error("🔥 GET PRODUCTS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
});

/**
 * 📄 GET SINGLE PRODUCT
 */
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false });
    }
    res.json({ success: true, product });
  } catch (error) {
    console.error("🔥 GET SINGLE PRODUCT ERROR:", error);
    res.status(404).json({ success: false });
  }
});

module.exports = router;
