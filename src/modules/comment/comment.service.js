import pool from '../../../config/db-config.js';
import { HTTP_RESPONSES } from '../../../constants/constant.js';
import Comment from './comment.dal.js';
class CommentService {

	static async addComment(commentDetails){

		const client = await pool.connect(); 

		try{	
			const result = await Comment.addComment(client,commentDetails);	
			const response = {
				status : HTTP_RESPONSES.SUCCESS.statusCode , 
				message : HTTP_RESPONSES.SUCCESS.message , 
				details : 'Comment added Successfully.' , 
				commentDetails : result 
			};
			return response; 
		}catch(error){
			throw error ; 
		}finally{
			client.release();
		}
	}   


	static async displayComment(taskId){

		const client = await pool.connect(); 

		try{
			const result = await Comment.displayComment(client,taskId);
			const response = {
				
				status : HTTP_RESPONSES.SUCCESS.statusCode , 
				message : HTTP_RESPONSES.SUCCESS.message , 
				details : 'Comment Got successfully' , 
				commentDetails : result 
			};

			return response ;
		
		}catch(error){
			throw error ; 
		}finally{
			client.release();
		}
	}



	static async deleteComment(commentId){

		const client = await pool.connect();

		try{
			const result = await Comment.deleteComment(client,commentId);

			const response = {
				status : HTTP_RESPONSES.SUCCESS.statusCode , 
				message : HTTP_RESPONSES.SUCCESS.message , 
				details : 'Comment Deleted Successfully' , 
				deletedComment : result 
			};

			return response ; 
	
		}catch(error){
	
			throw error ; 
	
		}finally{

			client.release();
		
		}
	
	}




	static async deleteAllCommentOfTask(taskId){

		const client = await pool.connect() ; 

		try{

			const result = await Comment.deleteAllCommentOfTask(client,taskId);

			const response = {
				status : HTTP_RESPONSES.SUCCESS.statusCode , 
				message : HTTP_RESPONSES.SUCCESS.message ,
				details : 'All comment related to specific task deleted' , 
				deletedComments : result 
			}

			return response ; 

		}catch(error){
			
			throw error ; 
		
		}finally{

			client.release();
		
		}
	}



	static async updateComment(commentId,commentDetails){

		const client = await pool.connect(); 

		try{
			
			const result = await Comment.updateComment(client,commentId,commentDetails);

			const response = {
				status : HTTP_RESPONSES.SUCCESS.statusCode , 
				message : HTTP_RESPONSES.SUCCESS.message , 
				details : 'Comment Updated Successfully' , 
				updatedComment : result  
			};

			return response ; 
		}catch(error){
			throw error ;
		}finally{
			client.release();
		}
	}


}

export default CommentService ; 