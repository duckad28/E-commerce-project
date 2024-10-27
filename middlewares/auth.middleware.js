const Account = require('../models/Account.model');
const Role = require('../models/Role.model');

module.exports.requireAuth = async (req, res, next) => {
    const nav = ['product', 'category', 'role', 'account'];
    res.locals.nav = nav;
    try {
        const token = (req.cookies.token);
        const account = await Account.findOne({full_name: token});
        if (account) {
            res.locals.user = account;
            const role = await Role.findOne({_id: account.role});
            res.locals.role = role;
            next();
        } else {
            res.redirect('/admin/auth/login');
        }
    } catch (e) {
        res.redirect('back')
    }
    
}