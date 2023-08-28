import { Router } from "express";
import async_handle from "../../utils/async_handle";
import { encodeSHA256Pass } from "../../submodule/utils/crypto";
import { UserModel } from "../../database/users";
import TTCSconfig from "../../submodule/common/config";
import { jwtDecodeToken, jwtEncode } from "../../utils/jwtToken";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { BadRequestError } from "../../common/errors";

const router = Router();

router.post("/login", async_handle(async (req, res) => {
    const { account, password } = req.body


    const user = await UserModel.findOne({ account })
    if (!user) {
        return res.status(200).json({
            status: TTCSconfig.STATUS_FAIL,
            token: "-1" // không tồn tại
        })
    }

    const encodedPassword = encodeSHA256Pass(account, password);

    if (encodedPassword !== user.password) {
        return res.status(200).json({
            status: TTCSconfig.STATUS_FAIL,
            token: "1" // sai password
        })
    }
    const token = jwtEncode(user._id, 60 * 60 * 24 * 30);

    return res.json({
        status: TTCSconfig.STATUS_SUCCESS,
        token
    })
}))

router.post("/session", async_handle(async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) return res.status(401).json({})
        const decode = jwtDecodeToken(token);
        if (!decode || typeof decode === "string") return res.status(401).json({});
        return res.status(200).json({});
    } catch (error) {
        if (error instanceof JsonWebTokenError) {
            if (error instanceof TokenExpiredError) {
                return res.status(401).json({ data: -1 }); // token het han
            }
        }
        throw new BadRequestError();
    }
}))

export { router as authRouter }