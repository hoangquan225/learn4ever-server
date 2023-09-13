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
        status,
        parentId: null
    }
    const data = await TopicModel.find(match).populate('topicChild')
    console.log(data);
    
    // console.log({
    //     status: 0, 
    //     data: data.map((o : any) => ({ 
    //         ...o["_doc"], 
    //         topicChildData: o.topicChild.filter((topic: any) => topic["_doc"].status === status).map(topic => ({...topic["_doc"]})), 
    //         topicChild: o.topicChild.filter((topic: any) => topic["_doc"].status === status).map(topic => topic["_doc"]._id || "")
    //     }))
    // });
    
    return res.json({
        status: 0, 
        data: data.map((o : any) => ({ 
            ...o["_doc"], 
            topicChildData: o.topicChild.filter((topic: any) => topic["_doc"].status === status).map(topic => ({...topic["_doc"]})), 
            topicChild: o.topicChild.filter((topic: any) => topic["_doc"].status === status).map(topic => topic["_doc"]._id || "")
        }))
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
