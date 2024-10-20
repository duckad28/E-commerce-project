const Account = require('../models/Account.model');

module.exports.requireAuth = async (req, res, next) => {
    try {
        const token = (req.cookies.token);
        const account = await Account.findOne({full_name: token});
        if (account) {
            res.locals.user = account;
            next();
        } else {
            res.redirect('/admin/auth/login');
        }
    } catch (e) {
        res.redirect('back')
    }
    
}