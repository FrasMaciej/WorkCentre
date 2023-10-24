import express from 'express';
import * as jobsActions from '../actions/jobs/jobsService';


const jobsApiRouter = express.Router();

jobsApiRouter.post('/jobs', jobsActions.addJob);

export default jobsApiRouter;