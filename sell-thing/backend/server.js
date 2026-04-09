const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');

app.set('port', process.env.PORT || 3000);

const server = http.createServer(app);

mongoose.connection.once('open', () => {
    console.log('connected to MongoDB');
})
server.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
})