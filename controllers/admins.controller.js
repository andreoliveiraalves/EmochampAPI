const db = require("../models/index.js");

const bcrypt = require("bcryptjs");

const Admins = db.admins;

exports.postAdmin = async (req, res) => {

    console.log("POST ADMIN")

    try {
        let id 
        
        if (!req.body && !req.body.username && !req.body.password)
        return res.status(400).json({
            success: false,
            msg: "Username and password are mandatory"
        });
        
        const admin = new Admins({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10)
        })

        let newAdmin = await admin.save()
        id = newAdmin._id
        await admin.save()

        res.status(201).json({
            success: true,
            msg: "New Admin created.",
            URL: `/admin/${id}`
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

exports.getAdminById = async (req, res) => {

    console.log("GET ADMIN BY ID")

    const id = req.params.admin_id

    try {

        let dbAdmin = await Admins.findById(id).exec();

        res.status(200).json({
            success: true,
            msg: "GET ADMIN ID",
            patient: `${dbAdmin}`,
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

exports.deleteAdminById = async (req, res) => {

    console.log("DELETE ADMIN BY ID");

    const id = req.params.admin_id

    try {

        await Admins.findByIdAndRemove(id).exec()

        res.status(200).json({
            success: true,
            msg: "DELETE ADMIN ID",
            admin: `${id}`,
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

exports.patchAdminById = async (req, res) => {

    console.log("PATCH ADMIN BY ID");

    try {

        const id = req.params.admin_id

        let dbAdmin = await Admins.findById(id).exec();

        if (dbAdmin.name != req.body.name) {
            dbAdmin.name = req.body.name
        }

        if (dbAdmin.email != req.body.email) {
            dbAdmin.email = req.body.email
        }

        await Admins.findByIdAndUpdate(id, dbAdmin, {
            useFindAndModify: false
        }).exec();

        res.status(200).json({
            success: true,
            msg: "PATCH ADMIN ID",
            patient: `${dbAdmin}`,
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