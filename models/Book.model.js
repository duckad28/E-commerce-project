const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema({
    author: String,
    country: String,
    imageLink: String,
    language: String,
    link: String,
    pages: Number,
    title: String,
    year: Number,
})

const Book = mongoose.model('Book', bookSchema, 'books');
module.exports = Book;