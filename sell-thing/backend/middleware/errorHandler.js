const { logEvents } = require('./logEvents');

exports.errorHandler = (err, req, res, next) => {
    logEvents(`${err.name}: ${err.message}`, 'errLog.log');
}