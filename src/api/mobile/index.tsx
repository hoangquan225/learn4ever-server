import express, { Router } from "express";
import { categoryMobileRouter } from "./category";
import asyncHandler from '../../utils/async_handle';
import { topicProgressRouter } from "./topicProgress";
import { routerCourseMobile } from "./course";


const router = Router();
router.use(categoryMobileRouter);
router.use(topicProgressRouter);
router.use(routerCourseMobile);
// router.get("/", asyncHandler(async (req, res) => {
//     return res.json('heelo')
// }))

export { router as RouterMobile };