import express from 'express'; 
import TaskController from './task.controller.js';
import { validateUser , validateSchema } from '../../providers/schemaValidator.js';
import { addTask } from './task.validation.js';

const router = express.Router() ; 

router.post('/create/:id',validateSchema(addTask),validateUser(['admin','tl']),TaskController.addTask);
router.get('/display/:id',validateUser(['admin','tl']),TaskController.displayTask);
router.delete('/delete/:id',validateUser(['admin','tl']),TaskController.deleteTask);

export default router ; 