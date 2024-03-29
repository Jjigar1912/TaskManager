
class Project{

	/**
	 * 
	 * @param {Object} client Represent pg client object 
	 * @param {Object} projectDetails Represent Project Details 
	 * @returns { Promise }
	 */
	static async addProject(client,projectDetails){
		
		try{

			// Generating dynamic code for project
			const code = 'ZTI-' + Date.now().toString() ;   
			
			// inserting it into projectDetails Object
			projectDetails['project_code'] = code ; 
			
			// Getting all the keys from ProjectDetails and returns an array 
			// After that we are converting it into string by specifying parameter
			const keyArray = Object.keys(projectDetails).join(', ');
			
			// Getting all the values from ProjectDetails 
			const values = Object.values(projectDetails);
			
			// Empty array namd arr used to push values like ' $1 , $2 , $3
			// Help in insert operation 
			const arr = [];
		
			for(let i = 1 ; i <= values.length ; i++){
				
				arr.push(`$${i}`);
		
			}
			
			// making one string from array and pass it to insert query
			const value = arr.join(', ');
			
			// insert query 
			const query = `INSERT INTO "project"(${keyArray}) values(${value}) RETURNING *`;
		
			const result = await client.query(query,values);
		
			return result.rows[0]; 
		
		}catch(e){
		
			throw e ;
		
		}
	
	}


	/**
	 * 
	 * @param {Object} client Represent a client object 
	 * @param {string} projectName Represent a project name
	 * @returns { Promise<Boolean> }
	 */
	static async checkExistProject(client,projectName){

		// Getting project with already exists name 
		const query1 = 'SELECT * FROM "project" WHERE "title" = $1 ' ; 

		const result1 = await client.query(query1,[projectName]);

		// if already exists we do not allow to create a new project 
		// returning false 
		if(result1.rows.length == 0 ){
		
			return false ; 
		
		}

		const query2 = 'SELECT * FROM "project" WHERE "title" = $1 AND "is_deleted" = $2' ; 

		const result2 = await client.query(query2,[projectName,false]);

		return result2.rows.length > 0 ?  true : false ; 
	}

	/**
	 * 
	 * @param {Object} client Represent a client object 
	 * @returns { Promise }
	 */
	static async display(client){

		try{

			// Query for selecting all the project
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


	/**
	 * 
	 * This is used to soft delete project
	 * @param {Object} client 
	 * @param {uuid} projectId Represent A Project Id 
	 * @returns 
	 */
	static async delete(client,projectId){

		try{

			const query = 'UPDATE "project" SET "is_deleted" = $1 WHERE "id" = $2 RETURNING *';

			const result = await client.query(query,[true,projectId]);

			return result.rows[0];

		}catch(e){

			throw e ; 
	
		}
	
	}




	

	/**
	 * 
	 * @param {Object} client 
	 * @param {uuid} projectId Represent a project Id
	 * @param {Object} projectData Represent a project data
	 * @returns 
	 */
	static async updateProject(client,projectId,projectData){

		try{

			// Getting all the keys from projectData
			const keys = Object.keys(projectData);
			
			// Getting all the values from projectData
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