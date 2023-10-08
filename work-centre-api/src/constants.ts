/// <reference path="../../shared/types/auth.d.ts" />
/// <reference path="../../shared/types/user.d.ts" />

import * as process from 'process';
import { config } from 'dotenv'
import { settingsLocal } from './appSettingsLocal';
import { settingsProd } from './appSettingsProd';

config();
export const constants = {
    server_port: Number(process.env.SERVER_PORT || 8080),
    db_connection_string: process.env.DB_CONNECTION_STRING,
    db_name: process.env.DB_NAME,
    is_production: process.env.NODE_ENV === 'production',
    address: process.env.API_URL
}

export function readAppSettings() {
    let appSettings;

    if (process.env.NODE_ENV === 'production') {
        appSettings = settingsProd;
    } else {
        appSettings = settingsLocal;
    }
    return appSettings;
}
