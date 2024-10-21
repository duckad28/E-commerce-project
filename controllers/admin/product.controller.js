const Book = require('../../models/Book.model');

module.exports.index = async (req, res) => {
    let find = {};
    let paginationObject = {
        limit: 10,
        currentPage: 1
    }
    if (req.query.index) {
        paginationObject.currentPage = req.query.index;
        paginationObject.skip = paginationObject.limit * (req.query.index - 1);
    }
    const scheme = [
        "author",
        "country",
        "language",
        "pages",
        "title",
        "year"
    ]
    const total = await Book.countDocuments({});
    paginationObject.totalPages = Math.ceil(total / paginationObject.limit)
    const books = await Book.find(find).skip(paginationObject.skip).limit(paginationObject.limit);
    res.render('admin/pages/product', {title: 'Product', product: books, scheme: scheme, pagination: paginationObject});
}