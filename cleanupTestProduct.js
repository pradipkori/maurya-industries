const mongoose = require("mongoose");
require("dotenv").config();
const Product = require("./models/Product");

async function cleanupTestProduct() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected ✅");

    // Delete the test product
    const result = await Product.deleteOne({ name: "pradip kori" });

    if (result.deletedCount > 0) {
      console.log("✅ Deleted test product: pradip kori");
    } else {
      console.log("⚠️  Test product not found");
    }

    // Verify final count
    const finalProducts = await Product.find({});
    console.log(`\n✅ Final Product Count: ${finalProducts.length} products`);

    await mongoose.connection.close();
    console.log("Database connection closed");
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

cleanupTestProduct();
