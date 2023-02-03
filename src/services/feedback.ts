import moment from "moment";
import { BadRequestError } from "../common/errors";
import { FeedbackModel } from "../database/feedback";
import { Feedback } from "../submodule/models/feedback";


export default class FeedbackService {
    // get all 
    getFeedbacks = async () => {
        try {
            const feedbacks = await FeedbackModel.find({}).populate('idUser').populate('idQuestion')
            const count = await FeedbackModel.countDocuments({})
            return {
                data: feedbacks.map(feedback => new Feedback(feedback)), 
                count
            }
        } catch (error) {
            throw new BadRequestError();
        }
    }

    getFeedbacksByCourse = async (body: {idCourse: string}) => {
        try {
            const feedbacks = await FeedbackModel.find({
                idCourse : body.idCourse
            }).populate('idUser').populate('idQuestion')
            const count = await FeedbackModel.countDocuments({
                idCourse : body.idCourse
            })
            return {
                data : feedbacks.map(feedback => new Feedback(feedback)), 
                count
            }
        } catch (error) {
            throw new BadRequestError()
        }
    }

    // create 
    createFeedback = async (body: Feedback): Promise<Feedback> => {
        try {
            const feedback = await FeedbackModel.create({
                ...body, 
                createDate: moment(),
                updateDate: moment()
            })
            return feedback
        } catch (error) {
            throw new BadRequestError()
        }
    } 
}