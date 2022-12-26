import mongoose, { Document, Model, model } from "mongoose";
import { Tag } from "../submodule/models/tag";
interface ITagSchema extends Model<TagDoc> {

}

export interface TagDoc extends Tag, Document {
    id: string;
}

const TagSchema = new mongoose.Schema<TagDoc, ITagSchema>(
    {
        
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

export const TagModel = model("Tag", TagSchema);