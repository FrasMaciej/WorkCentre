import express from 'express';
import * as registerActions from '../actions/authentication/registration';

const authApiRouter = express.Router();

authApiRouter.post('/register', registerActions.register)

export default authApiRouter;