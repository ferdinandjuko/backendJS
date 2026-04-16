const express = require('express');
const stuffController = require('../../controllers/stuffController');

const ROLE_LIST = require('../../config/roleList');

const auth = require('../../middleware/verifyJWT');
const multer = require('../../middleware/multer-config');
const verifyRoles = require('../../middleware/verifyRoles');
const router = express.Router();

router.route('/')
    .post(auth, verifyRoles(ROLE_LIST.User, ROLE_LIST.Admin), multer, stuffController.createStuff)
    .get(auth, verifyRoles(ROLE_LIST.User, ROLE_LIST.Admin), stuffController.getAllStuff);

router.route('/:id')
    .get(auth, verifyRoles(ROLE_LIST.User, ROLE_LIST.Admin), stuffController.getOneStuff)
    .put(auth, verifyRoles(ROLE_LIST.User, ROLE_LIST.Admin), multer, stuffController.updateStuff)
    .delete(auth, verifyRoles(ROLE_LIST.User, ROLE_LIST.Admin), stuffController.deleteStuff);

module.exports = router;