
class Project{

	static async addProject(client,projectDetails){
		try{

			const code = 'ZTI-' + Date.now().toString() ;   
			projectDetails['project_code'] = code ; 
			console.log(projectDetails);
			const keyArray = Object.keys(projectDetails).join(', ');
			const values = Object.values(projectDetails);
			const arr = [];
			for(let i = 1 ; i <= values.length ; i++){
				arr.push(`$${i}`);
			}
			const value = arr.join(', ');
			const query = `INSERT INTO "project"(${keyArray}) values(${value}) RETURNING *`;
			const result = await client.query(query,values);
			return result.rows[0]; 
		}catch(e){
			throw e ;
		}
	}



	static async checkExistProject(client,projectName){

		const query1 = 'SELECT * FROM "project" WHERE "title" = $1 ' ; 

		const result1 = await client.query(query1,[projectName]);

		if(result1.rows.length == 0 ){
			return false ; 
		}

		const query2 = 'SELECT * FROM "project" WHERE "title" = $1 AND "is_deleted" = $2' ; 

		const result2 = await client.query(query2,[projectName,false]);

		return result2.rows.length > 0 ?  true : false ; 
	}


	static async display(client){

		try{

			const query = `

					SELECT 
						"project"."id",
						"project"."title" , 
						"project"."description" ,
						"project"."project_code" , 
						"project"."created_at" , 
						"project"."is_deleted" , 
						"project"."status" , 
						"project"."start_date" , 
						"project"."actual_start_date",
						"project"."actual_end_date",
						"project"."expected_end_date" ,
						json_build_object('id',"user"."id",'name',"user"."userName",'email',"user"."email") as "admin" , 
						json_build_object('id',"teams"."id",'name',"teams"."name") as "teamDetails"
					FROM 
						"project"
					INNER JOIN "teams" ON "project"."team_id" = "teams"."id" 
					INNER JOIN "user" ON "user"."id" = "project"."admin_id" WHERE "project"."is_deleted" = $1`;
			const result = await client.query(query,[false]);

			return result.rows ; 
			
		}catch(e){
			throw e ; 
		}
	
	}



	static async delete(client,projectId){

		try{

			const query = 'UPDATE "project" SET "is_deleted" = $1 WHERE "id" = $2 RETURNING *';

			const result = await client.query(query,[true,projectId]);

			return result.rows[0];

		}catch(e){

			throw e ; 
	
		}
	
	}




	

	static async updateProject(client,projectId,projectData){
		try{

			const keys = Object.keys(projectData);
			const values = Object.values(projectData);
			let setParameter = '' ;
			for(let i = 0 ; i < keys.length ; i++ ){
				setParameter = setParameter + ' "' + keys[i] + '" ' + ' = ' + '$' + (i+1) ;
				if(i !== keys.length - 1){
					setParameter += ' , ';
				} 
			}
			const generateNumber = `$${keys.length+1}`;
			const query = ` UPDATE "project" SET  ${setParameter} WHERE "id" = ${generateNumber} RETURNING *`;
			values.push(projectId);
			const result = await client.query(query,values); 
			return result.rows[0];

		}catch(e){
			throw e ;
		}
	}




}

export default Project ; 