const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CloudinaryName,
    api_key: process.env.CloudinaryKey,
    api_secret: process.env.CloudinarySecret
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
    folder: 'YelpCamp',
    allowedFormats: ['jpeg', 'png', 'jpg']
    }
});

module.exports = {
    cloudinary , 
    storage
}