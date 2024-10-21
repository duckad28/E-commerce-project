const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/admin/category.controller');

router.get('/', categoryController.index);

module.exports = router;