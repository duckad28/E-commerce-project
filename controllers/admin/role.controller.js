const Role = require('../../models/Role.model');

module.exports.index = async (req, res) => {
    const roles = await Role.find({});
    res.render('admin/pages/role', {title: 'role', roles: roles});
}

module.exports.create = async (req, res) => {
    res.render('admin/pages/role/create', {title: 'role'});
}

module.exports.createPost = async (req, res) => {
    try{
        req.body.permission = (req.body.permission).split(', ');
        req.body.permission.pop(); 
        const role = new Role(req.body);
        await role.save();
        req.flash('success', 'Create new role');
    } catch (e) {
        req.flash('error', 'Create role failed.')
    } finally {
        res.redirect('back')
    }
}

module.exports.edit = (req, res) => {
    
}