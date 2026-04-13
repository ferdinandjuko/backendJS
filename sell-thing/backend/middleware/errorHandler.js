const { logEvents } = require('./logEvents');

exports.errorHandler = (err, req, res, next) => {
    logEvents(`${err.name}: ${err.message}`, 'errLog.log');
    console.log(err.stack);
    res.status(500).send(err.message);
    next();
}