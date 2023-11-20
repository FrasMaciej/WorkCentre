import express from 'express';
import * as organizationsActions from '../actions/organizations/organizationsService';
import { authenticateAccess } from '../actions/authentication/loggingService';

const organizationsApiRouter = express.Router();

organizationsApiRouter.get('/organizations', authenticateAccess, organizationsActions.getOrganizations);
organizationsApiRouter.get('/organizations/owner/:id', authenticateAccess, organizationsActions.getOrganizationsOwner);
organizationsApiRouter.post('/organizations', authenticateAccess, organizationsActions.addOrganization);
organizationsApiRouter.delete('/organizations/:id', authenticateAccess, organizationsActions.removeOrganization);



export default organizationsApiRouter;