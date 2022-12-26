import mongoose, { Document, Model, model } from "mongoose";
import { Category } from "../submodule/models/category";
interface ICategorySchema extends Model<CategoryDoc> {

}

export interface CategoryDoc extends Category, Document {
    id: string;
}

const CategorySchema = new mongoose.Schema<CategoryDoc, ICategorySchema>(
    {
        
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

export const CategoryModel = model("Category", CategorySchema);