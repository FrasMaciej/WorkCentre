import express from 'express';
import * as usersActions from '../actions/users/usersService';

const usersApiRouter = express.Router();

usersApiRouter.get('/users', usersActions.getUsers);

export default usersApiRouter;