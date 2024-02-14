class Comment
{
	static async addComment(client,commentDetails){
		try{
			const query = 'INSERT INTO "comment"("message","task_id","user_id") VALUES($1,$2,$3) RETURNING * ';
			const result = await client.query(query,[commentDetails.message,commentDetails.task_id,commentDetails.admin_id]);
			return result.rows[0] ; 
		}catch(error){
			throw error ; 
		}
	}


	static async displayComment(client,taskId){
		try{
			const query = `
			
				SELECT 
					"comment"."id" AS "Comment Id" , 
					"comment"."message" AS "Message" , 
					"comment"."createAt" AS "Comment Created Date" , 
					 json_build_object('id',"user"."id",'name',"user"."userName") as "Comment User Details" 
				FROM "comment" 
				INNER JOIN "user" ON "comment"."user_id" = "user"."id"
				WHERE "task_id" = $1 `;
			const result = await client.query(query,[taskId]);
			return result.rows ;
		}catch(error){
			throw error ;
		}
	}




	static async deleteComment(client,commentId){
		try{
			const query = 'DELETE FROM "comment" WHERE "id" =  $1 RETURNING * ';
			const result = await client.query(query,[commentId]);
			return result.rows[0];
		}catch(error){
			throw error ; 
		}
	}



	static async deleteAllCommentOfTask(client,taskId){
		try{
			const query = 'DELETE FROM "comment" WHERE "task_id" = $1  RETURNING * ' ; 
			const result = await client.query(query,[taskId]);
			return result.rows ; 

		}catch(error){

			console.log(error);

			throw error ;
		
		}
	}



	static async updateComment(client,commentId,commentDetails){

		try{

			const keys = Object.keys(commentDetails); 

			let setParameter = [] ; 

			let values = [];

			for(let i = 0 ; i < keys.length ; i++){
				if(keys[i] !== 'admin_id'){
					setParameter.push(`${keys[i]} = $${setParameter.length + 1}`);
					values.push(commentDetails[keys[i]]);
				}
			}
			values.push(commentId);

			const query = `UPDATE "comment" SET ${setParameter.join(', ')} WHERE "id" = $${setParameter.length + 1} RETURNING * `;
			
			const result = await client.query(query,values);

			return result.rows[0];

		}catch(error){

			console.log(error);
			
			throw error ; 

		}
	}

}

export default Comment ; 