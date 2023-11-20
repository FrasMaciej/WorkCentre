import express from 'express';
import * as chatActions from '../actions/chat/chatService';
import { authenticateAccess } from '../actions/authentication/loggingService';

const chatApiRouter = express.Router();

chatApiRouter.get('/chats/:id', authenticateAccess, chatActions.getChats);

export default chatApiRouter;