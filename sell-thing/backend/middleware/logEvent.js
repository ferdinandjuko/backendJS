const uuid = require('uuid');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs/promises')

const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), 'dd-MM-yy\tHH:mm:ss')}`;
}