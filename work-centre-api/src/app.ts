// import express from 'express';
// import apiRouter from './api/routes/api';

// import { constants } from './projectConfigurationConstants';

// const app = express();

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

// app.listen(constants.server_port, () => {
//     return console.log(`Express is listening on port ${constants.server_port}`);
// });

// app.use('/api', apiRouter);

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});

server.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});


