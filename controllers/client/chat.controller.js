const Chat = require('../../models/Chat.model');

module.exports.index = async (req, res) => {
      _io.once('connection', (socket) => {
        console.log('a user connected');

        socket.emit('SERVER_SEND_SOCKET_ID', socket.id);

        socket.on('CLIENT_SEND_MESSAGE', async (msg) => {
          const newChat = new Chat({content: msg});
          await newChat.save();
          _io.emit('SERVER_RETURN_MESSAGE', {content: msg});
        });

        socket.on('disconnect', () => {
          console.log('user disconnected');
        });
      });
    const chats = await Chat.find({});
    res.render('client/pages/chat', {title: 'Chat', chat: chats})
}