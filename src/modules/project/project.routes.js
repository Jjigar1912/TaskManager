import express from 'express'; 
import projectController from './project.controller.js';
import { projectSchema } from './project.validation.js';
import { validateSchema , validateUser } from '../../providers/schemaValidator.js';

const router = express.Router();

/**
 * @swagger 
 * /project/add:
 *   post: 
 *     summary: Adds a new project 
 *     tags: 
 *       - Project
 *     produces: 
 *       - application/json
 *     consumes: 
 *       - application/json
 *     parameters: 
 *       - name: project 
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
 *             status: 
 *               type: string 
 *               required: true 
 *             expected_end_date: 
 *               type: string 
 *               required: true 
 *             team_id: 
 *               type: string 
 *               required: true 
 *             start_date: 
 *               type: string
 *               required: true
 *     responses: 
 *       '201': 
 *         description: 'Created Project' 
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
 *       '409':
 *         description: 'Conflict' 
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
 *             data: 
 *               type: string 
 *               required: true
 */
router.post('/add',validateSchema(projectSchema),validateUser(['admin']),projectController.addProject);





/**
 * @swagger 
 * 
 * /project/delete/{id}:
 *   delete: 
 *     summary: Delete a project by id 
 *     parameters: 
 *       - in: path 
 *         name: id
 *         required: true
 *     tags: 
 *       - Project
 *     responses: 
 *       '200': 
 *         description: Project Deleted successfully. 
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
router.delete('/delete/:id',validateUser(['admin']),projectController.deleteProject);



/**
 * @swagger 
 * /project/display: 
 *   get: 
 *     summary: Returns all Project 
 *     tags: 
 *       - Project
 *     responses: 
 *       '200': 
 *         description: Returns all project
 *         schema: 
 *           type: array
 *           items:
 *             type: object  
 *             properties: 
 *               id: 
 *                 type: string 
 *                 required: true 
 *               title: 
 *                 type: string 
 *                 required: true 
 *               description: 
 *                 type: string 
 *                 required: true 
 *               project_code: 
 *                 type: string
 *                 required: true 
 *               created_at: 
 *                 type: date-time 
 *                 required: true 
 *               is_deleted:
 *                 type: boolean
 *                 required: true
 *               status: 
 *                 type: string 
 *                 required: true 
 *               start_date:
 *                 type: string 
 *                 required: true
 *               actual_start_date: 
 *                 type: string
 *                 required: true 
 *               actual_end_date: 
 *                 type: string 
 *                 required: true 
 *               expected_end_date: 
 *                 type: string 
 *                 required: true 
 *               admin: 
 *                 type: object
 *                 required: true 
 *                 properties: 
 *                   id: 
 *                     type: string 
 *                     required: true 
 *                   name: 
 *                     type: string 
 *                     required: true 
 *                   email: 
 *                     type: string 
 *                     required: true 
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

router.get('/display',validateUser(['admin','tl']),projectController.displayProject);


/**
 * @swagger 
 * /project/update/{projectId}:
 *   put: 
 *     summary: Updates a project 
 *     tags: 
 *       - Project
 *     produces: 
 *       - application/json
 *     consumes: 
 *       - application/json
 *     parameters: 
 *       - name: project 
 *         in: body 
 *         schema: 
 *           type: object 
 *           properties: 
 *             title: 
 *               type: string
 *             description: 
 *               type: string 
 *             status: 
 *               type: string  
 *             expected_end_date: 
 *               type: string  
 *             team_id: 
 *               type: string  
 *             start_date: 
 *               type: string
 *             is_deleted: 
 *               type: boolean 
 *             end_date: 
 *               type: string   
 *             actual_start_date:
 *               type: string 
 *             actual_end_date: 
 *               type: string
 *     responses: 
 *       '200': 
 *         description: 'Project Updated.' 
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
 *             data: 
 *               type: string 
 *               required: true
 */
router.put('/update/:projectId',validateUser(['admin']),projectController.updateProject);


export default router ; 