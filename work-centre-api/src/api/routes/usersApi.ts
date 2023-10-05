import express from 'express';
import * as registerActions from '../actions/authentication/registrationService';

const usersApiRouter = express.Router();

usersApiRouter.get('/users', registerActions.register);

export default usersApiRouter;