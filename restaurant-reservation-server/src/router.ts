/**
 * @created 10/09/2021 - 12:46
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    router
 */

import userRouter from '@src/api/user/user.router';
import { API_PREFIX } from '@src/config';
import { Router } from 'express';

const router = Router();

router.use(`${API_PREFIX}/user`, userRouter);

export default router;
