const mongoose = require('mongoose');
const { Schema } = mongoose;

const accountSchema = new Schema({
    full_name: String,
    email: String,
    password: String,
    avatar: String,
    role: String
})

const Account = mongoose.model('Account', accountSchema, 'accounts');
module.exports = Account;