import pool from '../../../config/db-config.js';
import { HTTP_RESPONSES } from '../../../constants/constant.js';
import Project from './project.dal.js';
class ProjectService
{
	static async addProject(projectDetails){

		const client = await pool.connect();

		try{

			const result = await Project.addProject(client,projectDetails);

			const response = {
				status : HTTP_RESPONSES.CREATED.statusCode , 
				message : HTTP_RESPONSES.CREATED.message , 
				details : 'Project Created Successfully.' , 
				projectDetails : result 
			}; 

			return response ; 
            
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
				message : HTTP_RESPONSES.SUCCESS.message , 
				details : 'Project Details got successfully.' , 
				projectDetails : result 
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

			const result = await Project.delete(client,projectId);

			const response = {

				status : HTTP_RESPONSES.SUCCESS.statusCode , 
				message : HTTP_RESPONSES.SUCCESS.message , 
				details : 'Project deleted successfully.' , 
				deletedProject : result 
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

			const result = await Project.updateProject(client,projectId,projectData);

			const response = {
				status : HTTP_RESPONSES.SUCCESS.statusCode , 
				message : HTTP_RESPONSES.SUCCESS.message , 
				details : 'Project Details updated successfully' , 
				updatedProject : result 
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