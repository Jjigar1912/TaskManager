import express from 'express'; 
import projectController from './project.controller.js';
import { projectSchema } from './project.validation.js';
import { validateSchema } from '../../providers/schemaValidator.js';

const router = express.Router();

router.post('/add',validateSchema(projectSchema),projectController.addProject);

export default router ; 