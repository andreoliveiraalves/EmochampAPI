const express = require('express');
const patientsController = require("../controllers/patients.controller");

let router = express.Router();

router.route('/')
    .post(patientsController.postPatient) //DONE

router.route('/:patient_id')
    .get(patientsController.getPatientById) //DONE
    .delete(patientsController.deletePatientById) //DONE
    .patch(patientsController.patchPatientById) //DONE


router.all('*', function (req, res) {
    res.status(404).json({
        sucess: false,
        message: 'EmoChamp: Route Not Found'
    });
})

module.exports = router;