import express from 'express';
import * as usersActions from '../actions/users/usersService';

const usersApiRouter = express.Router();

usersApiRouter.get('/users', usersActions.getUsers);
usersApiRouter.get('/user/:id', usersActions.getUser);

export default usersApiRouter;