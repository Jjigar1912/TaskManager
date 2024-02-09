class Team{

	static async addTeam(client,teamDetails){

		try{

			const query = 'INSERT INTO teams("name","tl_id","created_by") VALUES($1,$2,$3) RETURNING *';

			const result = await client.query(query,[teamDetails.name,teamDetails.tl_id,teamDetails.userId]);
    
			return result.rows[0] ;

		}catch(e){

			throw e ;
            
		}	 

	}

	static async addTeamUser(client,users,team_id){

		const users_id = [] ;

		try{

		    for(let a of users) {

				const query = 'INSERT INTO "team_user"("user_id","team_id") VALUES($1,$2) RETURNING *';

				const result = await client.query(query,[a,team_id]);

				users_id.push(result.rows[0].user_id);

			}

			return users_id ; 

		}catch(e){

			throw e ;
        
		}

	}

	static async deleteTeamUser(client,team_id){

		try{

			const query = 'DELETE FROM team_user WHERE team_id = $1 RETURNING *';

			const result = await client.query(query,[team_id]);

			return result.rows[0] ; 

		}catch(e){

			throw e ; 

		}

	}

	static async deleteTeam(client,team_id){

		try{

			const query = 'DELETE FROM teams WHERE id = $1 RETURNING *';

			const result = await client.query(query,[team_id]);

			return result.rows[0] ; 

		}catch(e){

			throw e ; 

		}
    
	}


	static async displayTeam(client){

		try{

			const query = `
                SELECT 
					"teams"."id" AS "TeamId",
                    "teams"."name" AS "TeamName" ,
                    "tl_users"."userName" AS "TL", 
                    "admin_users"."userName" as "Created By" , 
                    "Counter"."COUNT" AS "Team Member" 
                FROM "teams"
                INNER JOIN "user" as "tl_users" ON "teams"."tl_id" = "tl_users"."id"
                INNER JOIN "user" as "admin_users" on "teams"."created_by" = "admin_users"."id" 
                INNER JOIN ( SELECT 
                                "team_id" , 
                                COUNT(*) as "COUNT"  
                            FROM "team_user" 
                            Group by "team_id" ) AS "Counter" ON "Counter"."team_id" = "teams"."id" `;

			const result = await client.query(query);

			return result.rows ; 

		}catch(e){
			throw e ;
		}

	}


	static async displayTeamMember(client,teamId){

		try{
			const query = `
				SELECT 
					"team_user"."id",
					"user"."userName" , 
					"user"."email" , 
					"user"."contact" 
				FROM "team_user" 
				INNER JOIN "user" ON "team_user"."user_id" = "user"."id"
				WHERE "team_user"."team_id" = $1`;

			const result = await client.query(query,[teamId]);

			return result.rows ; 
		
		}catch(e){

			throw e ; 
		
		}
	
	}

	static async deleteTeamMember(client,memberId){

		try{
			
			const query = 'DELETE FROM "team_user" WHERE "team_user"."id" = $1 RETURNING *';
			const result = await client.query(query,[memberId]);
			return result.rows[0];

		}catch(e){
			throw e;
		}

	}

	

}

export default Team ; 
