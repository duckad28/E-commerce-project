const express = require('express');
// const fileUpload = require('../../config/cloudinary.config');
const cloudMiddleware = require('../../middlewares/cloudinary.middeware');
const multer = require('multer');

const upload = multer();

const router = express.Router();
const accountController = require('../../controllers/admin/account.controller');

router.get('/', accountController.index);

router.get('/create', accountController.create);

router.post('/create',upload.single('avatar'), cloudMiddleware.cloudUpload, accountController.createPost);

router.delete('/delete/:id', accountController.delete);

module.exports = router;