import express from 'express' ; 
import comment from './comment.controller.js';
import { validateUser , validateSchema } from '../../providers/schemaValidator.js';
import { addComment } from './comment.validation.js';

// creating an instance of express.Router()
const router = express.Router(); 

// This is used to add comment 
/**
    * @swagger
    *
    * /comment/add:
    *   post:
    *     summary: Return a new comment id
    *     tags:
    *       - Comment
    *     produces:
    *       - application/json
    *     consumes:
    *       - application/json
    *     parameters:
    *       - name: comment
    *         in: body
    *         schema:
    *           type: object
    *           properties:
    *             message:
    *               type: string
    *               required: true
    *             task_id:
    *               type: string
    *               required: true
    *     responses:  
    *       '201': 
    *         description: 'Created Comment' 
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
router.post('/add',validateSchema(addComment),validateUser(['admin','tl','developer']),comment.addComment);

// This is used to display comment of specific task
/**
 * @swagger 
 * 
 * /comment/display/{taskId}:
 *   get: 
 *     summary: Displays all comments of a specific Task
 *     parameters: 
 *       - in: path
 *         name: taskId 
 *         type: string 
 *         required: true
 *     tags: 
 *       - Comment
 *     responses: 
 *       '200': 
 *         description: SUCCESS
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
 *               type: array 
 *               items: 
 *                 type: object
 *                 properties: 
 *                   commentId: 
 *                     type: string 
 *                     required: true 
 *                   message: 
 *                     type: string 
 *                     required: true 
 *                   createdDate: 
 *                     type: date-time
 *                     required: true 
 *                   commentCreator: 
 *                     type: object 
 *                     properties: 
 *                       id: 
 *                         type: string 
 *                         required: true 
 *                       name: 
 *                         type: string 
 *                         required: true                    
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

router.get('/display/:taskId',validateUser(['admin','tl','developer']),comment.displayComment);

// This is used to delete a specific comment
/**
 * @swagger 
 * 
 * /comment/delete/{commentId}:
 *    delete: 
 *      summary: Delete a comment by id 
 *      parameters: 
 *       - in: path
 *         name: commentId 
 *         type: string 
 *         required: true
 *      tags: 
 *       - Comment
 *      responses: 
 *       '200': 
 *         description: Deleted Comment
 *         schema: 
 *           type: object
 *           properties: 
 *               status: 
 *                 type: integer 
 *                 required: true 
 *               message: 
 *                 type: string 
 *                 required: true 
 *       '500':
 *         description: 'Internal Server Error'
 *         schema: 
 *           type: object
 *           properties: 
 *               status: 
 *                 type: integer 
 *                 required: true 
 *               message: 
 *                 type: string 
 *                 required: true 
 */
router.delete('/delete/:commentId',validateUser(['admin','tl','developer']),comment.deleteComment);

// This is used to delete all comment of specific task 
/**
 * @swagger 
 * 
 * /task/all/delete/{taskId}:
 *    delete: 
 *      summary: Delete all comment of a specific task 
 *      parameters: 
 *       - in: path
 *         name: taskId 
 *         type: string 
 *         required: true
 *      tags: 
 *       - Comment
 *      responses: 
 *       '200': 
 *         description: Deleted All Comment 
 *         schema: 
 *           type: object
 *           properties: 
 *               status: 
 *                 type: integer 
 *                 required: true 
 *               message: 
 *                 type: string 
 *                 required: true 
 *       '500':
 *         description: 'Internal Server Error'
 *         schema: 
 *           type: object
 *           properties: 
 *               status: 
 *                 type: integer 
 *                 required: true 
 *               message: 
 *                 type: string 
 *                 required: true 
 */
router.delete('/task/all/delete/:taskId',validateUser(['admin','tl']),comment.deleteAllCommentOfTask);

// This is used to update comment 
/**
 * @swagger 
 * 
 * /comment/update/{commentId}:
 *   put: 
 *     summary: Update a comment by comment Id 
 *     parameters: 
 *       - in: path 
 *         name: commentId
 *         required: true
 *       - in: body
 *         name: comment 
 *         type: object 
 *         properties: 
 *           message:
 *             type: string
 *     tags: 
 *       - Comment
 *     responses: 
 *       '200': 
 *         description: Comment updated successfully. 
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
router.put('/update/:commentId',validateUser(['admin','tl','developer']),comment.updateComment);

export default router ; 