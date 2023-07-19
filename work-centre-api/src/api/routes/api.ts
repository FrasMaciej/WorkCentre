import express from 'express';
import * as testActions from '../actions/testActions';

const apiRouter = express.Router();

apiRouter.get('/test', testActions.test);
apiRouter.get('/test2', testActions.test2);


export default apiRouter;
