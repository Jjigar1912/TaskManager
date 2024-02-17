import pool from '../../../config/db-config.js';
import { HTTP_RESPONSES } from '../../../constants/constant.js';
import Task from './task.dal.js';

class TaskService
{

	static async createTask(projectId,task){

		const client = await pool.connect();
		try{
            
			const result = await Task.createTask(client,projectId,task);

			await Task.CreateTaskLog(client,result,task.admin_id);

			const response = {
				status : HTTP_RESPONSES.CREATED.statusCode , 
				message : 'Task created successfully.' , 
				data : result.id 
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
				message : 'Task details got successfully.' , 
				data : result 
			};

			return response  ; 

		}catch(error){

			throw error ; 
		
		}finally{
		
			client.release();
		
		}
	
	}



	static async deleteTask(taskId,userId){

		const client = await pool.connect(); 

		try{
            
			const result = await Task.deleteTask(client,taskId);

			const keys = Object.keys(result);

			for(let i = 0 ; i < keys.length ; i++){
				
				await Task.deleteTaskLog(client,taskId,userId,keys[i],result[keys[i]]);

			}	

			const response = {

				status : HTTP_RESPONSES.SUCCESS.statusCode , 
				message : 'TASK DELETED SUCCESSFULLY.' 

			};

			return response ; 

		}catch(error){
			throw error ; 
		}finally{
			client.release();
		}
	}


	static async updateTask(taskId,taskDetails){

		const client = await pool.connect(); 

		try{


			await Task.updateTask(client,taskId,taskDetails);

			const response = {
				status : HTTP_RESPONSES.SUCCESS.statusCode , 
				message : 'Task Updated successfully.' 
			};

			return response ;

		}catch(error){
			console.log(error);
			throw error ; 
		}finally{
			client.release();
		}
	}


	static async displayUserSpecificTask(userId){

		const client = await pool.connect();

		try{
			const result = await Task.displayUserSpecificTask(client,userId);

			const projectNames = new Set() ; 

			for(let i = 0 ; i < result.length ; i++){
				projectNames.add(result[i]['projectDetails']['project_code']);
			}

			const convertedToArray = Array.from(projectNames);

			const allTaskWithProjectTitle = {};

			for(let i = 0 ; i < convertedToArray.length ; i++ ){

				let taskArray = [] ; 
				
				for(let j = 0 ; j < result.length ; j++){
				
					let keys = Object.keys(result[j]);
					let values = Object.values(result[j]);
					const obj = {} ;
				
					if(convertedToArray[i]===result[j]['projectDetails']['project_code']){

						for(let k = 0 ; k < keys.length ; k++ ){
						
							obj[`${keys[k]}`] = values[k];
						
					
						}
						
						taskArray.push(obj);
					}
					
				
				}

				allTaskWithProjectTitle[convertedToArray[i]] = taskArray ;
			}
			

			const response = {
				status : HTTP_RESPONSES.SUCCESS.statusCode , 
				message : 'User Specific Task Got successfully.', 
				data : allTaskWithProjectTitle
			};

			return response ;

		}catch(error){
			throw error ; 
		}finally{
			client.release();
		}


	}


	static async displayProjectSpecificUserTask(projectId,userId){
		
		const client = await pool.connect();
		
		try{
			const result = await Task.displayProjectSpecificUserTask(client,projectId,userId);
			
			const response = {

				status : HTTP_RESPONSES.SUCCESS.statusCode , 
				message : 'Task got successfully' ,
				data : result
			};

			return response ; 

		}catch(error){
			throw error ; 
		}finally{
			client.release();
		}
	}


	static async displayTaskOfProject(projectId){

		const client = await pool.connect(); 

		try{
			const result = await Task.displayTaskOfProject(client,projectId);
			const response = {
				status : HTTP_RESPONSES.SUCCESS.statusCode , 
				message : 'Task details got successfully', 
				data :  result 
			};
			return response ;
		}catch(e){
			throw e ; 
		}finally{
			client.release();
		}
	}

	
	
}

export default TaskService ;