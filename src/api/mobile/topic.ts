import { Router } from "express";
import _ from "lodash";
import TopicService from "../../services/topic";
import TTCSconfig from "../../submodule/common/config";
import async_handle from "../../utils/async_handle";
import QuestionService from "../../services/question";

const router = Router();
const topicServices = new TopicService();
const questionServices = new QuestionService();

router.post("/get-list-topic-by-courseId", async_handle(async (req, res) => {
    const { courseId, status, type } = req.body
    console.log({
        courseId, status, type
    });

    const data = await topicServices.getTopicsByCourse({
        idCourse: courseId,
        status,
        type,
        parentId: null
    })
    console.log(_.omit(data, ["total"]));
    
    return res.json(_.omit(data, ["total"]))
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
