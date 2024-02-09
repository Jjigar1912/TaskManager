import { HTTP_RESPONSES } from '../../../constants/constant.js';
import ProjectService from './project.service.js';

class ProjectController
{
	async addProject(req,res){

		try{
			const response = await ProjectService.addProject(req.body);
			return res.status(HTTP_RESPONSES.SUCCESS.statusCode).json(response);
		}catch(e){

			if(e.code == 23505 ){
				
				const response = {

					status :  HTTP_RESPONSES.CONFLICT.statusCode , 
					message : HTTP_RESPONSES.CONFLICT.message , 
					error : e.detail 

				};
				return res.status(HTTP_RESPONSES.CONFLICT.statusCode).json(response);
			}
			return res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR.statusCode).json(e);
		}

	}   


}

export default new ProjectController() ; 