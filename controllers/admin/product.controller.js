const Book = require('../../models/Book.model');

module.exports.index = async (req, res) => {
    let find = {};
    let paginationObject = {
        limit: 2,
        currentPage: 1
    }
    if (req.query.index) {
        paginationObject.currentPage = req.query.index;
        paginationObject.skip = paginationObject.limit * (req.query.index - 1);
    }

    let search = "";
    if (req.query.search) {
        search = req.query.search;
        let reg = new RegExp(search, "i");
        find.title = reg;
    }
    const scheme = [
        "title",
        "author",
        "pages",
        "year"
    ]
    const total = await Book.countDocuments(find);
    paginationObject.totalPages = Math.ceil(total / paginationObject.limit)
    const books = await Book.find(find).skip(paginationObject.skip).limit(paginationObject.limit);
    res.render('admin/pages/product', {title: 'Product', product: books, scheme: scheme, pagination: paginationObject, search: search});
}

module.exports.delete = async (req, res) => {
    res.send(req.params.id);
}