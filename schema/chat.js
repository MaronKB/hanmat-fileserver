const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const chat = new mongoose.Schema({
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "room"
    },
    user: String,
    message: String,
}, { timestamps: true });

mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@130.162.150.174:27017/hanmatchat?authSource=admin`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {}).catch((err) => {
    console.log(err);
});

module.exports = mongoose.model("chat", chat, "chat");