import express from 'express';
import UserController from './user.controller.js';
import {validateSchema,hashPassword} from '../../providers/schemaValidator.js';
import {userSchema,loginSchema} from './user.validation.js';

const router = express.Router();

router.post('/register',validateSchema(userSchema),hashPassword,UserController.registerUser);

router.post('/login',validateSchema(loginSchema),UserController.loginUser);

router.get('/view',UserController.displayUser);

router.delete('/delete/:id',UserController.deleteUser);

router.put('/update/:id',UserController.updateUser);

router.get('/get/tl',UserController.getAllTeamLead);

router.get('/get/developer',UserController.getAllDeveloper);

router.post('/logout',UserController.logoutUser);

export default router ; 
