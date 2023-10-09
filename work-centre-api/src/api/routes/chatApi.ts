import express from 'express';
import * as chatActions from '../actions/chat/chatService';


const chatApiRouter = express.Router();

chatApiRouter.get('/chats/:id', chatActions.getChats);

export default chatApiRouter;