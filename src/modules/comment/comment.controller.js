import { HTTP_RESPONSES } from '../../../constants/constant.js';
import CommentService from './comment.service.js';

class comment {


	/**
	 * 
	 * @description This is used to add comment.
	 * @param {Object} req Represent express request object 
	 * @param {Object} res Represent express response object
	 * @returns {Promise} returns promise 
	 */
	static async addComment(req,res){
		
		try{	
			
			const result = await CommentService.addComment(req.body);
			
			// sending 200 code 
			return res.status(HTTP_RESPONSES.SUCCESS.statusCode).json(result);

		}catch(error){
			
			// sending 500 code if there is any server related error . 
			return res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR.statusCode).json(error);
		
		}

	}



	/**
	 * 
	 * @description This is used to display all comment of specific task
	 * @param {Object} req represent express request Object 
	 * @param {*} res represent express response object
	 * @returns {Promise}
	 */
	static async displayComment(req,res){

		try{	
			
			const result = await CommentService.displayComment(req.params.taskId);

			// sending succes code 
			return res.status(HTTP_RESPONSES.SUCCESS.statusCode).json(result);
		
		}catch(error){
			
			// sending 500 code if there is any server related error . 
			return res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR.statusCode).json(error);
		
		}
	
	}


	/**
	 * 
	 * @description This is used to delete Comment 
	 * @param {Object} req Represent express request Object 
	 * @param {Object} res Represent Express Resposne Object
	 * @returns { Promise }
	 */
	static async deleteComment(req,res){

		try{

			const result = await CommentService.deleteComment(req.params.commentId);
			
			// sending 200 code
			return res.status(HTTP_RESPONSES.SUCCESS.statusCode).json(result);
		
		}catch(error){
			
			// sending 500 code if there is any server related error . 
			return res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR.statusCode).json(error);
		
		}
	
	}


	/**
	 * 
	 * @description This is used to delete all comment of specific task
	 * @param {Object} req Represent express request object 
	 * @param {Object} res Represent express response object 
	 * @returns {Promise}
	 */
	static async deleteAllCommentOfTask (req,res){

		try{
			const result = await CommentService.deleteAllCommentOfTask(req.params.taskId);

			// sending success code . 
			return res.status(HTTP_RESPONSES.SUCCESS.statusCode).json(result);
	
		}catch(error){
	
			// sending 500 code if there is any server related error .
			return res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR.statusCode).json(error);
	
		}
	
	}


	/**
	 * 
	 * @description This is used to update comment. 
	 * @param {Object} req Represent request Object 
	 * @param {Object} res Represent response object
	 * @returns { Promise }
	 */
	static async updateComment(req,res){

		try{

			const result = await CommentService.updateComment(req.params.commentId,req.body);

			// sending success code . 
			return res.status(HTTP_RESPONSES.SUCCESS.statusCode).json(result);
		
		}catch(error){
		
			// sending 500 code if there is any server related error .
			return res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR.statusCode).json(error);
		
		}
	}

}

export default comment ;