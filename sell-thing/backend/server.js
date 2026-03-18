const http = require('http');
const app = require('./app');

app.set('port', process.env.PORT || 3501);

const server = http.createServer(app);

server.listen(process.env.PORT || 3501, () => {
    console.log(`Server is running on port ${process.env.PORT || 3501}`);
})