import * as process from 'process';
import { config } from 'dotenv'
config();

export const constants = {
    server_port: Number(process.env.SERVER_PORT || 8080)
}
