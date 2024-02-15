import pool from '../../../config/db-config.js';
import { HTTP_RESPONSES } from '../../../constants/constant.js';
import Comment from './comment.dal.js';


class CommentService {

	/**
	 * 
	 * @static
	 * @async
	 * @description This is used to pass comment data into commnent.dal.js file and returns response . 
	 * @param {Object} commentDetails Represent Comment details  
	 * @returns {Promise}
	 */
	static async addComment(commentDetails){

		// Creating an instance of pg client 
		const client = await pool.connect(); 

		try{	

			// returns an object of newly inserted comment . 
			const result = await Comment.addComment(client,commentDetails);	
			
			// creating an response object that will be returned . 
			const response = {
				status : HTTP_RESPONSES.SUCCESS.statusCode , 
				message : 'Comment added Successfully.', 
				data : result.id 
			};

			return response; 
		
		}catch(error){
		
			throw error ; 
		
		}finally{
			
			// releasing connection . 
			client.release();
		
		}
	}   


	/**
	 * 
	 * @description This is used to display all comments of task Id 
	 * @param {uuid} taskId represent a task id
	 * @returns {Promise}
	 */
	static async displayComment(taskId){

		// creating an instance of pg database 
		const client = await pool.connect(); 

		try{
			const result = await Comment.displayComment(client,taskId);
			
			// Creating response object that will be returned .  
			const response = {
				
				status : HTTP_RESPONSES.SUCCESS.statusCode , 
				message : 'Comment Got successfully' , 
				data : result 
			};

			return response ;
		
		}catch(error){

			throw error ; 
		
		}finally{
		
			// releasing the connection . 
			client.release();
		
		}
	
	}


	/**
	 * 
	 * @param {uuid} commentId Represent a comment id  
	 * @returns { Promise }
	 */
	static async deleteComment(commentId){

		// creating an instance of pg database 
		const client = await pool.connect();

		try{
			
			// calling deleteComment method that will do hard delete  from database 
			await Comment.deleteComment(client,commentId);

			const response = {
				status : HTTP_RESPONSES.SUCCESS.statusCode , 
				message : 'Comment Deleted Successfully' , 
			};

			return response ; 
	
		}catch(error){
	
			throw error ; 
	
		}finally{

			// releasing connection
			client.release();
		
		}
	
	}



	/**
	 * 
	 * @description This is used to delete all comments of specific task . 
	 * @param {uuid} taskId Represent a taskId 
	 * @returns 
	 */
	static async deleteAllCommentOfTask(taskId){

		// creating an instance of pg database . 
		const client = await pool.connect() ; 

		try{

			// Calling this function to actually for hard delete 
			await Comment.deleteAllCommentOfTask(client,taskId);

			// Creating response object that will be returned. 
			const response = {
				status : HTTP_RESPONSES.SUCCESS.statusCode , 
				message : 'All comment related to specific task deleted' 
			};

			return response ; 

		}catch(error){
			
			throw error ; 
		
		}finally{

			// releasing connection
			client.release();
		
		}
	}


	/**
	 * 
	 * @param {uuid} commentId Represent a comment Id 
	 * @param {Object} commentDetails 
	 * @returns { Promise }
	 */
	static async updateComment(commentId,commentDetails){

		// Creating an instance of pg database . 
		const client = await pool.connect(); 

		try{
			
			// calling this to actual uodate comment 
			await Comment.updateComment(client,commentId,commentDetails);

			// creating response object 
			const response = {	
				status : HTTP_RESPONSES.SUCCESS.statusCode , 
				message : 'Comment Updated Successfully'  
			};

			return response ; 
	
		}catch(error){
	
			throw error ;
	
		}finally{

			// releasing connection 
			client.release();
		}
	}


}

export default CommentService ; 