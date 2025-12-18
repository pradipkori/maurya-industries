const mongoose = require("mongoose");
require("dotenv").config();
const Product = require("./models/Product");

// Price mapping based on IndiaMART data
const priceUpdates = {
  "Pet Bottle Washing Plant": 5500000,
  "Plastic Mixing Machine": 55000,
  "Scrap Washing Machine": 150000,
  "Plastic Scrap Grinder Machine": 125000,
  "Color Mixer Machine": 55000,
  "Pet Bottle Crusher Machine": 115000,
  "Automatic Plastic Dana Cutter Machine": 65000,
  "Plastic Grinder Machine": 105000,
  "Vibro Separator Machine": 95000,
};

async function updateProductPrices() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected ✅");

    let updateCount = 0;
    for (const [productName, price] of Object.entries(priceUpdates)) {
      const result = await Product.findOneAndUpdate(
        { name: productName },
        { price: price },
        { new: true }
      );
      if (result) {
        console.log(`✅ Updated ${result.name} - ₹${result.price}`);
        updateCount++;
      } else {
        console.log(`⚠️  Product not found: ${productName}`);
      }
    }

    console.log(`\n✅ Successfully updated ${updateCount} products with prices!`);

    // Get all products to verify
    const allProducts = await Product.find({});
    console.log(`\nTotal products in database: ${allProducts.length}`);
    console.log("All Products with Prices:");
    allProducts.forEach((p) => {
      console.log(`  - ${p.name} (${p.model}) - ₹${p.price || "N/A"}`);
    });

    await mongoose.connection.close();
    console.log("\nDatabase connection closed");
  } catch (error) {
    console.error("❌ Error updating products:", error.message);
    process.exit(1);
  }
}

updateProductPrices();
