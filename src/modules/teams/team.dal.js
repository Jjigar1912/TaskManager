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

	static async checkExistsTeam(client,teamName){
		
		try{

			const query1 = 'SELECT * FROM "teams" WHERE "name" = $1 ' ; 

			const result1 = await client.query(query1,[teamName]);

			if(result1.rows.length == 0 ){
				
				return true ;
			
			}

			const query = 'SELECT * FROM "teams" WHERE "name" = $1 AND "is_deleted" = $2 ';

			const result = await client.query(query,[teamName,true]);

			return result.rows.length > 0 ? true : false ;

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

			const query = 'UPDATE "team_user" SET "is_deleted" = $1 WHERE team_id = $2 RETURNING *';

			const result = await client.query(query,[true,team_id]);

			return result.rows[0] ; 

		}catch(e){

			throw e ; 

		}

	}

	static async deleteTeam(client,team_id){

		try{

			const query = 'UPDATE "teams" SET "is_deleted"  = $1 WHERE id = $2 RETURNING *';

			const result = await client.query(query,[true,team_id]);

			return result.rows[0] ; 

		}catch(e){

			throw e ; 

		}
    
	}


	static async displayTeam(client){

		try{

			const query = `
                SELECT 
					"teams"."id" AS "teamId",
                    "teams"."name" AS "teamName" ,
                    "tl_users"."userName" AS "TL", 
                    "admin_users"."userName" as "createdBy" , 
					COALESCE("Counter"."COUNT", 0) AS "teamMemberCount" 
                FROM "teams"
                INNER JOIN "user" as "tl_users" ON "teams"."tl_id" = "tl_users"."id"
                INNER JOIN "user" as "admin_users" on "teams"."created_by" = "admin_users"."id" 
                LEFT JOIN ( SELECT 
                                "team_id" , 
                                COUNT(*) as "COUNT"  
                            FROM "team_user" 
                            Group by "team_id" ) AS "Counter" ON "Counter"."team_id" = "teams"."id" WHERE "teams"."is_deleted" = $1 `;

			const result = await client.query(query,[false]);

			return result.rows ; 

		}catch(e){
			throw e ;
		}

	}


	static async displayTeamMember(client,teamId){

		try{
			const query = `
				SELECT 
					"user"."id",
					"user"."userName" , 
					"user"."email" , 
					"user"."contact" 
				FROM "team_user" 
				INNER JOIN "user" ON "team_user"."user_id" = "user"."id"
				WHERE "team_user"."team_id" = $1 AND "team_user"."is_deleted" = $2`;

			const result = await client.query(query,[teamId,false]);

			return result.rows ; 
		
		}catch(e){
			console.log(e);
			throw e ; 
		
		}
	
	}

	static async deleteTeamMember(client,memberId){

		try{
			
			const query = 'UPDATE "team_user" SET "is_deleted" = $1 WHERE "team_user"."id" = $2 RETURNING *';
			const result = await client.query(query,[memberId,true]);
			return result.rows[0];

		}catch(e){
			throw e;
		}

	}

	

}

export default Team ; 
