const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");

const mediaFolder = "C:/Projects/test-media";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(mediaFolder));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

router.post("/upload", async (req, res) => {
    const upload = multer({ storage: storage }).single("file");
    upload(req, res, function (err) {
        if (err) {
            res.send({
                status: "error",
                message: err.message
            });
        } else {
            res.send({
                status: "success",
                filename: req.file.filename
            });
        }
    });
});

module.exports = router;