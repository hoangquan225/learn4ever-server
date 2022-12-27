// import _ from "lodash";
import mongoose from 'mongoose';
import TTCSconfig from '../submodule/common/config';
// import { Department } from '../../../models/department';
import { UserInfo } from "../submodule/models/user";
import { UserModel } from "../database/users";
import { jwtDecodeToken } from '../utils/jwtToken';
import { decrypt, encodeSHA256Pass, encrypt } from '../submodule/utils/crypto';
// import { UserDepartmentModel } from "../database/mongo/user_department";

export default class UserService {
    private processPass(userObject: {
        account: string;
        password: string;
    }) {
        const decryptedResult = decrypt(userObject.password);
        const encodedPassword = encodeSHA256Pass(userObject.account, decryptedResult);
        return encodedPassword;
    }

    updateUserInfo = async (body: {token:string, userInfo: UserInfo} ): Promise<{
        status: number,
        userInfo: UserInfo | null,
    }> => {
        const tokenDecode = jwtDecodeToken(body.token);
        let userInfo = new UserInfo(body.userInfo)
        let status = TTCSconfig.STATUS_SUCCESS;

        try {
            // const findUser = await UserModel.findOne({ _id: body.userInfo._id });
            const userUpdate = await UserModel.findOneAndUpdate({ _id: tokenDecode._id }, { $set: { ...body.userInfo } }, { new: true });
            userInfo = new UserInfo(userUpdate);

            return {
                status,
                userInfo
            }
        } catch (err) {
            return {
                status: TTCSconfig.STATUS_FAIL,
                userInfo: null
            }
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

    changePassword = async (body: { token: string, password: string, newPassword: string }): Promise<UserInfo> => {
        const { newPassword, token, password } = body;
        const tokenDecode = jwtDecodeToken(token);

        let userInfo = new UserInfo();
        try {
            const checkUser = new UserInfo(await UserModel.findOne({ _id: tokenDecode?._id }));
            const passEncode = this.processPass({ account: checkUser?.account, password: password });

            if (checkUser._id) {
                if (passEncode === checkUser.password) {
                    const newPasswordEncode = this.processPass({ account: checkUser?.account, password: newPassword });
                    const userUpdatePassword = await UserModel.findOneAndUpdate({ _id: tokenDecode?._id }, { $set: { password: newPasswordEncode } }, { new: true });
                    userInfo = new UserInfo(userUpdatePassword);
                    userInfo.loginCode = TTCSconfig.LOGIN_SUCCESS;

                    return userInfo;
                } else {
                    userInfo.loginCode = TTCSconfig.LOGIN_WRONG_PASSWORD;
                }
            } else {
                userInfo.loginCode = TTCSconfig.LOGIN_TOKEN_INVALID;
            }
            return userInfo
        } catch (error) {
            userInfo.loginCode = TTCSconfig.LOGIN_FAILED;
            return userInfo;
        }
    }

    getUserById = async (body: { userId: string }): Promise<UserInfo> => {
        const userInfo = await UserModel.findOne({ _id: body.userId })

        return new UserInfo(userInfo);
    }
}