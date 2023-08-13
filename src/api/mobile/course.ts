import { Router } from "express";
import async_handle from "../../utils/async_handle";
import CourseService from "../../services/course";
import TTCSconfig from "../../submodule/common/config";

const router = Router();
const courseServices = new CourseService();

router.post("/get-course-by-category-id", async_handle(async (req, res) => { 
    if(!req.body.categoryId) { 
        return res.json({
            data: null, 
            status: TTCSconfig.STATUS_FAIL,
            message: "request body categoryId is null"
        })
    }
    const data = await courseServices.getCourseByIdCategory(req.body)
    return res.json(data)
}))

export {router as routerCourseMobile}