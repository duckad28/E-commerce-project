const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    id: Number,
    name: String,
    brand: String,
    gender: String,
    category: String,
    price: Number,
    is_in_inventory: Boolean,
    items_left: Number,
    imageURL: String,
    slug: String,
    featured: Number,
    updateHistory: [
        {
            user: String,
            date: String
        }
    ],
    isDeleted: {
        type: Boolean,
        default: false
    },
})

const Product = mongoose.model('Product', productSchema, 'products');
module.exports = Product;