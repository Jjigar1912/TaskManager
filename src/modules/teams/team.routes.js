import express from 'express' ; 
import teamController from './team.controller.js';
import { validateSchema , storeAdminId} from '../../providers/schemaValidator.js';
import { teamSchema } from './team.validation.js';

const router = express.Router();

router.post('/add',validateSchema(teamSchema),storeAdminId,teamController.addTeam);

export default router ; 