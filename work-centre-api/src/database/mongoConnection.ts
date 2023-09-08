import { MongoClient, ServerApiVersion, Db, Collection } from 'mongodb';
import { constants } from '../constants';

const uri = constants.db_connection_string || '';
const client: MongoClient = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,

    }
});

async function connectToDatabase() {
    try {
        await client.connect();
        const database: Db = await client.db(constants.db_name);
        loadCollections(database);

        console.log('Successfully connected to database!');
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

async function loadCollections(database: Db) {
    const usersCollection = await database.collection<UserSchema>('users');
    collections.users = usersCollection;
}

export { connectToDatabase, closeDatabaseConnection };
export const collections: { users?: Collection<UserSchema> } = {};
