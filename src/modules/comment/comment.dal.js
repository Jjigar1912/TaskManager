/**
 *  This class contains all the sql queries of comments .
 */
class Comment
{

	/**
	 * 
	 * This is used to add comment . 
	 * @param {Object} client Represnt a pg client object
	 * @param {Object} commentDetails Represent comment details 
	 * @returns {Promise}
	 */
	static async addComment(client,commentDetails){

		try{
			// query for inserting new comment
			const query = 'INSERT INTO "comment"("message","task_id","user_id") VALUES($1,$2,$3) RETURNING * ';
			
			const result = await client.query(query,[commentDetails.message,commentDetails.task_id,commentDetails.admin_id]);
			
			// returning newly inserted comment 
			return result.rows[0] ; 
		
		}catch(error){
		
			throw error ; 
		
		}
	
	}


	/**
	 * 
	 * This is used to display all comment of specific task 
	 * @param {Object} client Represnt a pg client object
	 * @param {uuid} taskId Represent ctask Id
	 * @returns {Promise}
	 */
	static async displayComment(client,taskId){

		try{

			// query for displaying all comment of specific task . 
			const query = `
			
				SELECT 
					"comment"."id" AS "commentId" , 
					"comment"."message" AS "message" , 
					"comment"."createAt" AS "createdDate" , 
					 json_build_object('id',"user"."id",'name',"user"."userName") as "commentCreator" 
				FROM "comment" 
				INNER JOIN "user" ON "comment"."user_id" = "user"."id"
				WHERE "task_id" = $1 `;

			const result = await client.query(query,[taskId]);
			
			// returning all the rows from executed query
			return result.rows ;
		
		}catch(error){
		
			throw error ;
		
		}
	
	}



	/**
	 * 
	 * This is used to delete a comment 
	 * @param {Object} client Represnt a pg client object
	 * @param {uuid} commentId Represent comment Id 
	 * @returns {Promise}
	 */
	static async deleteComment(client,commentId){

		try{
			
			// query for deleting comment ( Hard Delete ) 
			const query = 'DELETE FROM "comment" WHERE "id" =  $1 RETURNING * ';
		
			const result = await client.query(query,[commentId]);
			
			// Returning deleted comment 
			return result.rows[0];
		
		}catch(error){
		
			throw error ; 
		
		}
	
	}


	
	/**
	 * 
	 * This is used to delete all comment of specific task . 
	 * @param {Object} client Represnt a pg client object
	 * @param {uuid} taskId Represent ctask Id
	 * @returns {Promise}
	 */
	static async deleteAllCommentOfTask(client,taskId){

		try{
			
			// QUERY FOR DELETING ALL COMMENT OF SPECIFIC TASK . 
			const query = 'DELETE FROM "comment" WHERE "task_id" = $1  RETURNING * ' ; 
		
			const result = await client.query(query,[taskId]);
			
			return result.rows ; 

		}catch(error){

			// console.log(error);

			throw error ;
		
		}
	}


	/**
	 * 
	 * This is used to update comment 
	 * @param {Object} client 
	 * @param {uuid} commentId 
	 * @param {object} commentDetails 
	 * @returns {Promise}
	 */
	static async updateComment(client,commentId,commentDetails){

		try{

			// It will contains all the keys of req.body 
			const keys = Object.keys(commentDetails); 

			// This array will contain all the parameter that are needed after "SET" AND Before "WHERE"
			// For EXAMPLE : setParameter : [ '"name" =  $1 ' , "age" = $2  ]
			// This will not include admin_id 
			let setParameter = [] ; 

			// This is an array which will contain all the values that will be needed for updating records 
			let values = [];

			// Generating dynamic query for all the parameters which are comming from req.body 
			for(let i = 0 ; i < keys.length ; i++){

				// Excluding admin_id key 
				if(keys[i] !== 'admin_id'){
					
					setParameter.push(`${keys[i]} = $${setParameter.length + 1}`);
				
					values.push(commentDetails[keys[i]]);
				
				}
			
			}
			
			values.push(commentId);

			// Query for updating record 
			const query = `UPDATE "comment" SET ${setParameter.join(', ')} WHERE "id" = $${setParameter.length + 1} RETURNING * `;
			
			const result = await client.query(query,values);

			return result.rows[0];

		}catch(error){

			// console.log(error);
			
			throw error ; 

		}
	}

}

export default Comment ; 