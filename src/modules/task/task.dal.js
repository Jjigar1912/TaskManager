import Task_Constant from './task.constant.js';

class Task {


	static async CreateTaskLog(client,taskDetails,userId){


		try{

			const query = 'INSERT INTO "TaskActivityLog"("task_id","user_id","column","newValue","type") VALUES($1,$2,$3,$4,$5)';
	
			await client.query(query,[taskDetails['id'],userId,'COMMON',`NEW TASK CREATED WITH VALUES ${JSON.stringify(taskDetails)}`,'CREATE']);
	
		}catch(error){

			throw error ;
		
		}

	
	}



	static async deleteTaskLog(client,tasKId,userId){

		try{

			console.log(tasKId);

			const query = ' INSERT INTO "TaskActivityLog"("task_id","user_id","column","newValue","type") VALUES($1,$2,$3,$4,$5)';

			await client.query(query,[tasKId,userId,'ALL','NULL','DELETE']);
	
		}catch(error){

			console.log(error);

			throw error ;
	
		}

	}



	static async updateTaskLog(client,oldValue,newValue,column,taskId,userId){

		try{

			const query = 'INSERT INTO "TaskActivityLog"("task_id","user_id","column","newValue","type","oldValue") VALUES($1,$2,$3,$4,$5,$6)';
	
			await client.query(query,[taskId,userId,column,newValue,'UPDATE',oldValue]);

		}catch(error){

			throw error ;
		
		}
	
	}


	static async getTaskById(client,taskId){

		try{
			
			const result = await client.query('SELECT * FROM "task" WHERE "id" = $1 ',[taskId]);

			return result.rows[0];

		}catch(error){	
			throw error ; 
		}
	}


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

			const query = `INSERT INTO "task"(${keyArray.join(', ')}) VALUES(${valueIndexArray}) RETURNING *` ; 

			const result = await client.query(query,valueArray);
            
