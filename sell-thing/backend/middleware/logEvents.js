const { format } = require('date-fns');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs/promises')

exports.logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), 'dd-MM-yy\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${message}\n`;
    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
        }
        // Write inside a file named logName
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logName), logItem);
    } catch (err) {
        console.error(err);
    }
}

exports.logger = (req, res, next) => {
    this.logEvents(`${req.method}\t${req.protocol}://${req.get('host')}\t${req.url}`, 'reqLog.log');
    next();
}