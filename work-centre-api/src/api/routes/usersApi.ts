import express from 'express';
import * as usersActions from '../actions/users/usersService';

const usersApiRouter = express.Router();

usersApiRouter.get('/users', usersActions.getUsers);
usersApiRouter.get('/users-detailed', usersActions.getDetailedUsers);
usersApiRouter.get('/user/:id', usersActions.getUser);
usersApiRouter.put('/user', usersActions.updateProfile);


export default usersApiRouter;