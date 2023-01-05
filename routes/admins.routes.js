const express = require('express');
const adminsController = require("../controllers/admins.controller");

let router = express.Router();

router.route('/')
.post(adminsController.postAdmin) //DONE

router.route('/:admin_id')
.get(adminsController.getAdminById) //DONE
.delete(adminsController.deleteAdminById) //DONE
.patch(adminsController.patchAdminById) //DONE




router.all('*', function (req, res) {
    res.status(404).json({ sucess: false, message: 'EmoChamp: Route Not Found' });
})

module.exports = router;