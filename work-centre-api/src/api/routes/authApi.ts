import express from 'express';
import * as registerActions from '../actions/authentication/registration';
import * as loggingActions from '../actions/authentication/logging';


const authApiRouter = express.Router();

authApiRouter.post('/register', registerActions.register);
authApiRouter.post('/login', loggingActions.login);
authApiRouter.get('/session', loggingActions.isSessionActive);


export default authApiRouter;