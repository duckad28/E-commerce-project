const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_KEY, 
    api_secret: process.env.CLOUD_SECRET
});

const deleteItem = (img) => {
    cloudinary.uploader.destroy(img, function(error,result) {
        console.log('Error')
        console.log(result, error) });
}

module.exports = deleteItem;