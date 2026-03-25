const multer = require('multer');

const storage = multer.diskStorage({
    destionation: (req, file, callback) => {
        callback(null, 'images')
    }
})