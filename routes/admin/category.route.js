const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/admin/category.controller');

router.get('/', categoryController.index);

router.get('/create', categoryController.create);

router.post('/create', categoryController.createPost);

router.delete('/delete/:id', categoryController.delete);

router.get('/edit/:id', categoryController.edit);

router.patch('/edit/:id', categoryController.editPatch);

module.exports = router;