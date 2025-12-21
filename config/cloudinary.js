const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 🔍 PROVE ENV EXISTS (TEMP)
console.log("☁️ CLOUDINARY ENV", {
  cloud: !!process.env.CLOUDINARY_CLOUD_NAME,
  key: !!process.env.CLOUDINARY_API_KEY,
  secret: !!process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async () => ({
    folder: "maurya-products",
    resource_type: "image",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  }),
});

module.exports = { cloudinary, storage };
