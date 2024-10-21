const express = require('express');
const router = express.Router();
const roleController = require('../../controllers/admin/role.controller');

router.get('/', roleController.index);

module.exports = router;