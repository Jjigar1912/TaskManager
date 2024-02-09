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

}

export default ProjectService ; 