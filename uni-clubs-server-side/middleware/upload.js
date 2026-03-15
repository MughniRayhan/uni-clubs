const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "announcements",
      resource_type: "auto", // supports pdf, doc, image
      public_id: Date.now() + "-" + file.originalname
    };
  }
});

const upload = multer({ storage });

module.exports = upload;