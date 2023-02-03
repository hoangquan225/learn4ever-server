import mongoose, { Document, Model, model } from "mongoose";
import { Feedback } from "../submodule/models/feedback";
import { courseTable } from "./course";
import { questionTable } from "./question";

export const feedbackTable = "Feedback";
interface IFeedbackSchema extends Model<FeedbackDoc> {

}

export interface FeedbackDoc extends Feedback, Document {
    id: string;
}

const FeedbackSchema = new mongoose.Schema<FeedbackDoc, IFeedbackSchema>(
    {
        status: Number,
        idQuestion: {
            type: mongoose.Types.ObjectId, 
            ref: questionTable
        },
        idCourse: {
            type: mongoose.Types.ObjectId, 
            ref: courseTable
        },
        content: String,
        type: Number,
        createDate: {type: Number, default: Date.now()},
        updateDate: {type: Number, default: Date.now()},
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

export const FeedbackModel = model(feedbackTable, FeedbackSchema);