"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = __importDefault(require("./api/routes/api"));
const projectConfigurationConstants_1 = require("./projectConfigurationConstants");
const app = (0, express_1.default)();
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(projectConfigurationConstants_1.constants.server_port, () => {
    return console.log(`Express is listening on port ${projectConfigurationConstants_1.constants.server_port}`);
});
app.use('/api', api_1.default);
