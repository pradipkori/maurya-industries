const mongoose = require("mongoose");
require("dotenv").config();
const Product = require("./models/Product");

const productsData = [
  {
    name: "Pet Bottle Washing Plant",
    model: "PBWP-500",
    category: "Washing Plants",
    shortDesc: "Complete PET bottle washing solution with high capacity processing",
    imageUrl: "https://5.imimg.com/data5/SELLER/Default/2024/12/473392195/IR/WB/YS/47305699/pet-bottle-washing-plant-500x500.jpg",
    specs: {
      capacity: "500 kg/hr",
      power: "50 HP",
      weight: "5000 kg",
      throatSize: "600mm",
    },
    features: [
      "High capacity processing",
      "Efficient washing mechanism",
      "Made in India",
      "Easy maintenance",
      "Durable construction",
      "Energy efficient",
    ],
  },
  {
    name: "Plastic Mixing Machine",
    model: "PMM-55",
    category: "Mixing Machines",
    shortDesc: "Advanced plastic mixing machine for uniform color and material distribution",
    imageUrl: "https://5.imimg.com/data5/ANDROID/Default/2022/4/RN/CY/WH/47305699/product-jpeg-500x500.jpg",
    specs: {
      capacity: "55 kg/batch",
      power: "15 HP",
      weight: "1500 kg",
    },
    features: [
      "Uniform mixing",
      "Production capacity as per customer requirement",
      "Compact design",
      "Easy operation",
      "Made in India",
      "High efficiency",
    ],
  },
  {
    name: "Scrap Washing Machine",
    model: "SWM-50",
    category: "Washing Machines",
    shortDesc: "Efficient plastic scrap washing machine with integrated dryer",
    imageUrl: "https://5.imimg.com/data5/ANDROID/Default/2024/10/457167288/LJ/TY/ZW/47305699/product-jpeg-500x500.jpg",
    specs: {
      capacity: "50 kg/hr",
      power: "25 HP",
      weight: "2500 kg",
      rotorSpeed: "500 RPM",
    },
    features: [
      "Washer with integrated dryer",
      "Fast washing cycle",
      "Energy efficient drying",
      "Made in India",
      "Automatic operation",
      "Production capacity as per requirement",
    ],
  },
  {
    name: "Plastic Scrap Grinder Machine",
    model: "PSGM-100",
    category: "Grinding Machines",
    shortDesc: "Powerful automatic plastic scrap grinder for efficient recycling and waste management",
    imageUrl: "https://5.imimg.com/data5/SELLER/Default/2024/12/473392195/IR/WB/YS/47305699/pet-bottle-washing-plant-500x500.jpg",
    specs: {
      capacity: "100 kg/hr",
      power: "30 HP",
      weight: "2000 kg",
      rotorSpeed: "600 RPM",
    },
    features: [
      "Automatic operation",
      "Handles HDPE and other plastics",
      "Efficient grinding mechanism",
      "High output capacity",
      "Durable construction",
      "Made in India",
      "Low maintenance",
      "Energy efficient",
    ],
  },
];

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected ✅");

    // Clear existing products (optional - comment out if you want to keep existing products)
    // await Product.deleteMany({});
    // console.log("Cleared existing products");

    // Insert new products
    const result = await Product.insertMany(productsData);
    console.log(`✅ Successfully added ${result.length} products!`);
    console.log("Products:");
    result.forEach((product) => {
      console.log(`  - ${product.name} (${product.model})`);
    });

    await mongoose.connection.close();
    console.log("Database connection closed");
  } catch (error) {
    console.error("❌ Error seeding products:", error.message);
    process.exit(1);
  }
}

seedProducts();
