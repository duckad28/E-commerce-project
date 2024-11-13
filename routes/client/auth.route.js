const express = require('express');
const Router = express.Router();
const controller = require('../../controllers/client/auth.controller');


var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var passport = require('passport');
var bcrypt = require('bcrypt');
const User = require('../../models/User.model');

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(user, cb) {
    cb(null, user);
});

passport.use('local',
    new LocalStrategy(
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

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/login",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  async function(accessToken, refreshToken, profile, cb) {
    const email = profile._json.email;
    const name = profile._json.name;
    try {
        const user = await User.findOne({email: email});
        if (user) {
            return cb(null, user);
        } else {
            const newUser = new User({user_name: name, email: email, password: 'google'});
            await newUser.save();
            return cb(null, newUser);
        }
    } catch(err) {
        return cb(err);
    }
  }
));

Router.get('/register', controller.register);

Router.get('/login', controller.login);

Router.post('/register', controller.registerPost);

Router.post('/login',passport.authenticate('local', { successReturnToOrRedirect: '/', failureRedirect: '/auth/login' }));

Router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}))

Router.get('/google/login', passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/auth/login'
}))

Router.get('/logout', controller.logout);

Router.get('/password/forgot', controller.forgot);

Router.post('/password/forgot', controller.forgotPost);

Router.get('/password/otp', controller.otp);

Router.post('/password/otp', controller.otpPost);

Router.get('/password/reset', controller.reset);

Router.post('/password/reset', controller.resetPost);

module.exports = Router;