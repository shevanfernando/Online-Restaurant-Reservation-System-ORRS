/**
 * @created 26/09/2021 - 06:42
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    user.router.ts
 */

import { UserService } from '@src/api/user/UserService';
import { NextFunction, Request, Response, Router } from 'express';

const router = Router();
const user = new UserService();

router.post('/login', async (req: Request, res: Response, nxt: NextFunction) => {
  await user
    .login(req.body)
    .then((result) => res.send(result))
    .catch(nxt);
});

export default router;
