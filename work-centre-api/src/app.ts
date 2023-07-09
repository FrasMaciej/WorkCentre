import express from 'express';

import { constants } from './constants';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(constants.server_port, () => {
    return console.log(`Express is listening on port ${constants.server_port}`);
});

