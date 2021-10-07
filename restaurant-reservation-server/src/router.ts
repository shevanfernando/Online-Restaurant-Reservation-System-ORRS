/**
 * @created 06/10/2021 - 11:20
 * @project express-ts-startup-project
 * @author  Shevan
 * @file    router
 */

import { Router } from 'express';
import config from '@src/config';
import userRouter from '@api/user/user.router';

const router: Router = Router();

router.use(`${config.API_PREFIX}/user`, userRouter);

export default router;
