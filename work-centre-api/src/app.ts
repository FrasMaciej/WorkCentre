import express from 'express';
import apiRouter from './api/routes/api';
import { constants } from './projectConfigurationConstants';
import { MongoClient } from 'mongodb';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(constants.server_port, () => {
    return console.log(`Express is listening on port ${constants.server_port}`);
});

app.use('/api', apiRouter);

const uri = constants.db_connection_string || '';
const client = new MongoClient(uri, {});

async function run() {
    try {
        await client.connect();
        console.log('Connected to Cosmos DB successfully!');
        const collection = client.db('nazwa_bazy_danych').collection('users');
        const newDocument = {
            name: 'Jane Smith',
            age: 25,
            email: 'jane.smith@example.com',
        };
        const result = await collection.insertOne(newDocument);
        console.log('Inserted document with _id:', result.insertedId);
    } finally {
        await client.close();
    }
}

run().catch(console.dir);