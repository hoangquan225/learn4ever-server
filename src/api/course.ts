import express from 'express';
import CourseService from '../services/course';
import asyncHandler from '../utils/async_handle';
import Endpoint from '../submodule/common/endpoint';
import TTCSconfig from '../submodule/common/config'

const courseRouter = express.Router();
const courseService = new CourseService();

courseRouter.post(Endpoint.GET_COURSES_BY_STATUS, asyncHandler(async (req, res) => {
    const data = await courseService.getCoursesByStatus({status : Number(req.query.status)})
    return res.json({
        data,
        status : TTCSconfig.STATUS_SUCCESS
    })
}))

courseRouter.post(Endpoint.GET_COURSES_BY_ID_CATEGORY, asyncHandler(async (req, res) => {
    const data = await courseService.getCoursesByIdCategory({idCategory: req.query.idCategory, status : Number(req.query.status)})
    console.log(data);
    
    return res.json({
        data,
        status : TTCSconfig.STATUS_SUCCESS
    })
}))


courseRouter.post(Endpoint.UPDATE_COURSE, asyncHandler(async (req, res) => {
    const data = await courseService.updateCourse(req.body)
    return res.json(data)
}))

export { courseRouter };
