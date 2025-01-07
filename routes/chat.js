const express = require("express");
const router = express.Router();
const chatSchema = require("../schema/chat");

router.get("/", async (req, res) => {
    console.log("Chat route");
    const list = await chatSchema.find({}).exec();
    console.log(list);
    res.send(list);
});

module.exports = router;