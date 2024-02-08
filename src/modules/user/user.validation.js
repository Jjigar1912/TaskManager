import Joi from 'joi';
import checkContact from '../../helper/regex.js';

const userSchema = Joi.object({

	userName : Joi.string().trim().required() , 
	email : Joi.string().email().trim().required() , 
	password : Joi.string().trim().required() , 
	confirm_password : Joi.ref('password'), 
	contact : Joi.string().custom(checkContact).required(), 
	role : Joi.string().trim().valid('DEVELOPER','TL').required()

});

const updateUserSchema = Joi.object({

	userName : Joi.string().trim().required() , 
	email : Joi.string().email().trim().required() , 
	password : Joi.string().trim().required() , 
	contact : Joi.string().custom(checkContact).required(), 
	role : Joi.string().trim().valid('DEVELOPER','TL').required()

});

const loginSchema = Joi.object({

	email : Joi.string().email().trim().required() , 
	password : Joi.string().trim().required()

});

export {
	userSchema , 
	loginSchema , 
	updateUserSchema
};