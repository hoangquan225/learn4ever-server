import mongoose, { Document, Model, model } from "mongoose";
import { Question } from "../submodule/models/question";
interface IQuestionSchema extends Model<QuestionDoc> {

}

export interface QuestionDoc extends Question, Document {
    id: string;
}

const QuestionSchema = new mongoose.Schema<QuestionDoc, IQuestionSchema>(
    {
        
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

export const QuestionModel = model("Question", QuestionSchema);