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

    getFeedbacksByTypeOrCourse = async (body: { type: string[], idCourse: string}) => {
        const {type, idCourse} = body
        try {
            console.log( {type: type === undefined, idCourse: idCourse});
            let feedbacks
            let count
            if(type !== undefined && idCourse !== "") {
                feedbacks = await FeedbackModel.find({type: {$all: type}, idCourse })   
                count = await FeedbackModel.countDocuments({type: {$all: type}, idCourse }).populate('idUser').populate('idQuestion')
            }else if (type !== undefined) {
                feedbacks = await FeedbackModel.find({type: {$all: type}})   
                count = await FeedbackModel.countDocuments({type: {$all: type}}).populate('idUser').populate('idQuestion')
            } else {
                feedbacks = await FeedbackModel.find({
                    idCourse : body.idCourse
                }).populate('idUser').populate('idQuestion')
                count = await FeedbackModel.countDocuments({
                    idCourse : body.idCourse
                })
            }
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