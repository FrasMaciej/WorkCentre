import { MongoClient, ServerApiVersion, Db, Collection } from 'mongodb';
import { constants } from '../constants';
import { UserSchema } from './models/users/authentication';
import { ConversationSchema } from './models/message/conversation';
import { JobSchema } from './models/job/job';
import { OrganizationSchema } from './models/organization/organization';

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
    const conversationsCollection = await database.collection<ConversationSchema>('conversations');
    const jobsCollection = await database.collection<JobSchema>('jobs');
    const organizationsCollection = await database.collection<OrganizationSchema>('organizations');

    collections.users = usersCollection;
    collections.conversations = conversationsCollection;
    collections.jobs = jobsCollection;
    collections.organizations = organizationsCollection;
}

export { connectToDatabase, closeDatabaseConnection };
export const collections: {
    users?: Collection<UserSchema>,
    conversations?: Collection<ConversationSchema>,
    jobs?: Collection<JobSchema>,
    organizations?: Collection<OrganizationSchema>
} = {};
