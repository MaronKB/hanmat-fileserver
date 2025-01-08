const express = require("express");
const router = express.Router();
const chatSchema = require("../schema/chat");
const roomSchema = require("../schema/room");

router.post("/room", async (req, res) => {
    const user1 = req.body.user1;
    const user2 = req.body.user2;
    const room = await roomSchema.findOne({
        users: {
            $all: [user1, user2]
        }
    }).exec();
    if (room) {
        res.send(room);
    } else {
        const newRoom = new roomSchema({
            users: [user1, user2]
        });
        await newRoom.save();
        res.send(newRoom);
    }
});

router.post("/message", async (req, res) => {
    const list = await chatSchema.find({
        room: req.body.room
    }).exec();
    console.log(list);
    res.send(list);
});

module.exports = router;