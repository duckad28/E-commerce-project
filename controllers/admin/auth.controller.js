const Account = require('../../models/Account.model');

module.exports.login = (req, res) => {
    res.render('admin/pages/auth/login', {title: 'Login'})
}

module.exports.loginPost = async (req, res) => {
    try {
        console.log(req.body)
        const account = await Account.findOne(req.body);
        if (account) {
            req.flash('success', 'Login success.');
            res.cookie('token', account.full_name);
            res.redirect('/admin/dashboard');
        } else {
            req.flash('error', 'Login failed.');
            res.redirect('back');
        }
        
    } catch (e) {
        req.flash('error', 'Login Error');
        res.redirect('back');
    }
    
}

module.exports.logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/admin/auth/login');
}