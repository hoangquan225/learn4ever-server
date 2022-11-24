import KSInternalConfig from "../../submodule/common/config";
import { UserInfo } from "../../submodule/models/user";
import { params } from "../api/auth";
import ServerConfig from "../config";
import { UserModel } from "../models/mongo/users";
import { decrypt, encodeSHA256Pass } from "../utils/crypto";

class AuthServices {
    processPass(userObject: {
        account: string;
        password: string;
    }) {
        const decryptedResult = decrypt(userObject.password);
        const { 1: newPass } = decryptedResult.split("_");
        if (newPass) {
            const encodedPassword = encodeSHA256Pass(userObject.account, newPass);
            return encodedPassword;
        }
        return undefined; // throw error ?
    }
    login = async (body: { account: string, password: string }): Promise<UserInfo> => {
        let newPass = this.processPass(body);


        let userInfo = new UserInfo({ ...body, password: newPass });
        if (newPass) {
            userInfo.password = newPass;
            let checkUserAcc: UserInfo | null = await UserModel.findOne({ account: userInfo.account });
            if (checkUserAcc) {
                if (newPass === checkUserAcc.password) {

                    // temp login sucess
                    // let x: UserRole | null = await this.userRoleDB.findUserRoleForClassesManager(
                    //     checkUserAcc._id,
                    // );
                    // checkUserAcc.classesMngRole = x;
                    userInfo = new UserInfo(checkUserAcc);
                    userInfo.loginCode = KSInternalConfig.LOGIN_SUCCESS;
                    // userInfo.token = jwtEncode(userInfo._id, [userInfo.userRoles]);
                    // await this.saveUserSession({
                    //     userId: userInfo._id,
                    //     token: userInfo.token,
                    // });
                } else {
                    // wrong password
                    userInfo.password = "";
                    userInfo.loginCode = KSInternalConfig.LOGIN_WRONG_PASSWORD;
                }
            } else {
                userInfo.loginCode = KSInternalConfig.LOGIN_ACCOUNT_NOT_EXIST;
            }
        } else {
            // has problem in process password:
            userInfo.loginCode = KSInternalConfig.LOGIN_WRONG_PASSWORD;
        }
        return userInfo;
    }
    register = async (body: params): Promise<UserInfo> => {
        let userInfo = new UserInfo(body);

        try {
        
        let checkUserAcc: UserInfo | null = await UserModel.findOne({ account: userInfo.account });
            if(!checkUserAcc) {
                await UserModel.create(userInfo)
                userInfo.loginCode = KSInternalConfig.LOGIN_SUCCESS;
            }else {
                console.log('eror');
                userInfo.loginCode = KSInternalConfig.LOGIN_ACCOUNT_IS_USED;
            }
        }catch (err) {
            userInfo.loginCode = KSInternalConfig.LOGIN_FAILED;
        }

        return userInfo;
    }
}
export { AuthServices }