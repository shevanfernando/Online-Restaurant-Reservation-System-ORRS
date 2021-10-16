/**
 * @created 07/10/2021 - 09:58
 * @project settings.json
 * @author  Shevan
 * @file    JWT-validation
 */

import { Request, Response, NextFunction } from 'express';
import { JWT } from '@util/JWT';
import { HttpError } from '@lib/HttpError';

export enum Roles {
  CUSTOMER = 'CUSTOMER',
  RECEPTIONIST = 'RECEPTIONIST',
  WAITER = 'WAITER',
  ADMIN = 'ADMIN',
  CHEF = 'CHEF',
}

const authGuard = (roles: Roles[]): ((req: Request, res: Response, next: NextFunction) => void) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    new JWT()
      .verifyToken(token)
      .then((res: { data: any }) => {
        if (roles.includes(res.data.userType)) {
          next();
        } else {
          next(new HttpError(403, 'Forbidden'));
        }
      })
      .catch((err) => next(new HttpError(401, err)));
  };
};

export default authGuard;
