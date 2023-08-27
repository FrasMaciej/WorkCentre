import * as process from 'process';
import { config } from 'dotenv'
config();

export const constants = {
    server_port: Number(process.env.PORT || 8080),
    db_connection_string: process.env.DB_CONNECTION_STRING
}
