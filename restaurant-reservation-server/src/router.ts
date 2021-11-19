/**
 * @created 06/10/2021 - 11:20
 * @project express-ts-startup-project
 * @author  Shevan
 * @file    router
 */

import express, { NextFunction, Request, Response, Router } from 'express';
import config from '@src/config';
import userRouter from '@api/user/user.router';
import foodRouter from '@api/food/food.router';
import beverageRouter from '@api/beverage/beverage.router';
import feedbackRouter from '@api/feedback/feedback.router';
import upload from '@util/image-saver';

const router: Router = Router();

router.use(`${config.API_PREFIX}/user`, userRouter);
router.use(`${config.API_PREFIX}/food`, foodRouter);
router.use(`${config.API_PREFIX}/beverage`, beverageRouter);
router.use(`${config.API_PREFIX}/feedback`, feedbackRouter);
router.use(`${config.API_PREFIX}/images`, express.static('uploads'));

// test image uploading service
router.post(
  `${config.API_PREFIX}/test-file-upload`,
  upload,
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req);
    res.send('Image upload success...');
  }
);

export default router;
