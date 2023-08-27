import express from 'express';
import apiRouter from './api/routes/api';
import authApiRouter from './api/routes/authApi';
import { constants } from './constants';
import { connectToDatabase, closeDatabaseConnection } from './database/mongoConnection'

const app = express();

app.get('/', (req, res) => {
    res.send('Welcome on Work-Centre Server ® HACKER');
});

app.use('/api', apiRouter, authApiRouter);

app.listen(constants.server_port, () => {
    console.log(`Express is listening on port ${constants.server_port}`);
    connectToDatabase();
});

process.on('SIGINT', async () => {
    await closeDatabaseConnection();
    process.exit();
});