const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.join(__dirname, '../.env')
});

const chat = new mongoose.Schema({
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "room"
    },
    user: String,
    message: String,
}, { timestamps: true });

mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_IP}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=admin`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {}).catch((err) => {
    console.log(err);
});

module.exports = mongoose.model("chat", chat, "chat");