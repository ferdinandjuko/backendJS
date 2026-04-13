const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs/promises')

exports.logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), 'dd-MM-yy\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid().split('-')[0]}\t${message}\n`;
    console.log(logItem);
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