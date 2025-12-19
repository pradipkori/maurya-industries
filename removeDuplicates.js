const mongoose = require("mongoose");
require("dotenv").config();
const Product = require("./models/Product");

async function removeDuplicates() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected ✅");

    const products = await Product.find({});
    const seen = new Map();
    const duplicates = [];

    for (const product of products) {
      if (seen.has(product.name)) {
        duplicates.push(product._id);
      } else {
        seen.set(product.name, product._id);
      }
    }

    if (duplicates.length > 0) {
      await Product.deleteMany({ _id: { $in: duplicates } });
      console.log(`🗑️ Removed ${duplicates.length} duplicate products`);
    } else {
      console.log("✅ No duplicates found");
    }

    const remaining = await Product.find({});
    console.log(`📊 Remaining products: ${remaining.length}`);

    await mongoose.connection.close();
    console.log("Database connection closed");
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

removeDuplicates();