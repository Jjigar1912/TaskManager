import { HTTP_RESPONSES } from '../../../constants/constant.js';
import CommentService from './comment.service.js';

class comment {

	static async addComment(req,res){
		
		try{	
			const result = await CommentService.addComment(req.body);
			return res.status(HTTP_RESPONSES.SUCCESS.statusCode).json(result);
		}catch(error){
			return res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR.statusCode).json(error);
		}

	}


	static async displayComment(req,res){

		try{	
			const result = await CommentService.displayComment(req.params.taskId);
			return res.status(HTTP_RESPONSES.SUCCESS.statusCode).json(result);
		}catch(error){
			return res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR.statusCode).json(error);
		}
	}


	static async deleteComment(req,res){

		try{
			const result = await CommentService.deleteComment(req.params.commentId);
			return res.status(HTTP_RESPONSES.SUCCESS.statusCode).json(result);
		}catch(error){
			return res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR.statusCode).json(error);
		}
	}


	static async deleteAllCommentOfTask (req,res){

		try{
			const result = await CommentService.deleteAllCommentOfTask(req.params.taskId);
			return res.status(HTTP_RESPONSES.SUCCESS.statusCode).json(result);
		}catch(error){
			return res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR.statusCode).json(error);
		}
	}


	static async updateComment(req,res){

		try{
			const result = await CommentService.updateComment(req.params.commentId,req.body);
			return res.status(HTTP_RESPONSES.SUCCESS.statusCode).json(result);
		}catch(error){
			return res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR.statusCode).json(error);
		}
	} 
}

export default comment ;