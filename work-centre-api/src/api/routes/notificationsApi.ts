import express from 'express';
import * as notificationsActions from '../actions/notifications/notificationsService';

const notificationsApiRouter = express.Router();

notificationsApiRouter.get('/notifications/:id', notificationsActions.getNotifications);
notificationsApiRouter.put('/notifications/change', notificationsActions.changeNotificationStatus);


export default notificationsApiRouter;