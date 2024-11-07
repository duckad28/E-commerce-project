const Account = require('../../models/Account.model');
const Role = require('../../models/Role.model');
const deleteImage = require('../../config/cloudinary.config');

module.exports.index = async (req, res) => {
    const scheme = [
        "full_name",
        "email",
    ]
    const accounts = await Account.find({});
    res.render('admin/pages/account', { title: 'account', product: accounts, scheme });
}

module.exports.create = async (req, res) => {
    const scheme = [
        ["full_name", "String"],
        ["email", "String"],
        ["password", "String"],
    ]
    const roles = await Role.find({});
    res.render('admin/pages/account/create', { title: 'account', scheme: scheme, roles: roles });
}

module.exports.createPost = async (req, res) => {
    try {
        const newaccount = new Account(req.body);
        await newaccount.save();
        req.flash('success', 'create new account');
    } catch (e) {
        console.log(e)
        req.flash('error', 'faild');

    } finally {
        res.redirect('back');
    }
}

module.exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        const account = await Account.findOne({_id: id});
        let img = account.avatar.split('/').at(-1);
        img = img.replace('.jpg', '');
        img = img.replace('.png', '');
        deleteImage(img);
        await Account.deleteOne({ _id: id });
        req.flash('success', 'Delete success');
    } catch (e) {
        console.log(e)
        req.flash('error', 'Delete failed');
    } finally {
        res.redirect('back');
    }
}

module.exports.edit = (req, res) => {
    
}