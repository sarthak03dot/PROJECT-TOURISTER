const cloudinary = require("cloudinary").v2;
const CloudinaryStorage = require("multer-storage-cloudinary").CloudinaryStorage; // Corrected import

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({ // Use CloudinaryStorage directly
    cloudinary: cloudinary,
    params: {
        folder: 'TripTales_DEV',
        allowedFormats: ["jpg", "png", "jpeg"],
    },
});

module.exports = {
    cloudinary,
    storage,
};
