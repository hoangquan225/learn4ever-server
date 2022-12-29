import { BadRequestError } from "../common/errors";
import { CategoryModel } from "../database/category";
import TTCSconfig from "../submodule/common/config";
import { Category } from "../submodule/models/category"

export default class CategoryService {
    // get 
    getCategorysByStatus = async (body: {status: number}): Promise<Category[]> => {
        try {
            const categorys = await CategoryModel.find({status: body.status})
            return categorys
        } catch (error) {
            throw new BadRequestError();
        }
    }
    // update and create
    updateCategory = async (body: Category): Promise<{
        data: Category | string,
        status: number 
    }> => {
        if (body?.id) {
            // update
            try {
                const categorys = await CategoryModel.findOneAndUpdate(
                    { _id: body?.id },
                    {
                        $set: {
                            ...body,
                            updateDate: Date.now()
                        }
                    },
                    { new: true }
                );
                if(categorys) {
                    return {
                        data: categorys, 
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
                const newUser = await CategoryModel.create({
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