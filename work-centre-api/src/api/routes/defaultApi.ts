import express from 'express';
import * as testActions from '../actions/apiDefault';

const apiRouter = express.Router();

apiRouter.get('', testActions.apiDefault);

export default apiRouter;
