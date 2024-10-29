const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/admin/category.controller');

router.get('/', categoryController.index);

router.get('/create', categoryController.create);

router.post('/create', categoryController.createPost);

router.delete('/delete/:id', categoryController.delete);

module.exports = router;