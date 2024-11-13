const User = require('../../models/User.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Otp = require('../../models/Otp.model');
const { model } = require('mongoose');
const sendMailHelper = require('../../helpers/sendmail.js');
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

module.exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log('logout err');
        } else {
            res.redirect('/');
        }
    })
}

module.exports.forgot = (req, res) => {
    res.render('client/pages/auth/password/forgot')
}

module.exports.forgotPost = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const otp = new Otp({
                email: req.body.email,
                otp: '1111',
                expireAt: Date.now()
            })
            await otp.save();
            sendMailHelper.sendMail(otp.email, 'OTP verify account', `OTP <br>${otp.otp}</br>will available in 3 min`)
            res.redirect('/auth/password/otp?email=' + req.body.email);
        } else {
            console.log('Email doesnt exist');
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports.otp = (req, res) => {
    const email = req.query.email;
    res.render('client/pages/auth/password/otp', {email: email});
}

module.exports.otpPost = async (req, res) =>{
    try {
        const otp = await Otp.findOne(req.body);
        if (otp) {
            const user = await User.findOne({email: otp.email});
            req.login(user, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    res.redirect('/auth/password/reset');
                }
            })
        } else {
            console.log('Otp doesnt exist.');
            res.redirect('back');
        }
    } catch(err) {
        console.log(err);
    }
}

module.exports.reset = async (req, res) => {
    res.render('client/pages/auth/password/reset');
}

module.exports.resetPost = async (req, res) => {
    try {
        bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
            await User.updateOne(req.user, {password: hash});
            req.logout((err) => {
                if (err) {
                    console.log(err)
                } else {
                    res.redirect('/auth/login');
                }
            })
        })
        
    } catch(error) {
        console.log(error);
    }
}