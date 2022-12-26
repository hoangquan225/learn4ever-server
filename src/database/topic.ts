import mongoose, { Document, Model, model } from "mongoose";
import { Topic } from "../submodule/models/topic";
interface ITopicSchema extends Model<TopicDoc> {

}

export interface TopicDoc extends Topic, Document {
    id: string;
}

const TopicSchema = new mongoose.Schema<TopicDoc, ITopicSchema>(
    {
        
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

export const TopicModel = model("Topic", TopicSchema);