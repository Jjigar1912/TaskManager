import Joi from 'joi' ; 

const teamSchema = Joi.object({

	name : Joi.string().min(3).trim().required() ,
	tl_id : Joi.string().required() , 
	user_id : Joi.array().items(Joi.string()).required()

});

const addTeamMember = Joi.object({

	users : Joi.array().items(Joi.string()).required() ,
	team_id : Joi.string().trim().required() 
	
});

export { teamSchema , addTeamMember } ; 