import Joi from 'joi' ; 

const teamSchema = Joi.object({

	name : Joi.string().min(3).trim().required() ,
	tl_id : Joi.string().required() , 
	user_id : Joi.array().items(Joi.string()).required()

});

export { teamSchema } ; 