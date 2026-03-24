const express = require('express');
const stuffController = require('../../controllers/stuffController');
const auth = require('../../middleware/verifyJWT');
const router = express.Router();

router.route('/')
    .post(auth, stuffController.createStuff)
    .get(auth, stuffController.getAllStuff);

router.route('/:id')
    .get(auth, stuffController.getOneStuff)
    .put(auth, stuffController.updateStuff)
    .delete(auth, stuffController.deleteStuff);

module.exports = router;