const mongoose = require("mongoose");
require("dotenv").config();
const Product = require("./models/Product");

async function verifyProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected ✅\n");

    // Get all products sorted by creation date
    const allProducts = await Product.find({}).sort({ createdAt: 1 });

    console.log(`📊 Total Products: ${allProducts.length}\n`);
    console.log("=" + "=".repeat(90));
    console.log(
      "Product Name".padEnd(40) +
        "Model".padEnd(15) +
        "Category".padEnd(20) +
        "Price"
    );
    console.log("=" + "=".repeat(90));

    let totalValue = 0;
    allProducts.forEach((product) => {
      const name = product.name.substring(0, 38);
      const model = (product.model || "N/A").substring(0, 13);
      const category = (product.category || "N/A").substring(0, 18);
      const price = product.price
        ? `₹${product.price.toLocaleString("en-IN")}`
        : "N/A";

      console.log(
        name.padEnd(40) +
          model.padEnd(15) +
          category.padEnd(20) +
          price
      );

      if (product.price) {
        totalValue += product.price;
      }
    });

    console.log("=" + "=".repeat(90));
    console.log(`\n💰 Total Inventory Value: ₹${totalValue.toLocaleString("en-IN")}`);
    console.log(
      `✅ Products with prices: ${allProducts.filter((p) => p.price).length}/${allProducts.length}`
    );

    await mongoose.connection.close();
    console.log("\nDatabase connection closed");
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

verifyProducts();
