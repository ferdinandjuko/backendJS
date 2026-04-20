const dns = require("node:dns/promises");
dns.setServers(['8.8.8.8', '1.1.1.1']);

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI)
    } catch (error) {
        console.error(error);
    }
}

module.exports = connectDB;