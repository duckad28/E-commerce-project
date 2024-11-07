const Book = require('../../models/Book.model');
const Product = require('../../models/Product.model');
const Category = require('../../models/Category.model');
const { createTreeCategory } = require('../../helpers/tree');
var slugify = require('slugify');

const scheme = {
    props: [
        {
            name: 'name',
            prop: 'name',
            type: 'String'
        },
        {
            name: 'brand',
            prop: 'brand',
            type: 'String'
        },
        {
            name: 'price',
            prop: 'price',
            type: 'Number'
        },
        {
            name: 'available',
            prop: 'is_in_inventory',
            type: 'Boolean'
        },
        {
            name: 'stock',
            prop: 'items_left',
            type: 'Number'
        },
        {
            name: 'featured',
            prop: 'featured',
            type: 'Number'
        }
    ],
    image: 'imageURL',
}

module.exports.index = async (req, res) => {
    let find = {};
    let statusObject = {
        statuses : [
            '',
            'available',
            'unavailable'
        ],
        currentStatus: ''
    }

    let genderObject = {
        genders : [
            '',
            'MEN',
            'WOMEN',
            'KIDS'
        ],
        currentGender: ''
    }

    let paginationObject = {
        limit: 6,
        currentPage: 1
    }

    if (req.query.index) {
        paginationObject.currentPage = req.query.index;
        paginationObject.skip = paginationObject.limit * (req.query.index - 1);
    }

    if (req.query.status) {
        statusObject.currentStatus = req.query.status;
        find.is_in_inventory = req.query.status == 'available';
    }

    if (req.query.gender) {
        genderObject.currentGender = req.query.gender;
        find.gender = req.query.gender;
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
            ['name-desc', 'Tiêu đề giảm dần'],
            ['brand-desc', 'Nhãn hàng giảm dần'],
            ['price-desc', 'Giá giảm dần'],
            ['name-asc', 'Tiêu đề tăng dần'],
            ['brand-asc', 'Nhãn hàng tăng dần'],
            ['price-asc', 'Giá tăng dần'],
        ],
        select: ''
    };
    if (req.query.skey && req.query.svalue) {
        skey = req.query.skey;
        svalue = req.query.svalue;
        sort[skey] = svalue;
        sortObject.select = skey + "-" + svalue;
    }

    const total = await Product.countDocuments(find);
    paginationObject.totalPages = Math.ceil(total / paginationObject.limit);
    const products = await Product.find(find).sort(sort).skip(paginationObject.skip).limit(paginationObject.limit);
    res.render(
        'admin/pages/product',
        {
            title: 'product',
            product: products,
            scheme: scheme,
            pagination: paginationObject,
            status: statusObject,
            gender: genderObject,
            search: search,
            sort: sortObject
        }
    );
}

module.exports.delete = async (req, res) => {
    res.send(req.params.id);
}

module.exports.create = async (req, res) => {
    const categories = await Category.find({});
    const tree = createTreeCategory(categories);
    res.render('admin/pages/product/create', { title: 'product', tree: tree, scheme: scheme });
}

module.exports.createPost = async (req, res) => {
    try {
        if (req.body) {
            const createObject = {};
            createObject.user = res.locals.user._id;
            createObject.date = new Date();
            req.body.updateHistory = [createObject];
            req.body.slug = slugify(req.body.name);
            const newProduct = new Product(req.body);
            await newProduct.save();
            req.flash('success', 'Create new product');
        }
    } catch (err) {
        req.flash('error', 'Create new product fail.')
    } finally {
        res.redirect('back');
    }
}

module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findOne({ _id: id });
        const categories = await Category.find({});
        const tree = createTreeCategory(categories);
        res.render('admin/pages/product/edit', { title: 'product', product: product, scheme: scheme, tree: tree})
    } catch (e) {
        req.flash('error', 'Error')
    }
}

module.exports.editPatch = async (req, res) => {
    try {
        const id = req.params.id;
        const updateObject = {};
        updateObject.user = res.locals.user._id;
        updateObject.date = new Date();
        await Product.updateOne(
            { _id: id }, 
            {
                $push: { updateHistory: updateObject },
                $set: req.body
            }
        );
        req.flash('success', 'Success')
    } catch (e) {
        req.flash('error', 'Error')
        console.log(e)
    } finally {
        res.redirect('back');
    }
}