const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");

const mediaFolder = "./media";

//todo: 리사이징

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, mediaFolder + "/");
    },
    filename: function (req, file, cb) {
        file.originalname = Buffer.from(file.originalname, "latin1").toString("utf-8");
        const ext = path.extname(file.originalname);
        cb(null, path.basename(file.originalname, ext) + "-" + Date.now() + ext);
    }
});

const upload = multer({ storage: storage }).array("image", 4);

router.post("/upload", (req, res) => {
    console.log(req.body);
    console.log()
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            console.log(err);
            return res.status(500).json(err);
        } else if (err) {
            console.log(err);
            return res.status(500).json(err);
        }
        return res.status(200).send(req.file);
    });
});

module.exports = router;