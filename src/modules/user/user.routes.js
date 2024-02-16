import express from 'express';
import UserController from './user.controller.js';
import {validateSchema,hashPassword} from '../../providers/schemaValidator.js';
import {userSchema,loginSchema} from './user.validation.js';

// Creating instance of express.Router() . 
const router = express.Router();

// This is used to register the user . 
/**
    * @swagger
    *
    * /user/register:
    *   post:
    *     summary: Return a new user id
    *     tags:
    *       - User
    *     produces:
    *       - application/json
    *     consumes:
    *       - application/json
    *     parameters:
    *       - name: user
    *         in: body
    *         schema:
    *           type: object
    *           properties:
    *             userName:
    *               type: string
    *               required: true
    *             email:
    *               type: string
    *               required: true
    *             password:
    *               type: string
    *               required: true
    *             confirm_password: 
    *               type: string 
    *               required: true
    *             role:
    *               type: string
    *               enum:
    *                 - developer
    *                 - tl
    *               required: true
    *             contact: 
    *               type: string
    *               required: true
    *     responses:  
    *       '201': 
    *         description: 'Created User' 
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
router.post('/register',validateSchema(userSchema),hashPassword,UserController.registerUser);

// This is used to login the user 
/**
 * @swagger
 * 
 * /user/login:
 *   post:
 *     summary: Returns an access token
 *     description: Used to log in a user
 *     tags:
 *       - User
 *     parameters:
 *       - name: user
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               required: true
 *             password:
 *               type: string
 *               required: true
 *     responses:
 *       '200':
 *         description: 'Login Successfull'
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
 *       '404':
 *         description: 'User Not Found'
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
 *       '401':
 *         description: 'UNAUTHORIZED'
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
router.post('/login',validateSchema(loginSchema),UserController.loginUser);

// This is used to view all the user 
/**
 * @swagger 
 * /user/view: 
 *   get: 
 *     summary: Returns all users 
 *     tags: 
 *       - User
 *     parameters: 
 *       - in: query 
 *         name: role
 *         type: string 
 *         description: Role of the user (optional)
 *     responses: 
 *       '200': 
 *         description: Returns all users
 *         schema: 
 *           type: array
 *           items:
 *             type: object  
 *             properties: 
 *               id: 
 *                 type: string 
 *                 required: true 
 *               userName: 
 *                 type: string 
 *                 required: true 
 *               email: 
 *                 type: string 
 *                 required: true 
 *               createdAt: 
 *                 type: string
 *                 format: date-time  
 *                 required: true 
 *               role: 
 *                 type: string 
 *                 required: true 
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
router.get('/view',UserController.displayUser);

// This is used to delete the user by user id 
/**
 * @swagger 
 * 
 * /user/delete/{id}:
 *    delete: 
 *      summary: Delete a user by id 
 *      parameters: 
 *       - in: path
 *         name: id 
 *         type: string 
 *         required: true
 *      tags: 
 *       - User
 *      responses: 
 *       '200': 
 *         description: Deleted User
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
router.delete('/delete/:id',UserController.deleteUser);

// This is used to update the user by user id 
/**
 * @swagger 
 * 
 * /user/update/{id}:
 *   put: 
 *     summary: Update a user by id 
 *     parameters: 
 *       - in: path 
 *         name: id
 *         required: true
 *       - in: body
 *         name: user 
 *         type: object 
 *         properties: 
 *           userName:
 *             type: string
 *           email:
 *             type: string
 *           role:
 *             type: string
 *             enum:
 *               - developer
 *               - tl
 *           contact: 
 *             type: string
 *     tags: 
 *       - User
 *     responses: 
 *       '200': 
 *         description: User updated successfully. 
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
router.put('/update/:id',UserController.updateUser);

// This is used to get all tl details whose is not part of the any team. 
/**
 * @swagger
 * 
 * /user/get/tl:
 *   get:
 *     summary: Returns all Team Leads who are not team leads of any team
 *     description: Get all the Team Leads who are not team leads of any team
 *     tags:
 *       - User
 *     responses:
 *       '200':
 *         description: Returns TL
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 required: true
 *               userName:
 *                 type: string
 *                 required: true
 *               email:
 *                 type: string
 *                 required: true
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *                 required: true
 *               role:
 *                 type: string
 *                 required: true
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
router.get('/get/tl',UserController.getAllTeamLead);

// This is used to get all developer whose is not part of the any team . 
/**
 * @swagger
 * 
 * /user/get/developer:
 *   get:
 *     summary: Returns all Developer who are not part of any team
 *     description: Get all the developer who are not part of any team
 *     tags:
 *       - User
 *     responses:
 *       '200':
 *         description: Returns developer
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 required: true
 *               userName:
 *                 type: string
 *                 required: true
 *               email:
 *                 type: string
 *                 required: true
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *                 required: true
 *               role:
 *                 type: string
 *                 required: true
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
router.get('/get/developer',UserController.getAllDeveloper);

// This is used to logout from the application .
/**
 * @swagger 
 * 
 * /user/logout:
 *    post: 
 *      summary: Logout a user
 *      tags: 
 *       - User
 *      responses: 
 *       '200': 
 *         description: Logged Out 
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
router.post('/logout',UserController.logoutUser);

export default router ; 
