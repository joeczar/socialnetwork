const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        console.log("in multer disk storage", file);
        callback(null, __dirname + "/../uploads");
    },
    filename: function (req, file, callback) {
        console.log("in multer filename", file.originalname);
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});
module.exports = {
    diskStorage,
    uploader,
};
