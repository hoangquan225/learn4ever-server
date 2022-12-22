import TTCSconfig from "../submodule/common/config";
import { UserInfo } from "../submodule/models/user";
import { UserModel } from "../models/mongo/users";
import { decrypt, encodeSHA256Pass, encrypt } from "../submodule/utils/crypto";
import { jwtDecodeToken, jwtEncode } from "../utils/jwtToken";

class AuthServices {
    private processPass(userObject: {
        account: string;
        password: string;
    }) {
        const decryptedResult = decrypt(userObject.password);
        const encodedPassword = encodeSHA256Pass(userObject.account, decryptedResult);
        return encodedPassword;
    }
    login = async (body: { account: string, password: string }): Promise<UserInfo> => {
        const passEncode = this.processPass(body);
        let userInfo = new UserInfo({ ...body, password: body.password });
        try {
            const checkUserAcc: UserInfo | null = await UserModel.findOne({ account: userInfo.account });
            if (checkUserAcc) {
                if (passEncode === checkUserAcc.password) {
                    userInfo = new UserInfo(checkUserAcc);
                    userInfo.loginCode = TTCSconfig.LOGIN_SUCCESS;
                    userInfo.token = jwtEncode(userInfo?._id, 60*60*24*30);
                    // update lastLogin
                } else {
                    userInfo.loginCode = TTCSconfig.LOGIN_WRONG_PASSWORD;
                }
            } else {
                userInfo.loginCode = TTCSconfig.LOGIN_ACCOUNT_NOT_EXIST;
            }
            return userInfo
        } catch (error) {
            userInfo.loginCode = TTCSconfig.LOGIN_FAILED;
            return userInfo
        }
    }
    register = async (body: UserInfo): Promise<any> => {
        let userInfo = new UserInfo(body);
        try {
            const account = userInfo.account?.trim().toLowerCase();
            const password = userInfo.password;
            const checkUserAcc: UserInfo | null = await UserModel.findOne({ account });
            if (!checkUserAcc) {
                // const encodePassWord = encrypt(password)
                // console.log({encodePassWord});
                // const decodePassWord = decrypt(encodePassWord);
                // console.log({decodePassWord});

                const passEncode = this.processPass({ account, password })

                // luu vao db
                const newUserInfo = {
                    ...userInfo,
                    password: passEncode,
                    registerDate: Date.now(),
                    status: TTCSconfig.UserStatus.NORMAL,
                    lastLogin: Date.now()
                }
                const newUser = await UserModel.create(newUserInfo)
                const token = jwtEncode(newUser?._id, 2592000);
                return {
                    ...newUserInfo, _id: newUser._id, loginCode: TTCSconfig.LOGIN_SUCCESS, token
                };
            }
            return { ...userInfo, loginCode: TTCSconfig.LOGIN_ACCOUNT_IS_USED }
        } catch (err) {
            userInfo.loginCode = TTCSconfig.LOGIN_FAILED;
        }
    }
    // logout =async (token:string) => {
    //     const tokenData = jwtDecodeToken(token);
    //     if (!!token && typeof tokenData !== "string") {
    //     const _tokenData = (tokenData as any) as TokenData;
    //     const { _id, iat, exp } = _tokenData;
    //     const tokenKey = `${REVOKED_TOKEN_KEY}${iat}_${_id}`;
    //     const time = Math.abs(moment().diff(exp! * 1000, "seconds"));
    //     userCacheClient.setex(tokenKey, time, token);
    //     }
    // }
}
export { AuthServices };
