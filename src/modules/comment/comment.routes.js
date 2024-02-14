import express from 'express' ; 
import comment from './comment.controller.js';
import { validateUser , validateSchema } from '../../providers/schemaValidator.js';
import { addComment } from './comment.validation.js';

const router = express.Router(); 

router.post('/add',validateSchema(addComment),validateUser(['admin','tl','developer']),comment.addComment);
router.get('/display/:taskId',validateUser(['admin','tl','developer']),comment.displayComment);
router.delete('/delete/:commentId',validateUser(['admin','tl','developer']),comment.deleteComment);
router.delete('/task/all/delete/:taskId',validateUser(['admin','tl']),comment.deleteAllCommentOfTask);
router.put('/update/:commentId',validateUser(['admin','tl','developer']),comment.updateComment);

export default router ; 