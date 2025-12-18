const mongoose = require("mongoose");
require("dotenv").config();
const Product = require("./models/Product");

const scrapGrinder = {
  name: "36inch Chair Cutting Scrap Grinder",
  model: "CCSG-36",
  category: "Grinding Machines",
  shortDesc: "Heavy-duty 36-inch chair cutting scrap grinder for large volume plastic processing",
  imageUrl: "https://5.imimg.com/data5/SELLER/Default/2022/4/PX/WX/BL/47305699/36inch-chair-cutting-scrap-grinder-500x500.jpg",
  price: 450000,
  specs: {
    capacity: "200 kg/hr",
    bladeSize: "36 inch",
    power: "30 HP",
    voltage: "280V",
    phase: "3 Phase",
    material: "Stainless Steel",
  },
  features: [
    "36 inch blade size",
    "Semi-automatic operation",
    "High capacity processing",
    "PP plastic handling",
    "Stainless steel construction",
    "3 Phase power",
    "Industrial grade",
    "Made in India",
    "Chair cutting application",
  ],
};

async function addScrapGrinder() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected ✅");

    const result = await Product.create(scrapGrinder);
    console.log(`✅ Successfully added scrap grinder product!`);
    console.log(`  - ${result.name} (${result.model}) - ₹${result.price}`);

    await mongoose.connection.close();
    console.log("Database connection closed");
  } catch (error) {
    console.error("❌ Error adding product:", error.message);
    process.exit(1);
  }
}

addScrapGrinder();
