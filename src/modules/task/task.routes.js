import express from 'express'; 
import TaskController from './task.controller.js';
import { validateUser , validateSchema } from '../../providers/schemaValidator.js';
import { addTask } from './task.validation.js';

const router = express.Router() ; 

router.post('/create/:id',validateSchema(addTask),validateUser(['admin','tl']),TaskController.addTask);
router.get('/display/:id',validateUser(['admin','tl']),TaskController.displayTask);
router.delete('/delete/:id',validateUser(['admin','tl']),TaskController.deleteTask);
router.put('/update/:id',validateUser(['admin','tl']),TaskController.updateTask);
router.get('/user/:userId',validateUser(['developer','tl','admin']),TaskController.displayUserSpecificTask);
router.get('/project/:projectId/user/:userId',validateUser(['developer','tl','admin']),TaskController.displayProjectSpecificUserTask);
router.get('/project/:projectId',validateUser(['developer','tl','admin']),TaskController.displayTaskOfProject);


export default router ; 