const mongoose = require('mongoose');
const { Schema } = mongoose;

const roleSchema = new Schema({
    title: String,
    permission: [String]
})

const Role = mongoose.model('Role', roleSchema, 'roles');
module.exports = Role;