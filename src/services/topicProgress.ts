import lodash from "lodash";
import { TopicProgressModel } from "../database/topicProgress";
import { TopicProgress } from "../submodule/models/topicProgress";
import moment from "moment";
import { BadRequestError } from "../common/errors";
import TTCSconfig from "../submodule/common/config";
import mongoose from "mongoose";

export default class TopicProgressService {
    upsertTopicProgress = async (body: Partial<TopicProgress>) => {
        try {
            const data = await TopicProgressModel.findOneAndUpdate(
                { $or: [
                    {_id: new mongoose.Types.ObjectId(body._id)},
                    {idTopic: new mongoose.Types.ObjectId(body.idTopic)}
                ] },
                { 
                    $set: {
                        ...lodash.omit(body, ["_id"]),
                        lastUpdate: moment().valueOf()
                    },
                    $setOnInsert: {
                        createDate: moment().valueOf(),
                        answers: null
                    }
                },
                {
                    new: true,
                    upsert: true,
                    // setDefaultsOnInsert: true
                }
            )
            return {
                data: new TopicProgress(data),
                status: TTCSconfig.STATUS_SUCCESS
            }
        } catch (error) {
            console.log(error);
            
            return { 
                data: null,
                status: TTCSconfig.STATUS_FAIL
            }
        }
    }
}