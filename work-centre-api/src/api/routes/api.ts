import express from 'express';
import * as testActions from '../actions/testActions';
import { isLoggedIn } from '../actions/authentication/logging';

const apiRouter = express.Router();

apiRouter.get('/test', testActions.test);
apiRouter.get('/test2', isLoggedIn, testActions.test2);


export default apiRouter;