			return result.rows[0];
              
		}catch(e){

			console.log(e);
			throw e ;
		}
	}


	static async displayTask(client,projectId){
		
		try{

			const query = 
				`SELECT 
					"task"."id" AS "taskId" , 
					"task"."title" AS "taskTitle" , 
					"task"."description" AS "taskDescription" , 
					"task"."task_status" AS "taskStatus" , 
					"task"."due_date" AS "taskDueDate" , 
					"task"."completed_date" AS "taskCompletedDate" 	,
					"task"."category" AS "taskCategory"
					json_build_object('id',"assignedUser"."id",'name',"assignedUser"."userName") AS "assignedTo" , 
					json_build_object('id',"taskOwner"."id",'name',"taskOwner"."userName") AS "assignedBy"	
				 FROM "task" 
				 INNER JOIN "user" AS "assignedUser" ON "task"."assignToId" = "assignedUser"."id"  
				 INNER JOIN "user" AS "taskOwner" ON "taskOwner"."id" = "task"."taskOwnerId" WHERE "task"."project_id" = $1 `;

			const result = await client.query(query,[projectId]);

			return result.rows;

		}catch(error){

			console.log(error);

			throw error ; 
		}
	}


	static async deleteTask(client,taskId){
		try{
			const query = 'UPDATE "task" SET "is_deleted" = $2  WHERE "id" = $1 RETURNING *' ; 
			const result = await client.query(query,[taskId,true]);
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

			
			const result1 = await Task.getTaskById(client,taskId);

			const result = await client.query(query,updateValues); 


			for(let i = 0 ; i < keys.length ; i++ ){

				if(keys[i] !== 'admin_id'){

					await Task.updateTaskLog(client,result1[keys[i]],result.rows[0][keys[i]],Task_Constant[keys[i]],taskId,taskDetails['admin_id']);

				}

			}

			return result.rows[0];

		}catch(error){
			console.log(error);
			throw error ;
		}
	}

	static async displayUserSpecificTask(client,userId){
		try{
			const query = ` 
					SELECT 
						"task"."id" AS "taskId" , 
						"task"."title" AS "taskTitle" , 
						"task"."description" AS "taskDescription" , 
						"task"."task_status" AS "taskStatus" , 
						"task"."assigned_at" AS "taskAssignedAt" , 
						"task"."due_date" AS "taskDueDate" , 
						"task"."completed_date" AS "taskCompletedDate" , 
						"task"."created_date" AS "taskCreationDate" , 	
					CASE 
						WHEN "task"."completed_date" > "task"."due_date" THEN 'Yes' 
					   	ELSE 'No' 
					END AS "isDelay" ,			 
						json_build_object('owner_id',"task"."taskOwnerId",'name',"user"."userName",'role',"userRole"."name") AS "taskOwnerDetails",
						json_build_object('project_id',"project"."id",'project_title',"project"."title",'project_code',"project"."project_code") AS "projectDetails"
					FROM "task" 
					INNER JOIN "project" ON "task"."project_id" = "project"."id" 
					INNER JOIN "user" ON "task"."taskOwnerId" = "user"."id" 
					INNER JOIN "user_role" ON "user_role"."user_id" = "task"."taskOwnerId" 
					INNER JOIN "userRole" ON "userRole"."id" = "user_role"."role_id"
					WHERE "task"."assignToId" = $1 ORDER BY "task"."due_date"
				`; 
			const result = await client.query(query,[userId]);
			return result.rows ;
		}catch(error){
			throw error ;
		}
	}


	static async displayProjectSpecificUserTask(client,projectId,userId,){
		try{
			const query = ` 
					SELECT 
						"task"."id" AS "taskId" , 
						"task"."title" AS "taskTitle" , 
						"task"."description" AS "taskDescription" , 
						"task"."task_status" AS "taskStatus" , 
						"task"."assigned_at" AS "taskAssignedAt" , 
						"task"."due_date" AS "taskDueDate" , 
						"task"."completed_date" AS "taskCompletedDate" , 
						"task"."category" AS "taskCategory", 
						"task"."created_date" AS "taskCreationDate" , 	
					CASE 
						WHEN "task"."completed_date" > "task"."due_date" THEN 'Yes' 
					   ELSE 'No' 
					END AS "isDelay" ,			 
						json_build_object('owner_id',"task"."taskOwnerId",'name',"user"."userName",'role',"userRole"."name") AS "taskOwnerDetails",
						json_build_object('project_id',"project"."id",'project_title',"project"."title",'project_code',"project"."project_code") AS "projectDetails"
					FROM "task" 
					INNER JOIN "project" ON "task"."project_id" = "project"."id" 
					INNER JOIN "user" ON "task"."taskOwnerId" = "user"."id" 
					INNER JOIN "user_role" ON "user_role"."user_id" = "task"."taskOwnerId" 
					INNER JOIN "userRole" ON "userRole"."id" = "user_role"."role_id"
					WHERE "task"."assignToId" = $1 AND "task"."project_id" = $2 ORDER BY "task"."due_date"
				`; 
			const result = await client.query(query,[userId,projectId]);
			return result.rows ;  
		}catch(e){
			throw e ; 
		}
	}


	static async displayTaskOfProject(client,projectId){
		try{
			const query = 
				`SELECT 
					"task"."id" AS "taskId" , 
					"task"."title" AS "taskTitle" , 
					"task"."description" AS "taskDescription" , 
					"task"."task_status" AS "taskStatus" , 
					"task"."due_date" AS "taskDueDate" , 
					"task"."completed_date" AS "taskCompletedDate" 	, 
					"task"."category" as "taskCategory" , 
					"task"."assigned_at" as "taskAssignedDate",
				 CASE 
				 	WHEN "task"."completed_date" > "task"."due_date" THEN 'Yes' 
					ELSE 'No' 
				 END AS "isDelay" ,
					json_build_object('id',"assignedUser"."id",'name',"assignedUser"."userName") AS "assignedTo" , 
					json_build_object('id',"taskOwner"."id",'name',"taskOwner"."userName") AS "assignedBy"	
				 FROM "task" 
				 INNER JOIN "user" AS "assignedUser" ON "task"."assignToId" = "assignedUser"."id"  
				 INNER JOIN "user" AS "taskOwner" ON "taskOwner"."id" = "task"."taskOwnerId" WHERE "task"."project_id" = $1 
				 ORDER BY "task"."due_date" `;
			const result = await client.query(query,[projectId]);
			return result.rows ; 
		}catch(e){
			throw e ; 
		}
	}

}

export default Task ;