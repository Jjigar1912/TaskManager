import express from 'express' ; 
import comment from './comment.controller.js';
import { validateUser , validateSchema } from '../../providers/schemaValidator.js';
import { addComment } from './comment.validation.js';

// creating an instance of express.Router()
const router = express.Router(); 

// This is used to add comment 
router.post('/add',validateSchema(addComment),validateUser(['admin','tl','developer']),comment.addComment);

// This is used to display comment of specific task
router.get('/display/:taskId',validateUser(['admin','tl','developer']),comment.displayComment);

// This is used to delete a specific comment
router.delete('/delete/:commentId',validateUser(['admin','tl','developer']),comment.deleteComment);

// This is used to delete all comment of specific task 
router.delete('/task/all/delete/:taskId',validateUser(['admin','tl']),comment.deleteAllCommentOfTask);

// This is used to update comment 
router.put('/update/:commentId',validateUser(['admin','tl','developer']),comment.updateComment);

export default router ; 