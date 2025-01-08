const chatSchema = require("../schema/chat");

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('a user connected');
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
        socket.on('message', async (msg) => {
            const {room, user, message} = JSON.parse(msg);
            const newChat = new chatSchema(JSON.parse(msg));
            const res = await newChat.save();
            console.log(res);
            io.emit('message', res);
        });
    });
}