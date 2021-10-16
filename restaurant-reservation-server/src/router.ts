/**
 * @created 06/10/2021 - 11:20
 * @project express-ts-startup-project
 * @author  Shevan
 * @file    router
 */

import { Request, Response, NextFunction, Router } from 'express';
import config from '@src/config';
import userRouter from '@api/user/user.router';
import upload from '@util/image-saver';

const router: Router = Router();

router.use(`${config.API_PREFIX}/user`, userRouter);

router.post(
  `${config.API_PREFIX}/test-file-upload`,
  upload,
  async (req: Request, res: Response, next: NextFunction) => {
    res.send('Image upload success...');
  }
);

export default router;
