import express from 'express';
import * as organizationsActions from '../actions/organizations/organizationsService';

const organizationsApiRouter = express.Router();

organizationsApiRouter.get('/organizations', organizationsActions.getOrganizations);
organizationsApiRouter.get('/organizations/owner/:id', organizationsActions.getOrganizationsOwner);
organizationsApiRouter.post('/organizations', organizationsActions.addOrganization);
organizationsApiRouter.delete('/organizations/:id', organizationsActions.removeOrganization);



export default organizationsApiRouter;