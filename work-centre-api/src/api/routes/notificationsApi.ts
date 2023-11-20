import express from 'express';
import * as notificationsActions from '../actions/notifications/notificationsService';
import { authenticateAccess } from '../actions/authentication/loggingService';

const notificationsApiRouter = express.Router();

notificationsApiRouter.get('/notifications/:id', authenticateAccess, notificationsActions.getNotifications);
notificationsApiRouter.put('/notifications/change', authenticateAccess, notificationsActions.changeNotificationStatus);


export default notificationsApiRouter;