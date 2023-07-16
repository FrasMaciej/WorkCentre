import express from 'express';
import apiRouter from './api/routes/api';

import { constants } from './projectConfigurationConstants';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(constants.server_port, () => {
    return console.log(`Express is listening on port ${constants.server_port}`);
});

app.use('/api', apiRouter);


