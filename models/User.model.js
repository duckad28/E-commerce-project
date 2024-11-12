const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    user_name: String,
    password: String,
    email: String
})

const User = mongoose.model('User', userSchema, 'users');
module.exports = User;