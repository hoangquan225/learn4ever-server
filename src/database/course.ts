import mongoose, { Document, Model, model } from "mongoose";
import { Course } from "../submodule/models/course";
interface ICourseSchema extends Model<CourseDoc> {

}

export interface CourseDoc extends Course, Document {
    id: string;
}

const CourseSchema = new mongoose.Schema<CourseDoc, ICourseSchema>(
    {
        
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

export const CourseModel = model("Course", CourseSchema);