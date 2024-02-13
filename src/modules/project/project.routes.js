import express from 'express'; 
import projectController from './project.controller.js';
import { projectSchema } from './project.validation.js';
import { validateSchema , validateUser } from '../../providers/schemaValidator.js';

const router = express.Router();

router.post('/add',validateSchema(projectSchema),validateUser(['admin']),projectController.addProject);
router.delete('/delete/:id',validateUser(['admin']),projectController.deleteProject);
router.get('/display',validateUser(['admin','tl']),projectController.displayProject);
router.put('/update/:id',validateUser(['admin']),projectController.updateProject);


export default router ; 