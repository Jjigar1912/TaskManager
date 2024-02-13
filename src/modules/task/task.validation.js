import Joi from 'joi' ; 

const addTask = Joi.object({

	title : Joi.string().required() , 
	description : Joi.string().required() , 
	assigned_at : Joi.date().required() ,
	due_date : Joi.date().required() , 
	completed_date : Joi.date().required() , 
	task_status : Joi.string().valid('Todo','In Progress','Testing','Done','Reopen','Hold').required() , 
	assignToId : Joi.string().required() , 
	category : Joi.array().items(Joi.string().required())

});

export {
	addTask 
};