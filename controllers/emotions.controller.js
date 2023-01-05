const db = require("../models/index.js");
const cloudinary = require('../config/cloud.config.js');

const Emotions = db.emotions;

exports.postImage = async (req, res) => {

    console.log("POST IMAGE")

    try {

        if (!req.body && !req.body.name)
            return res.status(400).json({
                success: false,
                msg: "Emotion name Missing"
            });

        if (!req.file)
            return res.status(400).json({
                success: false,
                msg: "Image Missing"
            });

        let emotion = await Emotions.findOne({
            name: req.body.name
        });

        if (emotion == null) {
            return res.status(401).json({
                success: false,
                msgs: "Emotion name dosen't exists"
            })
        }

        let user_image = await cloudinary.uploader.upload(req.file.path);

        emotion.pictures.push(user_image.public_id)

        await Emotions.findByIdAndUpdate(emotion.id, emotion, {
            useFindAndModify: false
        }).exec();


        return res.status(201).json({
            success: true,
            msg: "New Image created.",
            URL: `${user_image.url}`
        });

    } catch (err) {
        res.status(400).json({
            success: false,
            msg: err.message
        });

        res.status(500).json({
            success: false,
            msg: "Something went wrong. Please try again later"
        });
    }

}

exports.getEmotionByName = async (req, res) => {

    console.log("GET EMOTION BY NAME")

    try {

        let emotion = await Emotions.findOne({
            name: req.params.emotion_name
        });

        if (emotion == null) {
            return res.status(401).json({
                success: false,
                msgs: "Emotion name dosen't exists"
            })
        }

        res.status(200).json({
            success: true,
            msg: "GET EMOTION",
            emotion: `${emotion}`
        });

    } catch (err) {
        res.status(400).json({
            success: false,
            msg: err.message
        });

        res.status(500).json({
            success: false,
            msg: "Something went wrong. Please try again later"
        });
    }
}

exports.deleteImageById = async (req, res) => {

    console.log("DELETE IMAGE BY ID");

    try {

        let emotion = await Emotions.findOne({
            name: req.params.emotion_name
        });

        if (emotion == null) {
            return res.status(401).json({
                success: false,
                msgs: "Emotion name dosen't exists"
            })
        }

        let index = emotion.pictures.indexOf(req.params.image_id)

        if (index == -1)
            return res.status(401).json({
                success: false,
                msgs: "Image id dosen't exists"
            })

        emotion.pictures.splice(index, 1)

        await Emotions.findByIdAndUpdate(emotion.id, emotion, {
            useFindAndModify: false
        }).exec();

        res.status(200).json({
            success: true,
            msg: "DELETE IMAGE",
            url: `${req.url}`
        });

    } catch (err) {
        res.status(400).json({
            success: false,
            msg: err.message
        });

        res.status(500).json({
            success: false,
            msg: "Something went wrong. Please try again later"
        });
    }
}