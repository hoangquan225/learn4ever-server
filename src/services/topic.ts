import { BadRequestError } from "../common/errors";
import { TopicModel } from "../database/topic";
import TTCSconfig from "../submodule/common/config";
import { Topic } from "../submodule/models/topic"

export default class TopicService {
    // get 
    getTopicsByStatus = async (body: {status: number}): Promise<Topic[]> => {
        try {
            const topics = await TopicModel.find({status: body.status})
            return topics
        } catch (error) {
            throw new BadRequestError();
        }
    }
    // update and create
    updateTopic = async (body: Topic): Promise<{
        data: Topic | string,
        status: number 
    }> => {
        if (body?.id) {
            // update
            try {
                const topics = await TopicModel.findOneAndUpdate(
                    { _id: body?.id },
                    {
                        $set: {
                            ...body,
                            updateDate: Date.now()
                        }
                    },
                    { new: true }
                );
                if(topics) {
                    return {
                        data: topics, 
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
                const newUser = await TopicModel.create({
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