import express from 'express';
import TopicService from '../services/topic';
import asyncHandler from '../utils/async_handle';
import Endpoint from '../submodule/common/endpoint';
import TTCSconfig from '../submodule/common/config'

const topicRouter = express.Router();
const topicService = new TopicService();

topicRouter.post(Endpoint.GET_TOPICS_BY_STATUS, asyncHandler(async (req, res) => {
    const data = await topicService.getTopicsByStatus({status : Number(req.query.status)})
    return res.json({
        data,
        status : TTCSconfig.STATUS_SUCCESS
    })
}))

topicRouter.post(Endpoint.GET_TOPICS_BY_ID_COURSE, asyncHandler(async (req, res) => {
    const data = await topicService.getTopicsByIdCourse({
        idCourse: req.query.idCourse, 
        type : Number(req.query.type), 
    })
    return res.json({
        data,
        status : TTCSconfig.STATUS_SUCCESS
    })
}))

topicRouter.post(Endpoint.GET_TOPICS_BY_PARENT_ID, asyncHandler(async (req, res) => {
    const data = await topicService.getTopicsByParentId({ 
        parentId: req.query.parentId 
    })
    return res.json({
        data,
        status : TTCSconfig.STATUS_SUCCESS
    })
}))

topicRouter.post(Endpoint.UPDATE_TOPIC, asyncHandler(async (req, res) => {
    const data = await topicService.updateTopic(req.body)
    return res.json(data)
}))

export { topicRouter };
