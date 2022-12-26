import mongoose, { Document, Model, model } from "mongoose";
import { Lesson } from "../submodule/models/lesson";
interface ILessonSchema extends Model<LessonDoc> {

}

export interface LessonDoc extends Lesson, Document {
    id: string;
}

const LessonSchema = new mongoose.Schema<LessonDoc, ILessonSchema>(
    {
        
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

export const LessonModel = model("Lesson", LessonSchema);