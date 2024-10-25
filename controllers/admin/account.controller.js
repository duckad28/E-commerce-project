const Account = require('../../models/Account.model');

module.exports.index = async (req, res) => {
    const scheme = [
        "full_name",
        "email",
    ]
    const accounts = await Account.find({});
    res.render('admin/pages/account', {title: 'Account', product: accounts, scheme});
}

module.exports.create = (req, res) => {
    const scheme = [
        ["full_name", "String"],
        ["email", "String"],
        ["password", "String"],
    ]
    res.render('admin/pages/account/create', {title: 'Account', scheme: scheme});
}

module.exports.createPost = async (req, res) => {
    try {
const file = req.file
    req.body.avatar = '/admin/assets/images/' + file.filename
    const newaccount = new Account(req.body);
    await newaccount.save();
    req.flash('success', 'create new account');
    } catch (e) {
        console.log(e)
        req.flash('error', 'faild');

    }
    res.redirect('back');
}