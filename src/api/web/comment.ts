import express from 'express';
import CommentService from '../../services/comment';
import ENDPONTAPI from '../../submodule/common/endpoint';
import asyncHandler from '../../utils/async_handle';

const commentRouter = express.Router();
const commentService = new CommentService();

commentRouter.post(ENDPONTAPI.UPDATE_COMMENT, asyncHandler(async (req, res) => {
    const data = await commentService.updateComment(req.body)
    
    return res.json(data)
}))

commentRouter.post(ENDPONTAPI.GET_COMMENT, asyncHandler(async (req, res) => {
    const data = await commentService.getCommentsByIdTopic({idTopic: `${req.query.idTopic}`})
    
    return res.json(data)
}))

export {commentRouter}