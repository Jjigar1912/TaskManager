import { HTTP_RESPONSES } from '../../../constants/constant.js';
import TeamService from './team.service.js';

class TeamController
{

	async addTeam(req,res){

		try{

			const result = await TeamService.addTeam(req.body);

			return res.status(result.status).json(result) ; 

		}catch(e){
			
			if(e.code == 23505 ){
				
				const response = {

					status :  HTTP_RESPONSES.CONFLICT.statusCode , 
					message : e.detail , 
		
				};
				return res.status(HTTP_RESPONSES.CONFLICT.statusCode).json(response);
			}
            
			return res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR.statusCode).json(e);

		}
    
	}

	async deleteTeam(req,res){

		try{
			const result = await TeamService.deleteTeam(req.params.teamId);
			return res.status(HTTP_RESPONSES.SUCCESS.statusCode).json(result);
		}catch(e){
			return res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR.statusCode).json(e);
		}

	}


	async displayAllTeam(req,res){

		try{
			const result = await TeamService.displayTeam();
			return res.status(HTTP_RESPONSES.SUCCESS.statusCode).json(result);
		}catch(e){
			console.log(e);
			return res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR.statusCode).json(e);
		}

	}

	async displayTeamMember(req,res){
		try{
			const result = await TeamService.displayTeamMember(req.params.teamId);
			return res.status(HTTP_RESPONSES.SUCCESS.statusCode).json(result);
		}catch(e){
			console.log(e);
			return res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR.statusCode).json(e);
		}
	}

	async addTeamMember(req,res){

		try{
			const result = await TeamService.addTeamMember(req.body);
			return res.status(HTTP_RESPONSES.SUCCESS.statusCode).json(result);
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

	async deleteTeamMember(req,res){

		try{
			const result = await TeamService.deleteTeamMember(req.params.memberId);
			return res.status(HTTP_RESPONSES.SUCCESS.statusCode).json(result);
		}catch(e){	
			console.log(e);
			return res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR.statusCode).json(e);
		}
	}


	async updateTeam(req,res){

		try{
			const result = await TeamService.updateTeam(req.params.teamId,req.body);
			return res.status(result.status).json(result);
		}catch(e){	
			console.log(e);
			return res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR.statusCode).json(e);
		}

	}

}

export default new TeamController();