const User = require('../../models/User.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.register = (req, res) => {
    res.render('client/pages/auth/register', { title: 'register' })
}

module.exports.login = (req, res) => {
    res.render('client/pages/auth/login', { title: 'login' })
}

module.exports.registerPost = (req, res) => {
    try {
        bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
            // Store hash in your password DB.
            if (err) {
                console.log('hash failed')
                req.flash('error', 'Hash Failed');
            } else {
                req.body.password = hash;
                const newUser = new User(req.body);
                await newUser.save();
                console.log('register success');
                req.flash('success', 'Register success');
                req.login(newUser, (err) => {
                    if (err) {
                        console.log('Register err')
                    } else {
                        res.redirect('/');
                    }
                })
            }
        });
    } catch (error) {
        console.log('register failed');
        req.flash('error', 'Register failed.')
    }
}

module.exports.loginPost = async (req, res) => {
    res.redirect('/');
}