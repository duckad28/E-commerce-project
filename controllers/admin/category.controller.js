const Category = require('../../models/Category.model');
const {createTreeCategory} = require('../../helpers/tree.js');

module.exports.index = async (req, res) => {
    const scheme = ['title'];
    const categories = await Category.find({});
    res.render('admin/pages/category', {title: 'category', product: categories, scheme: scheme});
}

module.exports.create = async (req, res) => {{
    const scheme = ['title'];
    const categories = await Category.find({});
    const tree = createTreeCategory(categories);
    res.render('admin/pages/category/create', {title: 'category', scheme: scheme, product: categories, tree: tree});
}}

module.exports.createPost = async (req, res) => {
    try {
        const cate = new Category(req.body);
        await cate.save();
        req.flash('success', 'Create new category');
    } catch (e) {
        req.flash('error', 'create failed');
    } finally {
        res.redirect('back');
    }
}

module.exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        await Category.deleteOne({ _id: id });
        req.flash('success', 'Delete success');
    } catch (e) {
        console.log(e)
        req.flash('error', 'Delete failed');
    } finally {
        res.redirect('back');
    }
}