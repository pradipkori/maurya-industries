const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 🔍 ENV CHECK (KEEP – useful for Render logs)
console.log("☁️ CLOUDINARY ENV", {
  cloud: !!process.env.CLOUDINARY_CLOUD_NAME,
  key: !!process.env.CLOUDINARY_API_KEY,
  secret: !!process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isVideo = file.mimetype.startsWith("video");

    return {
      folder: "maurya-products",
      resource_type: isVideo ? "video" : "image", // ✅ CRITICAL FIX
      allowed_formats: isVideo
        ? ["mp4", "mov", "webm"]
        : ["jpg", "jpeg", "png", "webp"],
    };
  },
});

module.exports = { cloudinary, storage };
