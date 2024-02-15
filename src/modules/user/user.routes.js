import express from 'express';
import UserController from './user.controller.js';
import {validateSchema,hashPassword} from '../../providers/schemaValidator.js';
import {userSchema,loginSchema} from './user.validation.js';

// Creating instance of express.Router() . 
const router = express.Router();

// This is used to register the user . 
router.post('/register',validateSchema(userSchema),hashPassword,UserController.registerUser);

// This is used to login the user 
router.post('/login',validateSchema(loginSchema),UserController.loginUser);

// This is used to view all the user 
router.get('/view',UserController.displayUser);

// This is used to delete the user by user id 
router.delete('/delete/:id',UserController.deleteUser);

// This is used to update the user by user id 
router.put('/update/:id',UserController.updateUser);

// This is used to get all tl details whose is not part of the any team. 
router.get('/get/tl',UserController.getAllTeamLead);

// This is used to get all developer whose is not part of the any team . 
router.get('/get/developer',UserController.getAllDeveloper);

// This is used to logout from the application .
router.post('/logout',UserController.logoutUser);

export default router ; 
