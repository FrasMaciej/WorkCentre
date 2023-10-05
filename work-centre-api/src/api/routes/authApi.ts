import express from 'express';
import * as registerActions from '../actions/authentication/registrationService';
import * as loggingActions from '../actions/authentication/loggingService';
import { verifyEmail } from '../actions/authentication/confirmEmailService';


const authApiRouter = express.Router();

authApiRouter.post('/register', registerActions.register);
authApiRouter.post('/login', loggingActions.login);
authApiRouter.post('/logout', loggingActions.logout);
authApiRouter.get('/session', loggingActions.isSessionActive);
authApiRouter.get('/verify-email', verifyEmail);



export default authApiRouter;