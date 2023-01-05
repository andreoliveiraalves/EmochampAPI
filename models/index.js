const dbConfig = require('../config/db.config.js');

const mongoose = require("mongoose");

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.URL;

(async () => {
    try {
        await db.mongoose.connect(db.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to the database!");
    } catch (error) {
        console.log("Cannot connect to the database!", error);
        process.exit();
    }
})();

db.patients = require("./patients.model.js")(mongoose);
db.psychologists = require("./psychologists.model.js")(mongoose);
db.emotions = require("./emotions.model.js")(mongoose);
db.admins = require("./admins.model.js")(mongoose);


module.exports = db;