import pool from '../../../config/db-config.js';
import { HTTP_RESPONSES } from '../../../constants/constant.js';
import Task from './task.dal.js';

class TaskService
{

	static async createTask(projectId,task){

		const client = await pool.connect();
		try{
            
			const result = await Task.createTask(client,projectId,task);

			const response = {
				status : HTTP_RESPONSES.CREATED.statusCode , 
				message : HTTP_RESPONSES.CREATED.message , 
				details : 'Task created successfully.' , 
				taskDetails : result 
			};
			return response ; 

		}catch(e){

			throw e ;
        
		}finally{
			client.release();
		}
	}



	static async displayTask(projectId){
        
		const client = await pool.connect();

		try{

			const result = await Task.displayTask(client,projectId);

			const response = {
				status : HTTP_RESPONSES.SUCCESS.statusCode , 
				message : HTTP_RESPONSES.SUCCESS.message , 
				taskDetails : result 
			};

			return response  ; 

		}catch(error){

			throw error ; 
		
		}finally{
		
			client.release();
		
		}
	
	}



	static async deleteTask(taskId){

		const client = await pool.connect(); 

		try{
            
			const result = await Task.deleteTask(client,taskId);

			const response = {

				status : HTTP_RESPONSES.SUCCESS.statusCode , 
				message : HTTP_RESPONSES.SUCCESS.message , 
				details : 'TASK DELETED SUCCESSFULLY.' , 
				deletedTask : result 
			};

			return response ; 

		}catch(error){
			throw error ; 
		}finally{
			client.release();
		}
	}

}

export default TaskService ;