const Book = require('../../models/Book.model');
module.exports.index = async (req, res) => {
    const find = {};
    const books = await Book.find(find);
    res.render('client/pages/product', {title: 'Product', data: books})
}