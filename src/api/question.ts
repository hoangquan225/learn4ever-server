import express from 'express';
import QuestionService from '../services/question';
import asyncHandler from '../utils/async_handle';
import Endpoint from '../submodule/common/endpoint';
import TTCSconfig from '../submodule/common/config'

const questionRouter = express.Router();
const questionService = new QuestionService();

questionRouter.post(Endpoint.GET_QUESTIONS_BY_STATUS, asyncHandler(async (req, res) => {
    const data = await questionService.getQuestionsByStatus({status : Number(req.query.status)})
    return res.json({
        data,
        status : TTCSconfig.STATUS_SUCCESS
    })
}))

questionRouter.post(Endpoint.UPDATE_QUESTION, asyncHandler(async (req, res) => {
    const data = await questionService.updateQuestion(req.body)
    return res.json(data)
}))

export { questionRouter };
