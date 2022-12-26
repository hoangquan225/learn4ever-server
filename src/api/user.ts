import Endpoint from '../submodule/common/endpoint';
import express from 'express';
import asyncHandler from '../utils/async_handle';
import { UserInfo } from '../submodule/models/user';
import UserService from '../services/user';
import { isValidObjectId } from 'mongoose';
import { BadRequestError } from '../common/errors';

const userRouter = express.Router();
const userService = new UserService();

userRouter.post(Endpoint.UPDATE_USER, asyncHandler(async (req, res) => {
    const body: { userInfo: UserInfo } = req.body;
    if (!body.userInfo['_id'] || !isValidObjectId(body.userInfo['_id'])) {
        res.sendStatus(403); // bad request
    } else {
        const responseDb = await userService.updateUserInfo(body);
        res.json(responseDb)
    }
}));

userRouter.post(Endpoint.GET_USER_FROM_TOKEN, asyncHandler(async (req, res) => {
    const { token } = <{ token: string }>req.body;
    const users = await userService.checkUserFromToken(token);
    return res.json(users);
}));

userRouter.post(Endpoint.CHANGE_PASSWORD, asyncHandler(async (req, res) => {
    const body: { token: string, account: string, password: string, newPassword: string } = req.body;

    if (!body.newPassword || !body.password) {
        throw res.json(new BadRequestError('invalid newPassword or password'));
    } else {
        const { loginCode, ...userUpdate } = await userService.changePassword(body);
        return res.json({
            loginCode,
            userUpdate,
        });
    }
}));

export { userRouter };
