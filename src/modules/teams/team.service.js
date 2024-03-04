import pool from '../../../config/db-config.js';
import { HTTP_RESPONSES } from '../../../constants/constant.js';
import Team from './team.dal.js';

class TeamService
{
	async addTeam(teamDetails){
        

		// console.log(teamDetails);
		
		const client = await pool.connect();

		try{

			const answer = await Team.checkExistsTeam(client,teamDetails.name);

			// console.log(answer);

			if(answer){

				const result = await Team.addTeam(client,teamDetails);

				const user = await Team.addTeamUser(client,teamDetails.user_id,result.id);

				Object.assign(result,{ teamMembers : user });

				const response = {

					status : HTTP_RESPONSES.CREATED.statusCode , 
					message : 'Team Created Successfully.' ,
					data :  result.id 
                
				};

				return response ; 

			}else{

				const response = {

					status : HTTP_RESPONSES.CONFLICT.statusCode , 
					message : `${teamDetails.name} already exists.`
				};

				return response ; 
			}
			
		}catch(e){

			// console.log(e);

			throw e ;

		}finally{

			client.release();

		}
	}


	async deleteTeam(team_id){

		const client = await pool.connect();

		try{

			await Team.deleteTeamUser(client,team_id);
			
			await Team.deleteTeam(client,team_id);

			const response = {
				status : HTTP_RESPONSES.SUCCESS.statusCode , 
				message : 'Team deleted Successfully.', 
			
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
				message : 'Team got successfully.' , 
				data : result 
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
			const response = {
				status : HTTP_RESPONSES.SUCCESS.statusCode , 
				message : 'Team member details got successfully' , 
				data : result
			};
			return response ;
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
				message : 'Member added successfully.' , 
				data : result 
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
				message : 'Team Member Deleted Successfully.' 
			};
			return response ; 
		}catch(e){
			throw e ;
		}finally{
			client.release();
		}
	}




	async updateTeam(teamId,teamDetails){

		const client = await pool.connect(); 

		let response = null ; 

		try{

			if(teamDetails.name){
				
				const ans = await Team.checkExistsTeam(client,teamDetails.name);

				// console.log(ans);

				if(ans){
					
					await Team.updateTeam(client,teamId,teamDetails);

				    response = {
						status : HTTP_RESPONSES.SUCCESS.statusCode , 
						message : 'Team Updated Successfully.'
					};
				
				}else{

					response = {
						status : HTTP_RESPONSES.CONFLICT.statusCode , 
						message : 'Team Name already exists'
					};

				}
			
			}else{

				   await Team.updateTeam(client,teamId,teamDetails);

				   response = {
					status : HTTP_RESPONSES.SUCCESS.statusCode , 
					message : 'Team Updated Successfully.'
				};

			}

		

			return response ;

		}catch(e){	

			// console.log(e);

			throw e ; 
		}finally{
			client.release();
		}
	}


	

  
}

export default new TeamService();