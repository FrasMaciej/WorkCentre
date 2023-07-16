import express from 'express';
import * as testActions from '../actions/testActions';

const apiRouter = express.Router();

apiRouter.get('/test', testActions.test);

export default apiRouter;
