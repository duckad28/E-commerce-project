const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
    title: String,
    parent: String,
})

const Category = mongoose.model('Category', categorySchema, 'categories');
module.exports = Category;