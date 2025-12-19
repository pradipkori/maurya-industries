const mongoose = require("mongoose");
require("dotenv").config();
const Product = require("./models/Product");

async function removeOldProduct() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected ✅");

    const result = await Product.deleteOne({ name: "14 Inch Alloy Steel Plastic Cutting Blades" });
    console.log(`🗑️ Deleted ${result.deletedCount} product`);

    await mongoose.connection.close();
    console.log("Database connection closed");
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

removeOldProduct();