import express, { Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import ServerConfig from '../config';
import { AuthServices } from '../services/auth';
const authRouter = express.Router();
import asyncHandler from '../utils/async_handle';
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
authRouter.post('/confirm-password', asyncHandler(async (req, res) => {
    const body: { account: string, password: string} = req.body;
    if (!body.account || !body.password) {
        res.send({ status: false })
    } else {
        const newpass = await authService.processPass(body);
        if(newpass === ServerConfig.PASSWORD_CONFIRM){
            res.send({ 
                status: true,
            })
        }else{
            res.send({ status: false})
        }
    }
}))
export const verifyToken = (req: Request, res: Response, next: () => void) => {
    // tham khảo bên web cms
    let token = req.headers.authorization;
    if (!token) {   
        console.log("Authorized");
        // next();
    } else {
        console.log("Unauthorized");

    }
}
export { authRouter };
