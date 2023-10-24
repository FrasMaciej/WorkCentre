import express from 'express';
import * as jobsActions from '../actions/jobs/jobsService';


const jobsApiRouter = express.Router();

jobsApiRouter.post('/jobs', jobsActions.addJob);
jobsApiRouter.get('/jobs', jobsActions.getJobs);

export default jobsApiRouter;