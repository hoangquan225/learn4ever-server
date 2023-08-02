import mongoose, { Model, model } from "mongoose";
import { TopicProgress } from "../submodule/models/topicProgress";
import { userTableName } from "./users";
import { topicTable } from "./topic";

export const topicProgressTable = "TopicProgress";

interface ITopicProgressSchema extends Model<TopicProgressDoc> {

}

export interface TopicProgressDoc extends TopicProgress, Document {
    _id: string;
}

const TopicProgressSchema = new mongoose.Schema<TopicProgressDoc, ITopicProgressSchema>(
    {
        idTopic: {
            type: mongoose.Types.ObjectId, 
            ref: topicTable
        },
        idUser: {
            type: mongoose.Types.ObjectId, 
            ref: userTableName
        },  
        status: Number,
        timeStudy: Number,
        score: Number,
        correctQuestion: Number,
        answers: [{
            idQuestion : String, 
            idAnswer: String
        }]
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

export const TopicProgressModel = model(topicProgressTable, TopicProgressSchema);