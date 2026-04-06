const uuid = require('uuid');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs/promises')

const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), 'dd-MM-yy\tHH:mm:ss')}`;
    const logItem = `${datetime}\t${uuid()}\t${message}\n`;
    console.log(logItem);
    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
        }
        // Write inside a file named logName
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs'), logItem);
    } catch (err) {
        console.error(err);
    }
}