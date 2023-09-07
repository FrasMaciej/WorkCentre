/// <reference path="../../shared/types/auth.d.ts" />

import * as process from 'process';
import { config } from 'dotenv'
config();

export const constants = {
    server_port: Number(process.env.SERVER_PORT || 8080),
    db_connection_string: process.env.DB_CONNECTION_STRING,
    db_name: process.env.DB_NAME
}
