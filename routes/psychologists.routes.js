const express = require('express');
const psychologistsController = require("../controllers/psychologists.controller");

let router = express.Router();


router.route('/')
.post(psychologistsController.postPsychologist) //DONE

router.route('/:psychologist_id')
.get(psychologistsController.getPsychologistById) //DONE
.delete(psychologistsController.deletePsychologistById) //DONE
.patch(psychologistsController.patchPsychologistById) //DONE

//router.route('/psychologists/:psychologist_id/:patient_id').get(dbController.getUserById)

router.all('*', function (req, res) {
    res.status(404).json({ sucess: false, message: 'EmoChamp: Route Not Found' });
})

module.exports = router;