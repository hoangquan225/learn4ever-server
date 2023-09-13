import { Router } from "express";
import _ from "lodash";
import TopicService from "../../services/topic";
import TTCSconfig from "../../submodule/common/config";
import async_handle from "../../utils/async_handle";
import QuestionService from "../../services/question";
import { Topic } from "../../submodule/models/topic";
import { TopicModel } from "../../database/topic";

const router = Router();
const topicServices = new TopicService();
const questionServices = new QuestionService();

router.post("/get-list-topic-by-courseId", async_handle(async (req, res) => {
    const { courseId, status, type } = req.body

    const match = {
        idCourse: courseId,
        type,
        status
    }
    const data = await TopicModel.find(match)

    return res.json({
        status: 0,
        data
    })
}))

router.post("/get-topic-by-id", async_handle(async (req, res) => {
    const { topicId } = req.body;

    const data = await topicServices.getTopicById({ id: topicId })

    return res.json({
        status: TTCSconfig.STATUS_SUCCESS,
        data
    })

}))

router.post("/load-question-by-topic-id", async_handle(async (req, res) => {
    const { topicId } = req.body;
    const data = await questionServices.getQuestionsByTopic({
        status: 1,
        idTopic: topicId
    })
    return res.json({
        status: TTCSconfig.STATUS_SUCCESS,
        data
    })
}))

export { router as TopicRouterMobile };
