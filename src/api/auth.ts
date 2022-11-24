import express, { Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import ServerConfig from '../config';
import { AuthServices } from '../services/auth';
const authRouter = express.Router();
import asyncHandler from '../utils/async_handle';

import jwtToken from '../utils/jwtToken';
import fs from 'fs'
import { UserInfo } from '../../submodule/models/user';

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

export interface params { 
    password: string, 
    account: string, 
}

authRouter.post('/register', asyncHandler(async (req, res) => {
    const body: params = req.body;
    console.log({body});
    
    if (!body.account || !body.password) {
        res.sendStatus(403)
    } else {
        const userRegister = await authService.register(body);
        return res.json(userRegister.loginCode);
    }
}));

export const verifyToken = async (req: Request, res: Response, next: () => void) => {
    // tham khảo bên web cms
    // let token = req.headers.authorization;
    let token = req.headers.authorization || req.body.token || req.cookies.token;

    if (token) { 
        try {
            let cert = fs.readFileSync('../../key/publicKey.crt');  // get public key
            console.log("Authorized");
            const decodeToken = await jwtToken.verifyToken(token, cert);
            next();
        } catch (err) {
            console.error(err);
            return res.status(401).json("Unauthorized");
        }
        // next();
    } else {
        console.log("Unauthorized");
        res.status(402).json("Invalid token")
    }
}
export { authRouter };
