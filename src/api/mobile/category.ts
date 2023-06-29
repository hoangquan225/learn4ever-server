import { Router } from "express";
import Endpoint from '../../submodule/common/endpoint';
import asyncHandler from '../../utils/async_handle';
import CategoryService from "../../services/category";

const router = Router();
const categoryService = new CategoryService();

router.post(Endpoint.GET_CATEGORYS_BY_SLUG, asyncHandler(async (req, res) => {
    const data = await categoryService.getCategorysBySlug({slug : `${req.query.slug}`, isMobile: true})
    return res.json(data)
}))

export {router as categoryMobileRouter}