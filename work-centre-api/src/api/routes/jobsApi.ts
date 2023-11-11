import express from 'express';
import * as jobsActions from '../actions/jobs/jobsService';


const jobsApiRouter = express.Router();

jobsApiRouter.post('/jobs', jobsActions.addJob);
jobsApiRouter.get('/jobs', jobsActions.getJobs);
jobsApiRouter.delete('/jobs/:id', jobsActions.removeJob);
jobsApiRouter.get('/jobs/author/:id', jobsActions.getJobsAuthor);
jobsApiRouter.get('/jobs/:id', jobsActions.getJob);

export default jobsApiRouter;