import Endpoint from '../submodule/common/endpont';
import express from 'express';
import asyncHandler from '../utils/async_handle';
import { UserInfo } from '../submodule/models/user';
import UserService from '../services/user';
import { isValidObjectId } from 'mongoose';

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

userRouter.post(Endpoint.LOAD_USER_INFO, asyncHandler(async (req, res) => {
    const body: { userId } = req.body;
    const users = await userService.loadUserInfo(body);
    res.json(users)
}));


userRouter.post('/get-user-from-token', asyncHandler(async (req, res) => {
    const { token } = <{ token: string }>req.body;
    const users = await userService.checkUserFromToken(token);
    return res.json(users);
}));

// userRouter.post(Endpoint.LOAD_USERS_BY_WORK_STATUS, asyncHandler(async (req, res) => {
//     const body: { status: number[], startDate?: number, endDate?: number } = req.body;
//     const users = await userService.loadUsersByWorkStatus(body);
//     res.json(users)
// }));

// userRouter.get("/users", asyncHandler(async (req, res) => {
//     const data = await userService.listUsers();
//     return res.json(data);
// }));


export { userRouter };
