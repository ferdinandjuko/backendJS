const allowOrigins = require('./allowOrigins.js');

const corsOption = {
    origin: (origin, callBack) => {
        if (allowOrigins.indexOf(origin) !== -1 || !origin) {
            callBack(null, true);
        } else {
            callBack(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOption;