const mongoose = require('mongoose');
const { Schema } = mongoose;

const chatSchema = new Schema({
    user: String,
    content: String
})

const Chat = mongoose.model('Chat', chatSchema, 'chats');
module.exports = Chat;