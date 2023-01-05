const db = require("../models/index.js");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const config = require("../config/db.config.js");

const Patients = db.patients;
const Psychologists = db.psychologists;
const Admins = db.admins;

exports.login = async (req, res) => {

    console.log("LOGIN")

    let check, user
    let role = ""

    try {
        if (!req.body || !req.body.name || !req.body.password)
            return res.status(400).json({
                success: false,
                msg: "Must provide username and password."
            });

        let patient = await Patients.findOne({
            name: req.body.name
        });

        let psychologist = await Psychologists.findOne({
            name: req.body.name
        });
        let admin = await Admins.findOne({
            name: req.body.name
        });

        console.log(patient)
        console.log(psychologist)
        console.log(admin)

        if ((!patient) && (!admin) && (!psychologist)) return res.status(404).json({
            success: false,
            msg: "User not found."
        });
        // tests a string (password in body) against a hash (password in database)
        if (patient != null) {
            check = bcrypt.compareSync(req.body.password, patient.password);
            user = patient
            role = "patient"
        }
        if (psychologist != null) {
            check = bcrypt.compareSync(req.body.password, psychologist.password);
            user = psychologist
            role = "psychologist"

        }
        if (admin != null) {
            check = bcrypt.compareSync(req.body.password, admin.password);
            user = admin
            role = "admin"

        }
        if (!check) return res.status(401).json({
            success: false,
            accessToken: null,
            msg: "Invalid credentials!"
        });
        // sign the given payload (user ID and role) into a JWT payload – builds JWT token, using secret key

        const token = jwt.sign({
                id: user.id,
                role: role
            },
            config.SECRET, {
                expiresIn: '24h' // 24 hours
            });

        console.log(token)

        return res.status(200).json({
            success: true,
            accessToken: token,
            role: role
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            msg: err.message
        });

        res.status(500).json({
            success: false,
            msg: "Something went wrong. Please try again later"
        });;
    };



}