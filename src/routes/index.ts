import { Router } from 'express';
import { authRouter } from '../api/web/auth';
import { userRouter } from '../api/user';
import { categoryRouter } from '../api/category';

const router = Router();

router.use(authRouter);
router.use(userRouter);
router.use(categoryRouter);

export { router as webRouters };
