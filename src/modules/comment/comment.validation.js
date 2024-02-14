import Joi from 'joi' ; 

const addComment = Joi.object({
	message : Joi.string().trim().required() , 
	task_id : Joi.string().trim().required() 
});

export {
	addComment
};
