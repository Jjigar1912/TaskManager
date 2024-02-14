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


	static async updateTask(taskId,taskDetails){

		const client = await pool.connect(); 

		try{

			const result = await Task.updateTask(client,taskId,taskDetails);

			const response = {
				status : HTTP_RESPONSES.SUCCESS.statusCode , 
				message : HTTP_RESPONSES.SUCCESS.message , 
				details : 'Task Updated successfully.' , 
				updatedTask : result
			};

			return response ;

		}catch(error){
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
				projectNames.add(result[i]['Project Details']['project_title']);
			}

			const convertedToArray = Array.from(projectNames);

			const allTaskWithProjectTitle = {};

			for(let i = 0 ; i < convertedToArray.length ; i++ ){

				let taskArray = [] ; 
				
				for(let j = 0 ; j < result.length ; j++){
				
					let keys = Object.keys(result[j]);
					let values = Object.values(result[j]);
					const obj = {} ;
				
					if(convertedToArray[i]===result[j]['Project Details']['project_title']){

						for(let k = 0 ; k < keys.length ; k++ ){
						
							if(keys[k]!=='Project Details'){
								obj[`${keys[k]}`] = values[k];
							}
					
						}
						
						taskArray.push(obj);
					}
					
				
				}

				allTaskWithProjectTitle[convertedToArray[i]] = taskArray ;
			}
			

			const response = {
				status : HTTP_RESPONSES.SUCCESS.statusCode , 
				message : HTTP_RESPONSES.SUCCESS.message , 
				details : 'User Specific Task Got successfully.' , 
				Task : allTaskWithProjectTitle
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
				message : HTTP_RESPONSES.SUCCESS.message ,
				details : 'Task got successfully' , 
				taskDetails : result 
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
				message : HTTP_RESPONSES.SUCCESS.message , 
				detail : 'Task details got successfully' , 
				taskDetails : result 
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