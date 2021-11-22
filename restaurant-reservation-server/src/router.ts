/**
 * @created 06/10/2021 - 11:20
 * @project express-ts-startup-project
 * @author  Shevan
 * @file    router
 */

import express, { Router } from 'express';
import config from '@src/config';
import userRouter from '@api/user/user.router';
import foodRouter from '@api/food/food.router';
import beverageRouter from '@api/beverage/beverage.router';
import feedbackRouter from '@api/feedback/feedback.router';
import tableRouter from '@api/table/table.router';

const router: Router = Router();

router.use(`${config.API_PREFIX}/user`, userRouter);
router.use(`${config.API_PREFIX}/food`, foodRouter);
router.use(`${config.API_PREFIX}/beverage`, beverageRouter);
router.use(`${config.API_PREFIX}/feedback`, feedbackRouter);
router.use(`${config.API_PREFIX}/images`, express.static('uploads'));
router.use(`${config.API_PREFIX}/table`, tableRouter);

export default router;
