import { HTTP_RESPONSES } from '../../../constants/constant.js';
import TaskService from './task.service.js';

class TaskController
{
	static async addTask(req,res){

		try{
			const response = await TaskService.createTask(req.params.id,req.body);
			return res.status(HTTP_RESPONSES.CREATED.statusCode).json(response);
		}catch(e){
			return res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR.statusCode).json(e);
		}
	
	}



	static async displayTask(req,res){
        
		try{
			const response = await TaskService.displayTask(req.params.id);
			return res.status(HTTP_RESPONSES.SUCCESS.statusCode).json(response);
		}catch(e){
			return res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR.statusCode).json(e);
		}

	}


	static async deleteTask(req,res){

		try{
			const response = await TaskService.deleteTask(req.params.id);
			return res.status(HTTP_RESPONSES.SUCCESS.statusCode).json(response);
		}catch(e){
			return res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR.statusCode).json(e);
		}
	}

}

export default TaskController ;