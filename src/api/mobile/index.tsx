import express, { Router } from "express";
import { categoryMobileRouter } from "./category";
import asyncHandler from '../../utils/async_handle';


const router = Router();
router.use(categoryMobileRouter);
// router.get("/", asyncHandler(async (req, res) => {
//     return res.json('heelo')
// }))

export { router as RouterMobile };