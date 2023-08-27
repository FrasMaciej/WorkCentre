import { MongoClient, ServerApiVersion } from 'mongodb';
import { constants } from '../constants';

const uri = constants.db_connection_string || '';
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function connectToDatabase() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log('Connected to MongoDB successfully!');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}

async function closeDatabaseConnection() {
    try {
        await client.close();
        console.log('Connection to the database closed successfully.');
    } catch (error) {
        console.error('Error closing the database connection:', error);
    }
}

export { connectToDatabase, closeDatabaseConnection };