class Task {

	static async createTask(client,projectId,task){     
		try{

			task['project_id'] = projectId ; 
			task['taskOwnerId'] = task.admin_id ; 
			const keys = Object.keys(task);
			let keyArray = [] ; 
			let valueIndexArray = [] ; 
			let valueArray = [] ; 
		
			for(let i = 0 ; i < keys.length ; i++ ){

				if(keys[i]=='category'){
					keyArray.push(JSON.stringify(keys[i]));
					task[keys[i]] = JSON.stringify(task[keys[i]]);
					valueArray.push(task[keys[i]]);
					valueIndexArray.push(`$${valueIndexArray.length+1}`);
				}else if(keys[i]!=='admin_id'){
					keyArray.push(JSON.stringify(keys[i]));
					valueIndexArray.push(`$${valueIndexArray.length+1}`);
					valueArray.push(task[keys[i]]);
				}
               
			}

			console.log(valueArray);

			const query = `INSERT INTO "task"(${keyArray.join(', ')}) VALUES(${valueIndexArray}) RETURNING *` ; 

			console.log(query);

			const result = await client.query(query,valueArray);
            
			return result.rows[0];
              
		}catch(e){

			console.log(e);
			throw e ;
		}
	}


	static async displayTask(client,projectId){
		try{
			const query = 'SELECT * FROM "task" WHERE "project_id" = $1 AND "is_deleted" = $2 ';
			const result = await client.query(query,[projectId,false]);
			return result.rows;
		}catch(error){
			throw error ; 
		}
	}


	static async deleteTask(client,taskId){
		try{
			const query = 'UPDATE "task" SET "is_deleted" = $1 WHERE "id" = $2 RETURNING *' ; 
			const result = await client.query(query,[true,taskId]);
			return result.rows[0];
		}catch(error){
			throw error ; 
		}
	}


	static async updateTask(client,taskId,taskDetails){
		try{
			const keys = Object.keys(taskDetails);
			let setParameter = [] ;
			let updateValues = []; 
			for(let i = 0 ; i < keys.length ; i++ ){
				
				if(keys[i] === 'category'){	
					setParameter.push(`"${keys[i]}" = $${setParameter.length+1}`);
					updateValues.push(JSON.stringify(taskDetails[keys[i]]));
				}else if(keys[i] !== 'admin_id'){
					setParameter.push(`"${keys[i]}" = $${setParameter.length+1}`);
					updateValues.push(taskDetails[keys[i]]);
				}
			}
			
			const generateNumber = `$${setParameter.length+1}`;
			updateValues.push(taskId);
			const query = `UPDATE "task" SET  ${setParameter.join(', ')} WHERE "id" = ${generateNumber} RETURNING *`;
			const result = await client.query(query,updateValues); 
			return result.rows[0];
		}catch(error){
			throw error ;
		}
	}

	static async displayUserSpecificTask(client,userId){
		try{
			const query = ` 
					SELECT 
						"task"."id" AS "TaskId" , 
						"task"."title" AS "TaskTitle" , 
						"task"."description" AS "TaskDescription" , 
						"task"."task_status" AS "Task Status" , 
						"task"."assigned_at" AS "Task Assigned At" , 
						"task"."due_date" AS "Task Due Date" , 
						"task"."completed_date" AS "Task Completed Date" , 
						"task"."category" AS "Task Category", 
						"task"."created_date" AS "Task Creation Date" , 				 
						"task"."is_deleted" AS "Task Deleted" , 
						json_build_object('owner_id',"task"."taskOwnerId",'name',"user"."userName",'role',"userRole"."name") AS "Task Owner Details",
						json_build_object('project_id',"project"."id",'project_title',"project"."title") AS "Project Details"
					FROM "task" 
					INNER JOIN "project" ON "task"."project_id" = "project"."id" 
					INNER JOIN "user" ON "task"."taskOwnerId" = "user"."id" 
					INNER JOIN "user_role" ON "user_role"."user_id" = "task"."taskOwnerId" 
					INNER JOIN "userRole" ON "userRole"."id" = "user_role"."role_id"
					WHERE "task"."assignToId" = $1 
				`; 
			const result = await client.query(query,[userId]);
			return result.rows ;
		}catch(error){
			throw error ;
		}
	}


	static async displayProjectSpecificUserTask(client,projectId,userId,){
		try{
			const query = 'SELECT * FROM "task" WHERE "assignToId" =  $1 AND "project_id" = $2' ;
			const result = await client.query(query,[userId,projectId]);
			return result.rows ;  
		}catch(e){
			throw e ; 
		}
	}


	static async displayTaskOfProject(client,projectId){
		try{
			const query = 'SELECT * FROM "task" WHERE "project_id" = $1';
			const result = await client.query(query,[projectId]);
			return result.rows ; 
		}catch(e){
			throw e ; 
		}
	}

}

export default Task ;