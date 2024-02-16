import express from 'express'; 
import TaskController from './task.controller.js';
import { validateUser , validateSchema } from '../../providers/schemaValidator.js';
import { addTask } from './task.validation.js';

const router = express.Router() ; 


/**
 * @swagger 
 * /task/create/{projectId}:
 *   post: 
 *     summary: Adds a new task
 *     tags: 
 *       - Task
 *     produces: 
 *       - application/json
 *     consumes: 
 *       - application/json
 *     parameters: 
 *       - name: projectId 
 *         in: path
 *         required: true
 *       - name: task 
 *         in: body 
 *         schema: 
 *           type: object 
 *           properties: 
 *             title: 
 *               type: string
 *               required: true 
 *             description: 
 *               type: string 
 *               required: true
 *             task_status: 
 *               type: string
 *               enum: 
 *                 - Todo
 *                 - In Progress
 *                 - Testing
 *                 - Done
 *                 - Reopen
 *                 - Hold
 *               required: true 
 *             assigned_at: 
 *               type: string 
 *               required: true 
 *             due_date: 
 *               type: string 
 *               required: true 
 *             completed_date: 
 *               type: string 
 *               required: true 
 *             assignToId: 
 *               type: string 
 *               required: true 
 *             category: 
 *               type: array
 *               required: true
 *               items: 
 *                 type: string
 *     responses: 
 *       '201': 
 *         description: 'Created Task' 
 *         schema: 
 *           type: object 
 *           properties: 
 *             status: 
 *               type: integer
 *               required: true 
 *             message: 
 *               type: string
 *               required: true 
 *             data: 
 *               type: string 
 *               required: true
 *       '500':
 *         description: 'Internal Server Error'
 *         schema: 
 *           type: object 
 *           properties: 
 *             status: 
 *               type: integer
 *               required: true 
 *             message: 
 *               type: string
 *               required: true 
 */
router.post('/create/:projectId',validateSchema(addTask),validateUser(['admin','tl']),TaskController.addTask);
router.get('/display/:id',validateUser(['admin','tl']),TaskController.displayTask);

/**
 * @swagger 
 * 
 * /task/delete/{taskId}:
 *   delete: 
 *     summary: Delete a task by id 
 *     parameters: 
 *       - in: path 
 *         name: taskId
 *         required: true
 *     tags: 
 *       - Task
 *     responses: 
 *       '200': 
 *         description: Task Deleted successfully. 
 *         schema: 
 *           type: object
 *           properties: 
 *             status: 
 *               type: integer 
 *               required: true 
 *             message: 
 *               type: string 
 *               required: true 
 *       '500':
 *         description: 'Internal Server Error'
 *         schema: 
 *           type: object
 *           properties: 
 *             status: 
 *               type: integer 
 *               required: true 
 *             message: 
 *               type: string 
 *               required: true 
 */
router.delete('/delete/:taskId',validateUser(['admin','tl']),TaskController.deleteTask);





/**
 * @swagger 
 * /task/update/{id}:
 *   put: 
 *     summary: updates a task
 *     tags: 
 *       - Task
 *     produces: 
 *       - application/json
 *     consumes: 
 *       - application/json
 *     parameters: 
 *       - name: id 
 *         in: path
 *         required: true
 *       - name: task 
 *         in: body 
 *         schema: 
 *           type: object 
 *           properties: 
 *             title: 
 *               type: string
 *               required: true 
 *             description: 
 *               type: string 
 *               required: true
 *             task_status: 
 *               type: string
 *               enum: 
 *                 - Todo
 *                 - In Progress
 *                 - Testing
 *                 - Done
 *                 - Reopen
 *                 - Hold
 *               required: true 
 *             assigned_at: 
 *               type: string 
 *               required: true 
 *             due_date: 
 *               type: string 
 *               required: true 
 *             completed_date: 
 *               type: string 
 *               required: true 
 *             assignToId: 
 *               type: string 
 *               required: true 
 *             category: 
 *               type: array
 *               required: true
 *               items: 
 *                 type: string
 *     responses: 
 *       '200': 
 *         description: 'Updated Task' 
 *         schema: 
 *           type: object 
 *           properties: 
 *             status: 
 *               type: integer
 *               required: true 
 *             message: 
 *               type: string
 *               required: true 
 *       '500':
 *         description: 'Internal Server Error'
 *         schema: 
 *           type: object 
 *           properties: 
 *             status: 
 *               type: integer
 *               required: true 
 *             message: 
 *               type: string
 *               required: true 
 */
router.put('/update/:id',validateUser(['admin','tl']),TaskController.updateTask);





