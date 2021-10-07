/**
 * @created 26/09/2021 - 06:42
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    user.router.ts
 */

import { UserService } from '@api/user/UserService';
import { NextFunction, Request, Response, Router } from 'express';
import userLoginDTO from '@api/user/dto/user-login.dto';
import { HttpValidationError } from '@lib/HttpValidationError';

const router = Router();
const user = new UserService();

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = userLoginDTO.validate(req.body);

  if (error) {
    return next(new HttpValidationError(error));
  }

  await user
    .login(value)
    .then((result: string) => res.status(200).json(result))
    .catch((err) => next(err));
});

export default router;
