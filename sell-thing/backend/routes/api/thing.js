const express = require('express');
const router = express.Router();
const Thing = require('../../models/Thing');
const stuffController = require('../../controllers/stuffController');

router.route('/')
    .post(stuffController.createStuff)
    .get(stuffController.getAllStuff);

router.route('/:id')
    .get(stuffController.getOneStuff)
    .put(stuffController.updateStuff)
    .delete(stuffController.deleteStuff);

module.exports = router;