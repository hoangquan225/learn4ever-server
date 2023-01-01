import express from 'express';
import CategoryService from '../services/category';
import asyncHandler from '../utils/async_handle';
import Endpoint from '../submodule/common/endpoint';
import TTCSconfig from '../submodule/common/config'

const categoryRouter = express.Router();
const categoryService = new CategoryService();

categoryRouter.post(Endpoint.GET_CATEGORYS_BY_STATUS, asyncHandler(async (req, res) => {
    const body = req.body;
    const data = await categoryService.getCategorysByStatus(
        body.status
            ? { status: Number(body.status) }
            : { status: Number(req.query.status) }
    )

    return res.json({
        data,
        status: TTCSconfig.STATUS_SUCCESS
    })
}))

categoryRouter.post(Endpoint.UPDATE_CATEGORY, asyncHandler(async (req, res) => {
    const data = await categoryService.updateCategory(req.body)
    return res.json(data)
}))

categoryRouter.post(Endpoint.ORDER_CATEGORY, asyncHandler(async (req, res) => {
    const data = await categoryService.orderCategory(req.body)
    return res.json(data)
}))

export { categoryRouter };
