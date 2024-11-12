const express = require('express');
const Router = express.Router();
const controller = require('../../controllers/client/auth.controller');

Router.get('/register', controller.register);

Router.get('/login', controller.login);

Router.post('/register', controller.registerPost);

Router.post('/login', controller.loginPost);

module.exports = Router;