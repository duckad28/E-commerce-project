const express = require('express');
const router = express.Router();
const productController = require('../../controllers/admin/product.controller');

router.get('/', productController.index);

router.delete('/delete/:id', productController.delete)


module.exports = router;