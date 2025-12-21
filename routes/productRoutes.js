const express = require("express");
const router = express.Router();
const multer = require("multer");
const Product = require("../models/Product");
const { storage } = require("../config/cloudinary");

const upload = multer({ storage });

/**
 * 🛡 SAFE JSON PARSER
 */
const safeParse = (value, fallback) => {
  try {
    if (!value) return fallback;
    if (typeof value === "object") return value;
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

/**
 * ➕ ADD PRODUCT
 */
router.post("/", upload.single("image"), async (req, res) => {
  try {
    console.log("➡️ ADD PRODUCT HIT");
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const productData = {
      name: req.body.name?.trim(),
      model: req.body.model?.trim(),
      category: req.body.category?.trim(),
      shortDesc: req.body.shortDesc?.trim(),
      specs: safeParse(req.body.specs, {}),
      features: safeParse(req.body.features, []),
    };

    // ✅ Add image only if uploaded
    if (req.file && req.file.path) {
      productData.imageUrl = req.file.path;
    }

    const product = await Product.create(productData);

    console.log("✅ PRODUCT CREATED:", product._id);

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("🔥 ADD PRODUCT ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to add product",
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
      name: req.body.name?.trim(),
      model: req.body.model?.trim(),
      category: req.body.category?.trim(),
      shortDesc: req.body.shortDesc?.trim(),
      specs: safeParse(req.body.specs, {}),
      features: safeParse(req.body.features, []),
    };

    if (req.file && req.file.path) {
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
      message: error.message || "Failed to update product",
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
