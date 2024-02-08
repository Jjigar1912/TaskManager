import TeamService from './team.service.js';

class TeamController
{

	async addTeam(req,res){

		try{
            
            const result = await TeamService.addTeam();

		}catch(e){
            
            return res.status().json();

		}
    
	}

}

export default new TeamController();