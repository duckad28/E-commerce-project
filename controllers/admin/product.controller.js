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

    let search = "";
    if (req.query.search) {
        search = req.query.search;
        let reg = new RegExp(search, "i");
        find.title = reg;
    }
    let sort = {};
    let skey = '';
    let svalue = '';
    let sortObject = {
        arr: [
            ['title-desc', 'Tiêu đề giảm dần'],
            ['author-desc', 'Tác giả giảm dần'],
            ['pages-desc', 'Số trang giảm dần'],
            ['year-desc', 'Năm giảm dần'],
            ['title-asc', 'Tiêu đề tăng dần'],
            ['author-asc', 'Tác giả tăng dần'],
            ['pages-asc', 'Số trang tăng dần'],
            ['year-asc', 'Năm tăng dần'],
        ],
        select: ''
    };
    if (req.query.skey && req.query.svalue) {
        skey = req.query.skey;
        svalue = req.query.svalue;
        sort[skey] = svalue;
        sortObject.select = skey + "-" + svalue;
    }

    

    const scheme = [
        "title",
        "author",
        "pages",
        "year"
    ]
    const total = await Book.countDocuments(find);
    paginationObject.totalPages = Math.ceil(total / paginationObject.limit)
    const books = await Book.find(find).sort(sort).skip(paginationObject.skip).limit(paginationObject.limit);
    res.render(
        'admin/pages/product',
        {
            title: 'Product',
            product: books,
            scheme: scheme,
            pagination: paginationObject,
            search: search,
            sort: sortObject
        }
    );
}

module.exports.delete = async (req, res) => {
    res.send(req.params.id);
}