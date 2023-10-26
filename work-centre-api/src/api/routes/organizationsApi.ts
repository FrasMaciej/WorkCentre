import express from 'express';
import * as organizationsActions from '../actions/organizations/organizationsService';

const organizationsApiRouter = express.Router();

organizationsApiRouter.get('/organizations', organizationsActions.getOrganizations);
organizationsApiRouter.get('/organizations/author/:id', organizationsActions.getOrganizationsOwner);
organizationsApiRouter.post('/organizations', organizationsActions.addOrganization);



export default organizationsApiRouter;