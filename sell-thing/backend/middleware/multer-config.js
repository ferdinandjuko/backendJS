const multer = require('multer');

const storage = multer.diskStorage({
    destionation: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
    }
})