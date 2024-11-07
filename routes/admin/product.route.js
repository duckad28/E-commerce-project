const express = require('express');
const router = express.Router();
const productController = require('../../controllers/admin/product.controller');
const cloudMiddleware = require('../../middlewares/cloudinary.middeware');
const multer = require('multer');

const upload = multer();

router.get('/', productController.index);

router.delete('/delete/:id', productController.delete);

router.get('/edit/:id', productController.edit);

router.get('/create', productController.create);

router.post('/create',upload.single('imageURL'), cloudMiddleware.cloudUpload, productController.createPost);

router.patch('/edit/:id',upload.single('imageURL'), cloudMiddleware.cloudUpload,  productController.editPatch);

module.exports = router;