const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_KEY, 
    api_secret: process.env.CLOUD_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['jpg', 'png'],
    filename: function (req, file, cb) {
      cb(null, file.fieldName + Date.now() + '.jpg'); 
    }
});

const uploadCloud = multer({ storage });

const deleteItem = (img) => {
    cloudinary.uploader.destroy(img, function(error,result) {
        console.log('Error')
        console.log(result, error) });
}

module.exports = deleteItem;
module.exports.upload = uploadCloud;