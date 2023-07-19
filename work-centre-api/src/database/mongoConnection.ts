import { MongoClient } from 'mongodb';
import { constants } from '../projectConfigurationConstants';

const uri = constants.db_connection_string || '';
const client = new MongoClient(uri, {});

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to Cosmos DB successfully!');
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