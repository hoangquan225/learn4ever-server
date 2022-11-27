import express from 'express';
import ServerConfig from '../config';
import { AuthServices } from '../services/auth';
import asyncHandler from '../utils/async_handle';
import { UserInfo } from '../submodule/models/user';
import { isValidEmail } from "../submodule/utils/validation";
import { BadRequestError } from '../common/errors';
const authRouter = express.Router();

const authService = new AuthServices();
authRouter.post('/login', asyncHandler(async (req, res) => {
    const body: { account: string, password: string } = req.body;
    if (!body.account || !body.password) {
        res.sendStatus(403)
    } else {
        const userLogin = await authService.login(body);
        return res.json(userLogin);
    }
}));
authRouter.post('/logout', asyncHandler(async (req, res) => {
    console.log("AAAAAAAA");

    return res.json([]);
}));

authRouter.post('/register', asyncHandler(async (req, res) => {
    const body = <UserInfo>req.body;

    if (!body.account || !body.password) throw new BadRequestError();
    if(!isValidEmail(body?.email || '')) throw new BadRequestError('invalid email');

    const {loginCode,  token ,...registerData } = await authService.register(body);

    return res.json({loginCode, info: registerData, token});
}));

export { authRouter };

