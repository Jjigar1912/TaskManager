import Joi from 'joi';

const projectSchema = Joi.object({
	title : Joi.string().min(3).required() , 
	description : Joi.string().min(10).required() , 
	status : Joi.string().valid('Pending','In Progress','Completed','Hold').required() , 
	start_date : Joi.date().required() , 
	expected_end_date : Joi.date().required() , 
	team_id : Joi.string().required() , 
	admin_id : Joi.string().required()
});

export { 
	projectSchema
};