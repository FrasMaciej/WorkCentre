import express from 'express';
import * as notificationsActions from '../actions/notifications/notificationsService';

const notificationsApiRouter = express.Router();

notificationsApiRouter.get('/notifications/:id', notificationsActions.getNotifications);


export default notificationsApiRouter;