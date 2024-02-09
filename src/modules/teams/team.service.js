import pool from '../../../config/db-config.js';
import { HTTP_RESPONSES } from '../../../constants/constant.js';
import Team from './team.dal.js';

class TeamService
{
	async addTeam(teamDetails){
        
		const client = await pool.connect();

		try{

			const result = await Team.addTeam(client,teamDetails);

			const user = await Team.addTeamUser(client,teamDetails.user_id,result.id);

			Object.assign(result,{ teamMembers : user });

			const response = {

				status : HTTP_RESPONSES.CREATED.statusCode , 
				message : HTTP_RESPONSES.CREATED.message  ,
				data : 'Team Created Successfully.' , 
				teamDetails : result  
                
			};

			return response ; 

		}catch(e){

			throw e ;

		}finally{

			client.release();

		}
	}


	async deleteTeam(team_id){

		const client = await pool.connect();

		try{

			await Team.deleteTeamUser(client,team_id);

			const result = await Team.deleteTeam(client,team_id);

			const response = {
				status : HTTP_RESPONSES.SUCCESS.statusCode , 
				message : HTTP_RESPONSES.SUCCESS.message , 
				details : 'Team deleted Successfully.' , 
				deletedTeam : result 
			};
			return response ; 

		}catch(e){
            
			throw e ;
   
		}finally{

			client.release();

		}
    
	}


	async displayTeam(){

		const client = await pool.connect();

		try{

			const result = await Team.displayTeam(client);

			const response = {
				status : HTTP_RESPONSES.SUCCESS.statusCode , 
				message : HTTP_RESPONSES.SUCCESS.message , 
				details : 'Team got successfully.' , 
				teamDetails : result 
			}; 

			return response ; 

		}catch(e){
			throw e ; 
		}finally{
			client.release();
		}

	}


	async displayTeamMember(teamId){

		const client = await pool.connect();

		try{
			const result = await Team.displayTeamMember(client,teamId);
			return result ;
		}catch(e){
			throw e ; 
		}finally{
			client.release();
		}
	}

	async addTeamMember(data){

		const client = await pool.connect();

		try{
			const result = await Team.addTeamUser(client,data.users,data.team_id);
			const response = {
				status : HTTP_RESPONSES.CREATED.statusCode , 
				message : HTTP_RESPONSES.CREATED.message , 
				details : 'Member added successfully.' , 
				newMember : result  
			};
			return response ; 
		}catch(e){
			throw e ; 
		}finally{
			client.release();
		}
	}

	async deleteTeamMember(memberId){
		
		const client = await pool.connect();

		try{
			await Team.deleteTeamMember(client,memberId);
			const response = {
				status : HTTP_RESPONSES.SUCCESS.statusCode , 
				message : HTTP_RESPONSES.SUCCESS.message , 
				details : 'Team Member Deleted Successfully.'
			};
			return response ; 
		}catch(e){
			throw e ;
		}finally{
			client.release();
		}
	}


	

  
}

export default new TeamService();