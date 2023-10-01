import express from 'express';
import * as testActions from './apiDefault';

const apiRouter = express.Router();

apiRouter.get('', testActions.apiDefault);

export default apiRouter;
