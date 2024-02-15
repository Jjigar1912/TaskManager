import { HTTP_RESPONSES } from '../../../constants/constant.js';
import ProjectService from './project.service.js';

class ProjectController
{

	/**
	 * 
	 * @description This is used to add project 
	 * @param {*} req 
	 * @param {*} res 
	 * @returns 
	 */
	async addProject(req,res){

		try{
			const response = await ProjectService.addProject(req.body);
			return res.status(response.status).json(response);
		}catch(e){

			if(e.code == 23505 ){
				
				const response = {

					status :  HTTP_RESPONSES.CONFLICT.statusCode , 
					message : e.detail 

				};
				
				return res.status(HTTP_RESPONSES.CONFLICT.statusCode).json(response);
			}

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



	async displayProject(req,res){
		try{
			const result = await ProjectService.displayProject();
			return res.status(HTTP_RESPONSES.SUCCESS.statusCode).json(result);

		}catch(e){
			return res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR.statusCode).json(e);
		}
	}


	async deleteProject(req,res){
		try{
			const result = await ProjectService.deleteProject(req.params.id);
			return res.status(HTTP_RESPONSES.SUCCESS.statusCode).json(result);
		}catch(e){
			return res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR.statusCode).json(e);
		}
	}

	async updateProject(req,res){
		try{
			const result = await ProjectService.updateProject(req.params.id,req.body);
			return res.status(HTTP_RESPONSES.SUCCESS.statusCode).json(result);
		}catch(e){
			return res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR.statusCode).json(e);
		}
	}


}

export default new ProjectController() ; 