import express from 'express';
import ServerConfig from '../../config';
import { AuthServices } from '../../services/auth';
import asyncHandler from '../../utils/async_handle';
import { UserInfo } from '../../submodule/models/user';
import { isValidEmail } from "../../submodule/utils/validation";
import { BadRequestError } from '../../common/errors';
import TTCSconfig from '../../submodule/common/config';
import { getCookieOptions } from '../../utils/cookie';
import Endpoint from '../../submodule/common/endpont';

const authRouter = express.Router();

const authService = new AuthServices();
authRouter.post(Endpoint.LOGIN, asyncHandler(async (req, res) => {
    const body: { account: string, password: string } = req.body;
    if (!body.account || !body.password) {
        throw res.json(new BadRequestError('invalid account or password'));
    } else {
        const { loginCode, token, ...userLogin } = await authService.login(body);
        return res.json({
            loginCode,
            userLogin,
            token
        });
    }
}));
authRouter.post(Endpoint.LOGOUT, asyncHandler(async (req, res) => {
    console.log("AAAAAAAA");

    return res.json([]);
}));

authRouter.post(Endpoint.REGISTER, asyncHandler(async (req, res) => {
    const body = <UserInfo>req.body;

    if (!body.account || !body.password) throw res.json(new BadRequestError('invalid account or password'));
    if (!isValidEmail(body?.email || '')) throw res.json(new BadRequestError('invalid email'));

    const { loginCode, token, ...registerData } = await authService.register(body);

    // if (loginCode === TTCSconfig.LOGIN_SUCCESS) {
    //     res.cookie('token', token, { ...getCookieOptions() });
    // }

    return res.json({ loginCode, info: registerData, token });
}));

export { authRouter };
