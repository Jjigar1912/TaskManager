import { HTTP_RESPONSES } from '../../../constants/constant.js';
import TaskService from './task.service.js';

class TaskController
{
	static async addTask(req,res){

		try{
			const response = await TaskService.createTask(req.params.id,req.body);
			return res.status(HTTP_RESPONSES.CREATED.statusCode).json(response);
		}catch(e){
			console.log(e);
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
			const response = await TaskService.deleteTask(req.params.id,req.body.admin_id);
			return res.status(HTTP_RESPONSES.SUCCESS.statusCode).json(response);
		}catch(e){
			return res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR.statusCode).json(e);
		}
	}


	static async updateTask(req,res){

		try{
			const response = await TaskService.updateTask(req.params.id,req.body);
			return res.status(HTTP_RESPONSES.SUCCESS.statusCode).json(response);
		}catch(e){
			return res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR.statusCode).json(e);
		}
	}


	static async displayUserSpecificTask(req,res){

		try{
			const response = await TaskService.displayUserSpecificTask(req.params.userId);
			return res.status(HTTP_RESPONSES.SUCCESS.statusCode).json(response);
		}catch(e){
			return res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR.statusCode).json(e);
		}
	}


	static async displayProjectSpecificUserTask(req,res){

		try{
			const response = await TaskService.displayProjectSpecificUserTask(req.params.projectId,req.params.userId);
			return res.status(HTTP_RESPONSES.SUCCESS.statusCode).json(response);
		}catch(e){
			return res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR.statusCode).json(e);
		}
	}


	static async displayTaskOfProject(req,res){

		try{
			const response = await TaskService.displayTaskOfProject(req.params.projectId);
			return res.status(HTTP_RESPONSES.SUCCESS.statusCode).json(response);
		}catch(e){	
			return res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR.statusCode).json(e);
		}
	}



}

export default TaskController ;