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

}

export default Task ;