/**
 * @swagger 
 * /task/user/{userId}:
 *   get: 
 *     summary: Display tasks of a specific user
 *     tags: 
 *       - Task
 *     parameters: 
 *       - name: userId 
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses: 
 *       '200': 
 *         description: 'Task Got Successfully' 
 *         schema: 
 *           type: object 
 *           properties:
 *             projectCode : 
 *               type: array
 *               items: 
 *                 type: object
 *                 properties: 
 *                   taskId: 
 *                     type: string
 *                     required: true 
 *                   taskTitle: 
 *                     type: string 
 *                     required: true
 *                   taskDescription: 
 *                     type: string
 *                     required: true 
 *                   taskStatus: 
 *                     type: string 
 *                     required: true 
 *                   taskAssignedAt: 
 *                     type: string 
 *                     required: true
 *                   taskDueDate: 
 *                     type: string 
 *                     required: true 
 *                   taskCompletedDate: 
 *                     type: string 
 *                     required: true 
 *                   taskCategory: 
 *                     type: array
 *                     required: true
 *                     items: 
 *                       type: string
 *                   isDelay: 
 *                     type: boolean
 *                     required: true
 *                   taskCreationDate: 
 *                     type: string
 *                     required: true
 *                   taskOwnerDetails: 
 *                     type: object
 *                     properties: 
 *                       owner_id:
 *                         type: string
 *                       name: 
 *                         type: string 
 *                       role: 
 *                         type: string
 *                   projectDetails: 
 *                     type: object
 *                     properties: 
 *                       project_id:
 *                         type: string
 *                       project_title: 
 *                         type: string 
 *                       project_code: 
 *                         type: string
 *       '500':
 *         description: 'Internal Server Error'
 *         schema: 
 *           type: object 
 *           properties: 
 *             status:
 *               type: integer
 *               required: true 
 *             message: 
 *               type: string
 *               required: true 
 *             data: 
 *               type: string 
 *               required: true
 */
router.get('/user/:userId',validateUser(['developer','tl','admin']),TaskController.displayUserSpecificTask);


/**
 * @swagger 
 * /task/project/{projectId}/user/{userId}:
 *   get: 
 *     summary: Display tasks of a specific user and all projects
 *     tags: 
 *       - Task
 *     parameters: 
 *       - name: projectId 
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: userId 
 *         in: path 
 *         required: true 
 *         schema: 
 *           type: string 
 *     responses: 
 *       '200': 
 *         description: 'Task Got Successfully' 
 *         schema: 
 *               type: array 
 *               items:
 *                 type: object 
 *                 properties: 
 *                   taskId: 
 *                     type: string
 *                     required: true 
 *                   taskTitle: 
 *                     type: string 
 *                     required: true
 *                   taskDescription: 
 *                     type: string
 *                     required: true 
 *                   taskStatus: 
 *                     type: string 
 *                     required: true 
 *                   taskAssignedAt: 
 *                     type: string 
 *                     required: true
 *                   taskDueDate: 
 *                     type: string 
 *                     required: true 
 *                   taskCompletedDate: 
 *                     type: string 
 *                     required: true 
 *                   taskCategory: 
 *                     type: array
 *                     required: true
 *                     items: 
 *                       type: string
 *                   isDelay: 
 *                     type: boolean
 *                     required: true
 *                   taskCreationDate: 
 *                      type: string
 *                      required: true
 *                   taskOwnerDetails: 
 *                     type: object
 *                     properties: 
 *                       owner_id:
 *                         type: string
 *                       name: 
 *                         type: string 
 *                       role: 
 *                         type: string
 *                   projectDetails: 
 *                     type: object
 *                     properties: 
 *                       project_id:
 *                         type: string
 *                       project_title: 
 *                         type: string 
 *                       project_code: 
 *                         type: string
 *       '500':
 *         description: 'Internal Server Error'
 *         schema: 
 *               type: object 
 *               properties: 
 *                 status:
 *                   type: integer
 *                   required: true 
 *                 message: 
 *                   type: string
 *                   required: true 
 *                 data: 
 *                   type: string 
 *                   required: true
 */
router.get('/project/:projectId/user/:userId',validateUser(['developer','tl','admin']),TaskController.displayProjectSpecificUserTask);

/**
 * @swagger 
 * /task/project/{projectId}:
 *   get: 
 *     summary: Display tasks
 *     tags: 
 *       - Task
 *     parameters: 
 *       - name: projectId 
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses: 
 *       '200': 
 *         description: 'Task Got Successfully' 
 *         schema: 
 *               type: array 
 *               items:
 *                 type: object 
 *                 properties: 
 *                   taskId: 
 *                     type: string
 *                     required: true 
 *                   taskTitle: 
 *                     type: string 
 *                     required: true
 *                   taskDescription: 
 *                     type: string
 *                     required: true 
 *                   taskStatus: 
 *                     type: string 
 *                     required: true 
 *                   taskDueDate: 
 *                     type: string 
 *                     required: true 
 *                   taskAssignedDate:
 *                     type: string
 *                     required: true
 *                   taskCompletedDate: 
 *                     type: string 
 *                     required: true 
 *                   taskCategory: 
 *                     type: array
 *                     required: true
 *                     items: 
 *                       type: string
 *                   isDelay: 
 *                     type: boolean
 *                     required: true
 *                   assignedTo: 
 *                     type: object
 *                     properties: 
 *                       id:
 *                         type: string
 *                       name: 
 *                         type: string 
 *                   assignedBy: 
 *                     type: object
 *                     properties: 
 *                       id:
 *                         type: string
 *                       name: 
 *                         type: string 
 *       '500':
 *         description: 'Internal Server Error'
 *         schema: 
 *               type: object 
 *               properties: 
 *                 status:
 *                   type: integer
 *                   required: true 
 *                 message: 
 *                   type: string
 *                   required: true 
 *                 data: 
 *                   type: string 
 *                   required: true
 */
router.get('/project/:projectId',validateUser(['developer','tl','admin']),TaskController.displayTaskOfProject);



export default router ; 