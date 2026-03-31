const express = require('express');
const stuffController = require('../../controllers/stuffController');

const auth = require('../../middleware/verifyJWT');
const multer = require('../../middleware/multer-config');
const router = express.Router();

router.route('/')
    .post(auth, multer, stuffController.createStuff)
    .get(auth, stuffController.getAllStuff);

router.route('/:id')
    .get(auth, stuffController.getOneStuff)
    .put(auth, multer, stuffController.updateStuff)
    .delete(auth, stuffController.deleteStuff);

module.exports = router;