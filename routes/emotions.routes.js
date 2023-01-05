const express = require('express');

const emotionsControllers = require("../controllers/emotions.controller");

let router = express.Router();

const multer = require('multer');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'C:/Users/alfon/Downloads') // set up a directory where all files will be saved
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()) // give the files a new identifier
    }
})
// acccepts a single file upload: specifies the field name where multer looks for the file
const multerUploads = multer({
    storage
}).single('image');


router.route('/')
    .post(multerUploads, emotionsControllers.postImage)

router.route('/:emotion_name')
    .get(emotionsControllers.getEmotionByName)

router.route('/:emotion_name/:image_id')
    .delete(emotionsControllers.deleteImageById)


router.all('*', function (req, res) {
    res.status(404).json({
        sucess: false,
        message: 'EmoChamp: Route Not Found'
    });
})

module.exports = router;