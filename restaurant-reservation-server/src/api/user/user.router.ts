/**
 * @created 26/09/2021 - 06:42
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    user.router.ts
 */

import { NextFunction, Request, Response, Router } from 'express';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  res.send('<h1>This is user module.</h1>');
});

export default router;
