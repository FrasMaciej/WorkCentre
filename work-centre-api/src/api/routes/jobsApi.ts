import express from 'express';
import * as jobsActions from '../actions/jobs/jobsService';


const jobsApiRouter = express.Router();

jobsApiRouter.post('/jobs', jobsActions.addJob);
jobsApiRouter.get('/jobs', jobsActions.getJobs);
jobsApiRouter.delete('/jobs/:id', jobsActions.removeJob);
jobsApiRouter.get('/jobs/author/:id', jobsActions.getJobsAuthor);
jobsApiRouter.get('/jobs/:id', jobsActions.getJob);
jobsApiRouter.post('/jobs/apply', jobsActions.applyJob);
jobsApiRouter.post('/jobs/resign', jobsActions.resignJob);
jobsApiRouter.get('/jobs/applicant/:id', jobsActions.getJobsApplied);


export default jobsApiRouter;