const express = require('express');
const Router = express.Router();
const controller = require('../../controllers/client/auth.controller');


var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');
var bcrypt = require('bcrypt');
const User = require('../../models/User.model');

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(user, cb) {
    cb(null, user);
});

passport.use(new LocalStrategy(
    async function (username,password,cb) {
        const email = username;
        try {
            const user = await User.findOne({ email: email });
            if (user) {
                bcrypt.compare(password, user.password, function (err, result) {
                    // result == true
                    if (err) {
                        return cb(err);
                    }
                    else {
                        if (result) {
                            return cb(null, user);
                        } else {
                            return cb(null, false);
                        }
                    }
    
                });
            } else {
                return cb('User doesnt exist')
            }
        } catch (err) {
            return cb(err);
        }
    }
));

Router.get('/register', controller.register);

Router.get('/login', controller.login);

Router.post('/register', controller.registerPost);

Router.post('/login',passport.authenticate('local', { successReturnToOrRedirect: '/', failureRedirect: '/auth/login' }));

module.exports = Router;