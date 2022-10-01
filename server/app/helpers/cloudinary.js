const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: 'webexe',
    api_key: '986459928668525',
    api_secret: '1-cghRnRjkjLs6ZvYABLUODjf3c',
});

module.exports = cloudinary