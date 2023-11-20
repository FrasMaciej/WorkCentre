import express from 'express';
import * as jobsActions from '../actions/jobs/jobsService';
import { authenticateAccess } from '../actions/authentication/loggingService';



const jobsApiRouter = express.Router();

jobsApiRouter.post('/jobs', authenticateAccess, jobsActions.addJob);
jobsApiRouter.get('/jobs', authenticateAccess, jobsActions.getJobs);
jobsApiRouter.delete('/jobs/:id', authenticateAccess, jobsActions.removeJob);
jobsApiRouter.get('/jobs/author/:id', authenticateAccess, jobsActions.getJobsAuthor);
jobsApiRouter.get('/jobs/:id', authenticateAccess, jobsActions.getJob);
jobsApiRouter.post('/jobs/apply', authenticateAccess, jobsActions.applyJob);
jobsApiRouter.post('/jobs/resign', authenticateAccess, jobsActions.resignJob);
jobsApiRouter.get('/jobs/applicant/:id', authenticateAccess, jobsActions.getJobsApplied);
jobsApiRouter.get('/job/applicants/:id', authenticateAccess, jobsActions.getJobOfferApplicants);
jobsApiRouter.put('/job/application/edit-state', authenticateAccess, jobsActions.editState);
jobsApiRouter.post('/job/best-candidates', authenticateAccess, jobsActions.findBestCandidates);

export default jobsApiRouter;