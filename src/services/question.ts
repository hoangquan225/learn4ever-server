import { BadRequestError } from "../common/errors";
import { QuestionModel } from "../database/question";
import TTCSconfig from "../submodule/common/config";
import { Question } from "../submodule/models/question"

export default class QuestionService {
    // get 
    getQuestionsByStatus = async (body: {status: number}): Promise<Question[]> => {
        try {
            const questions = await QuestionModel.find({status: body.status})
            return questions
        } catch (error) {
            throw new BadRequestError();
        }
    }
    // update and create
    updateQuestion = async (body: Question): Promise<{
        data: Question | string,
        status: number 
    }> => {
        if (body?.id) {
            // update
            try {
                const questions = await QuestionModel.findOneAndUpdate(
                    { _id: body?.id },
                    {
                        $set: {
                            ...body,
                            updateDate: Date.now()
                        }
                    },
                    { new: true }
                );
                if(questions) {
                    return {
                        data: questions, 
                        status: TTCSconfig.STATUS_SUCCESS
                    }
                } else {
                    return {
                        data: 'không tồn tại' , 
                        status: TTCSconfig.STATUS_NO_EXIST
                    }
                }
            } catch (error) {
                throw new BadRequestError();
            }
        } else {
            // create
            try {
                const newUser = await QuestionModel.create({
                    ...body,
                    createDate: Date.now(),
                    updateDate: Date.now(),
                })
                return {
                    data: newUser, 
                    status: TTCSconfig.STATUS_SUCCESS
                }
            } catch (error) {
                throw new BadRequestError();
            }
        }
    }
}