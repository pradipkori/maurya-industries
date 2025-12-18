const mongoose = require("mongoose");
require("dotenv").config();
const Product = require("./models/Product");

const threeNewProducts = [
  {
    name: "Automatic Plastic Dana Cutter Machine",
    model: "APDCM-100W",
    category: "Cutting Machines",
    shortDesc: "Automatic plastic granules cutter machine for precise cutting solutions",
    imageUrl: "https://5.imimg.com/data5/SELLER/Default/2022/4/MZ/GA/OP/47305699/granule-color-coated-dana-cutter-500x500.jpg",
    specs: {
      power: "100W",
      voltage: "280V",
      machineType: "Automatic",
      finish: "Polished",
      color: "White and Blue",
    },
    features: [
      "Oscillating knife cutting solution",
      "Industrial grade",
      "Polished finish",
      "Die-less cutting technology",
      "Multi-layer cutting capability",
      "Industry 4.0 compatible",
      "Easy operation",
      "Made in India",
    ],
  },
  {
    name: "Plastic Grinder Machine",
    model: "MI-12",
    category: "Grinding Machines",
    shortDesc: "Semi-automatic plastic grinder for cutting waste plastics into small pieces",
    imageUrl: "https://5.imimg.com/data5/SELLER/Default/2022/4/ZL/PC/OF/47305699/plastic-grinder-machine-500x500.jpg",
    specs: {
      capacity: "150 kg",
      power: "5 HP",
      bladeSize: "18 inch",
      blades: "5 blades",
      material: "D2",
      voltage: "280V",
      frequency: "65Hz",
    },
    features: [
      "Semi-automatic operation",
      "Handles all types of plastic",
      "D2 material blades",
      "Waste plastic recycling",
      "5 blade configuration",
      "Easy blade replacement",
      "Efficient shredding",
      "Made in India",
    ],
  },
  {
    name: "Vibro Separator Machine",
    model: "MI-100",
    category: "Separation Machines",
    shortDesc: "Automatic vibrating separator machine for distributing PET bottle flakes",
    imageUrl: "https://5.imimg.com/data5/ANDROID/Default/2024/12/475767451/XF/RN/YZ/47305699/product-jpeg-500x500.jpg",
    specs: {
      capacity: "100 kg/hr",
      size: "32 inch",
      material: "Stainless Steel",
      power: "2 HP",
      phase: "3 Phase",
      voltage: "440V",
      automationGrade: "Automatic",
    },
    features: [
      "Vibrating separator for PET flakes",
      "Stainless steel construction",
      "Automatic operation",
      "Pharmaceutical industry compatible",
      "32 inch diameter",
      "3 Phase power",
      "High efficiency",
      "Made in India",
    ],
  },
];

async function addThreeProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected ✅");

    // Insert new products
    const result = await Product.insertMany(threeNewProducts);
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

addThreeProducts();
