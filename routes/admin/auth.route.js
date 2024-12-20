const express = require('express');
let router = express.Router();
const authController = require('../../controllers/admin/auth.controller');
router.get('/login', authController.login);

router.post('/login', authController.loginPost);

router.get('/logout', authController.logout);

module.exports = router;