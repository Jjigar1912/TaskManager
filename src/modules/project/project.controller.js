import { HTTP_RESPONSES } from '../../../constants/constant.js';
import ProjectService from './project.service.js';

class ProjectController
{

	/**
	 * 
	 * @description This is used to add project 
	 * @param {object} req Represent a express request object
	 * @param {Object} res Represent a express response object
	 * @returns { Promise<Object> }
	 */
	async addProject(req,res){

		try{

			const response = await ProjectService.addProject(req.body);
			return res.status(response.status).json(response);
		
		}catch(e){

			// 23505 code for conflict 
			if(e.code == 23505 ){
				
				const response = {

					status :  HTTP_RESPONSES.CONFLICT.statusCode , 
					message : e.detail 

				};
				
				return res.status(HTTP_RESPONSES.CONFLICT.statusCode).json(response);
			}
			
			// 23503 code for bad request
			if(e.code == 23503 ){

				const response = {

					status : HTTP_RESPONSES.BAD_REQUEST.statusCode , 
					message :e.detail 

				};

				return res.status(HTTP_RESPONSES.BAD_REQUEST.statusCode).json(response);

			}

			return res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR.statusCode).json(e);
		}

	}   


	/**
	 * 
	 * Display all Project
	 * @param {Object} req Represent express request Object 
	 * @param {*} res Represent express response object
	 * @returns {Promise<Array<Object>>}
	 */
	async displayProject(req,res){

		try{

			const result = await ProjectService.displayProject();
			
			// sending 200 success code 
			return res.status(HTTP_RESPONSES.SUCCESS.statusCode).json(result);

		}catch(e){

			// sending 500 Internal Server Error 
			return res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR.statusCode).json(e);
		}

	}

	/**
	 * Used to delete a project
	 * @param {Object} req Represent Express Request Object 
	 * @param {Object} res Represent Express Response Object
	 * @returns { Promise }
	 */
	async deleteProject(req,res){
		try{
			const result = await ProjectService.deleteProject(req.params.id);
			return res.status(HTTP_RESPONSES.SUCCESS.statusCode).json(result);
		}catch(e){
			return res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR.statusCode).json(e);
		}
	}


	/**
	 * 
	 * @param {Object} req Represent Express Request Object
	 * @param {Object} res Represent Express Response Object
	 * @returns { Promise }
	 */
	async updateProject(req,res){
		
		try{
			const result = await ProjectService.updateProject(req.params.projectId,req.body);

			// sending 200 code
			return res.status(HTTP_RESPONSES.SUCCESS.statusCode).json(result);
		
		}catch(e){
			
			// sending 500 code.
			return res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR.statusCode).json(e);
		
		}
	}


}

export default new ProjectController() ; 