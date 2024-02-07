import express from 'express';
import UserController from './user.controller.js';
import {validateSchema,hashPassword} from '../../providers/schemaValidator.js';
import {userSchema,loginSchema} from './user.validation.js';

const router = express.Router();

router.post('/register',validateSchema(userSchema),hashPassword,UserController.registerUser);

router.post('/login',validateSchema(loginSchema),UserController.loginUser);

export default router ; 
