import pool from '../../../config/db-config.js';
import { HTTP_RESPONSES } from '../../../constants/constant.js';
import Project from './project.dal.js';
class ProjectService
{
	static async addProject(projectDetails){

		const client = await pool.connect();

		try{


			const answer = await Project.checkExistProject(client,projectDetails.title);

			console.log(answer);

			if(!answer){
			
				const result = await Project.addProject(client,projectDetails);

				const response = {
					status : HTTP_RESPONSES.CREATED.statusCode , 
					message : 'Project Created Successfully.', 
					data : result.id 
				}; 
	
				return response ; 
			
			}else{

				const response = {
					status : HTTP_RESPONSES.CONFLICT.statusCode , 
					message : 'Project is already exists.'
				};

				return response ; 

			}

		
            
		}catch(e){
		
			throw e ; 
		
		}finally{

			client.release();
        
		}
	}


	static async displayProject(){

		const client = await pool.connect();
		try{

			const result = await Project.display(client);

			const response = {
				status : HTTP_RESPONSES.SUCCESS.statusCode , 
				message : 'Project Details got successfully.' , 
				data : result
			};

			return response; 

		}catch(e){
			throw e ; 
		}finally{
			client.release();
		}
	}


	static async deleteProject(projectId){

		const client = await pool.connect();

		try{

			await Project.delete(client,projectId);

			const response = {

				status : HTTP_RESPONSES.SUCCESS.statusCode , 
				message : 'Project deleted successfully.' 
			};

			return response; 

		}catch(e){

			throw e ;
		
		}finally{
		
			client.release();
		
		}
	}


	static async updateProject(projectId,projectData){

		const client = await pool.connect(); 

		try{

			await Project.updateProject(client,projectId,projectData);

			const response = {
				status : HTTP_RESPONSES.SUCCESS.statusCode ,
				message : 'Project Details updated successfully' 
			};

			return response; 

		}catch(e){
			throw e ; 
		}finally{
			client.release();
		}
	}

	

}

export default ProjectService ; 