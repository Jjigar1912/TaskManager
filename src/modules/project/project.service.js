import pool from '../../../config/db-config.js';
import { HTTP_RESPONSES } from '../../../constants/constant.js';
import Project from './project.dal.js';
class ProjectService
{	

	/**
	 * 
	 * @param {Object} projectDetails Represent a new Project Details  
	 * @returns { Promise }
	 */
	static async addProject(projectDetails){

		// Creating an instance of pg database 
		const client = await pool.connect();

		try{

			// Before inserting into the db first we are checking that this project is already exists or not .
			// If already exists , then returns false 
			const answer = await Project.checkExistProject(client,projectDetails.title);

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

	/**
	 * 
	 * This is used to display project
	 * @returns { Promise }
	 */
	static async displayProject(){

		// creating an instance of database 
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

			// throwing an exception
			throw e ; 
		
		}finally{
			
			// releasing the connection
			client.release();
		
		}
	
	}

	/**
	 * 
	 * This is used to delete a project
	 * @param {uuid} projectId 
	 * @returns { Promise }
	 */
	static async deleteProject(projectId){

		// Creating an instance of postgresql database 
		const client = await pool.connect();

		try{

			// Used to delete project ( Soft delete )
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

	/**
	 * This is used to update a project
	 * @param {uuid} projectId 
	 * @param {Object} projectData 
	 * @returns 
	 */
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