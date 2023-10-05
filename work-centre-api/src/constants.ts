/// <reference path="../../shared/types/auth.d.ts" />
/// <reference path="../../shared/types/user.d.ts" />

import * as process from 'process';
import { config } from 'dotenv'
import path from 'path';
import fs from 'fs';

config();
export const constants = {
    server_port: Number(process.env.SERVER_PORT || 8080),
    db_connection_string: process.env.DB_CONNECTION_STRING,
    db_name: process.env.DB_NAME,
    is_production: process.env.NODE_ENV === 'production'
}

export function readAppSettings() {
    try {
        // fs.readFile("./appSettingsProd.json");
        // const data = fs.readFileSync('appSettingsProd.json', 'utf8');


        // const settingsProd = require("appSettingsProd.json");
        // const settingsLocal = require("appSettingsLocal.json");
        // let config;
        // if (constants.is_production) {
        //     config = settingsProd;
        // } else {
        //     config = settingsLocal;
        // }
        // const appState = {
        //     config: config,
        // };
        // console.log('Ustawienia konfiguracyjne:', appState.config);
    } catch (err) {
        console.error(err);
    }
}
