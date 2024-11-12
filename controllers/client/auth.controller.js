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
            }
        });
    } catch (error) {
        console.log('register failed');
        req.flash('error', 'Register failed.')
    } finally {
        res.redirect('/');
    }
}

module.exports.loginPost = async (req, res) => {
    console.log(req.body);
    try {

        const user = await User.findOne({ email: req.body.email });
        if (user) {
            bcrypt.compare(req.body.password, user.password, function (err, result) {
                // result == true
                if (err) {
                    console.log('compare err');
                }
                else {
                    if (result) {
                        res.locals.user = user;
                    } else {
                        console.log('wrong ')
                    }
                }

            });
        } else {
            console.log('User doesnt exist')
        }

    } catch (error) {
        console.log('login failed');
        req.flash('error', 'Register failed.')
    } finally {
        res.redirect('/');
    }
}