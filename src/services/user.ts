// import _ from "lodash";
import mongoose from 'mongoose';
import TTCSconfig from '../submodule/common/config';
// import { Department } from '../../../models/department';
import { UserInfo } from "../submodule/models/user";
import { UserModel } from "../models/mongo/users";
import { jwtDecodeToken } from '../utils/jwtToken';
// import { UserDepartmentModel } from "../database/mongo/user_department";

export default class UserService {
    loadUserInfo = async (body: { userId: string }): Promise<UserInfo> => {
        const user = await UserModel
            .findOne({
                status: TTCSconfig.STATUS_PUBLIC,
                _id: body.userId
            })
        return new UserInfo(user);
    }

    // loadUsersByWorkStatus = async (body: { status: number[]; startDate?: number | undefined; endDate?: number | undefined; }) => {
    //     const users = await UserModel
    //         .find({
    //             status: { $in: body.status },
    //             userRole: TTCSconfig.STAFF
    //         }).populate("departmentId")

    //     return users.map(user => new UserInfo(user));
    // }

    updateUserInfo = async (body: { userInfo: UserInfo }): Promise<UserInfo | null> => {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const findUser = await UserModel.findOne({ _id: body.userInfo['_id'] });
            const userUpdate = await UserModel.findOneAndUpdate({ _id: body.userInfo['_id'] }, { $set: { ...body.userInfo } }, { new: true });
            userUpdate?.$session();

            /**
             * Tạo bản ghi trong bảng userDepartment nếu là update department
             */
            // const department = new Department(findUser.departmentId);
            // if (body.userInfo.departmentId !== department._id?.toString()) {
            //     const resUserDepartment = await new UserDepartmentModel({
            //         userId: userUpdate._id,
            //         departmentId: userUpdate.departmentId
            //     }).save();
            //     resUserDepartment.$session();
            // }

            session.commitTransaction();
            return new UserInfo(userUpdate);
        } catch (err) {
            session.abortTransaction();
            return null
        } finally {
            session.endSession();
        }
    }

    checkUserFromToken = async (token: string): Promise<{
        status: number,
        userInfo: UserInfo | null,
    }> => {
        const tokenDecode = jwtDecodeToken(token);
        let status = TTCSconfig.STATUS_SUCCESS;
        // find db 
        try {
            const userInfo = await UserModel.findOne({ _id: tokenDecode?._id });
            if (!userInfo) {
                status = TTCSconfig.STATUS_FAIL
            }
            return {
                status,
                userInfo
            }
        } catch (error) {
            return {
                status: TTCSconfig.STATUS_FAIL,
                userInfo: null
            }
        }

    }

    // saveNewUser = async (body: { userInfo: UserInfo }): Promise<UserInfo | null> => {
    //     const session = await mongoose.startSession();
    //     session.startTransaction();
    //     try {
    //         const resUser = await new UserModel(body.userInfo).save();
    //         resUser.$session();
    //         const resUserDepartment = await new UserDepartmentModel({
    //             userId: resUser._id,
    //             departmentId: body.userInfo.departmentId
    //         }).save();
    //         resUserDepartment.$session();
    //         session.commitTransaction();
    //         return resUser;
    //     } catch (err) {
    //         session.abortTransaction();
    //         return null
    //     } finally {
    //         session.endSession();
    //     }
    // }

    // listUsers = async () => {
    //     const fields: Array<keyof UserInfo> = ["_id", "account", "name", "avatar", "email", "userType", "userRole"];
    //     const users = await UserModel.find({ status: TTCSconfig.STATUS_PUBLIC }).select(fields.join(" "));
    //     return users.map((e) => {
    //         const user = new UserInfo(e);
    //         return _.pick(user, fields)
    //     });
    // }

}