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
  {
    name: "Automatic Plastic Cutting Machine",
    model: "MI-400",
    category: "Cutting Machines",
    shortDesc: "Heavy Duty Automatic Plastic Cutting Machine for all types of plastic",
    imageUrl: "https://5.imimg.com/data5/SELLER/Default/2022/4/NT/PQ/ZR/47305699/khaleel-model-plastic-cutting-machine-500x500.jpg",
    price: 125000,
    specs: {
      capacity: "200 Kg/h",
      power: "15 HP",
      maxCuttingThickness: "15mm",
      voltage: "280V",
    },
    features: [
      "Automatic operation",
      "Heavy duty construction",
      "Cuts all types of plastic",
      "High capacity processing",
      "Made in India",
      "Easy maintenance",
    ],
  },
  {
    name: "High Speed Mixer Machine",
    model: "MI-100",
    category: "Mixing Machines",
    shortDesc: "High speed mixer machine for industrial mixing applications",
    imageUrl: "https://5.imimg.com/data5/SELLER/Default/2022/4/CA/US/QW/47305699/high-speed-mixer-machine-500x500.jpg",
    price: 225000,
    specs: {
      capacity: "1000L",
      productionCapacity: "500 KG/HOUR",
      material: "Iron",
      automationGrade: "Semi-Automatic",
    },
    features: [
      "High speed mixing",
      "Semi-automatic operation",
      "Large capacity",
      "Durable construction",
      "Made in India",
      "Energy efficient",
    ],
  },
  {
    name: "Plastic Dewatering Machine",
    model: "PDM-500",
    category: "Dewatering Machines",
    shortDesc: "Stainless steel plastic dewatering machine for efficient moisture removal",
    imageUrl: "https://5.imimg.com/data5/SELLER/Default/2023/1/QC/FU/HJ/47305699/plastic-dewatering-machine-500x500.jpg",
    price: 150000,
    specs: {
      machineMaterial: "Stainless Steel",
      productionCapacity: "500 KG Per Hour",
      weight: "450 KG",
      motor: "7.5 HP",
    },
    features: [
      "Stainless steel construction",
      "High production capacity",
      "Efficient dewatering",
      "Durable design",
      "Made in India",
      "Low maintenance",
    ],
  },
  {
    name: "14 Inch Alloy Steel Plastic Cutting Blades",
    model: "PCB-14",
    category: "Cutting Blades",
    shortDesc: "Alloy steel plastic cutting blades for efficient cutting operations",
    imageUrl: "https://5.imimg.com/data5/SELLER/Default/2022/4/ZW/TS/SK/47305699/14-inch-alloy-steel-plastic-cutting-blades-500x500.jpg",
    price: 1200,
    specs: {
      size: "14 Inch",
      material: "Stainless Steel",
      thickness: "20mm",
      cuttingCapacity: "1 Tonne per Hour",
    },
    features: [
      "High quality alloy steel",
      "Sharp cutting edge",
      "Durable construction",
      "High cutting capacity",
      "Made in India",
      "Long lasting",
    ],
  },
  {
    name: "Knife Blade Sharpener Machines",
    model: "MI-600",
    category: "Sharpening Machines",
    shortDesc: "Industrial knife blade sharpening machine for metal grinding",
    imageUrl: "https://5.imimg.com/data5/SELLER/Default/2022/4/LA/ID/KC/47305699/knife-blade-sharpener-machines-500x500.jpg",
    price: 45000,
    specs: {
      typeOfGrindingMachine: "Surface",
      grindingMaterial: "Metal",
      automationGrade: "Manual",
      cuttingAngle: "45 Degree",
      maxGrindingLength: "3100mm",
      grindingWheelSize: "1200 mm",
      grindingDiameter: "350mm",
    },
    features: [
      "Surface grinding machine",
      "Manual operation",
      "45 degree cutting angle",
      "Long grinding length",
      "Made in India",
      "Widely used in plastic industry",
    ],
  },
  {
    name: "Pet Bottle Baling Machine",
    model: "PB-5T",
    category: "Baling Machines",
    shortDesc: "Hydraulic baling machine for pet bottle compression",
    imageUrl: "https://5.imimg.com/data5/SELLER/Default/2024/12/473402793/RM/TB/GI/47305699/pet-bottle-baling-machine-500x500.jpg",
    price: 350000,
    specs: {
      maxLoadCapacity: "5 Ton",
      material: "MS",
      motorPower: "12HP",
      weight: "400kg",
      automationGrade: "Automatic",
      chamberSize: "600x600mm",
    },
    features: [
      "Hydraulic operation",
      "High load capacity",
      "Automatic baling",
      "Durable MS construction",
      "Made in India",
      "Efficient compression",
    ],
  },
  {
    name: "MS Conveyor Belt",
    model: "CB-200",
    category: "Conveyor Systems",
    shortDesc: "Mild steel conveyor belt for material handling",
    imageUrl: "https://5.imimg.com/data5/ANDROID/Default/2024/10/461851442/SR/EP/TA/47305699/product-jpeg-500x500.jpg",
    price: 99000,
    specs: {
      beltThickness: "3 mm",
      material: "PVC",
      beltWidth: "200 mm",
      lengthOfBelt: "As per customer",
      weight: "300 kg",
      conveyingCapacity: "300 kg",
    },
    features: [
      "Heat resistant",
      "Customizable length",
      "PVC material",
      "High conveying capacity",
      "Made in India",
      "Durable construction",
    ],
  },
  {
    name: "MI-600 Knife Blade Sharpener Machines",
    model: "MI-600",
    category: "Sharpening Machines",
    shortDesc: "Professional knife blade sharpening machine",
    imageUrl: "https://5.imimg.com/data5/SELLER/Default/2022/4/CG/DG/DN/47305699/blue-knife-blade-sharpener-machines-500x500.jpg",
    price: 45000,
    specs: {
      typeOfGrindingMachine: "Surface",
      grindingMaterial: "Metal",
      automationGrade: "Manual",
      netWeight: "180kg",
      sawBladeDiameter: "120mm",
      grindingWheelBoreDiameter: "32mm",
    },
    features: [
      "Surface grinding",
      "Manual operation",
      "Lightweight design",
      "Professional sharpening",
      "Made in India",
      "High precision",
    ],
  },
];

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected ✅");

    // Insert or update products
    const insertedProducts = [];
    for (const productData of productsData) {
      const existing = await Product.findOne({ name: productData.name });
      if (!existing) {
        const product = await Product.create(productData);
        insertedProducts.push(product);
        console.log(`  - Added: ${product.name} (${product.model})`);
      } else {
        // Update existing product with new data
        await Product.findByIdAndUpdate(existing._id, productData);
        console.log(`  - Updated: ${productData.name} (${productData.model})`);
      }
    }

    console.log(`✅ Successfully processed ${productsData.length} products!`);
    console.log(`📦 Added ${insertedProducts.length} new products.`);

    await mongoose.connection.close();
    console.log("Database connection closed");
  } catch (error) {
    console.error("❌ Error seeding products:", error.message);
    process.exit(1);
  }
}

seedProducts();
