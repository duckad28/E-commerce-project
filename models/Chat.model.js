const mongoose = require('mongoose');
const { Schema } = mongoose;

const chatSchema = new Schema({
    content: String
})

const Chat = mongoose.model('Chat', chatSchema, 'chats');
module.exports = Chat;