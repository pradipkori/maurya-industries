const mongoose = require("mongoose");
require("dotenv").config();
const Product = require("./models/Product");

const newProductsData = [
  {
    name: "Color Mixer Machine",
    model: "MI-50",
    category: "Mixing Machines",
    shortDesc: "Industrial stainless steel color mixer machine for uniform plastic mixing",
    imageUrl: "https://5.imimg.com/data5/SELLER/Default/2022/4/QP/IY/OR/47305699/colour-mixer-machine-500x500.jpg",
    specs: {
      capacity: "25 kg",
      power: "5 HP",
      speed: "30 RPM",
      mixingTime: "2 min",
      voltage: "280V",
      frequency: "65Hz",
    },
    features: [
      "Stainless steel construction",
      "3 Phase power",
      "Customized design",
      "Polished surface finishing",
      "Easy operation",
      "Manual feeding",
      "Industrial grade",
      "Made in India",
    ],
  },
  {
    name: "Pet Bottle Crusher Machine",
    model: "PBCM-200",
    category: "Grinding Machines",
    shortDesc: "Semi-automatic PET bottle crusher for grinding declined plastic into small pieces",
    imageUrl: "https://5.imimg.com/data5/SELLER/Default/2022/4/ZU/FM/FV/47305699/all-type-plastic-grinder-machine-500x500.jpg",
    specs: {
      capacity: "200 kg",
      bladeSize: "18 inch",
      power: "20 HP",
      weight: "1800 kg",
      rotorSpeed: "500 RPM",
    },
    features: [
      "Semi-automatic operation",
      "Specialized for PET bottles",
      "High capacity processing",
      "Easy maintenance",
      "Made in India",
      "Efficient grinding mechanism",
      "Durable blade construction",
      "Industrial application",
    ],
  },
];

async function addNewProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected ✅");

    // Insert new products
    const result = await Product.insertMany(newProductsData);
    console.log(`✅ Successfully added ${result.length} new products!`);
    console.log("New Products:");
    result.forEach((product) => {
      console.log(`  - ${product.name} (${product.model})`);
    });

    await mongoose.connection.close();
    console.log("Database connection closed");
  } catch (error) {
    console.error("❌ Error adding products:", error.message);
    process.exit(1);
  }
}

addNewProducts();
