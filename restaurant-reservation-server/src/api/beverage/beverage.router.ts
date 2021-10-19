/**
 * @created 19/10/2021
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    beverage.router.ts
 */

import { NextFunction, Request, Response, Router } from 'express';
import beverageService from './beverage.service';
import { HttpValidationError } from '@lib/HttpValidationError';
import { beverageDTOObject } from '@api/beverage/beverage.dto';
import { beverageFilterDTOObject } from '@api/beverage/beverage-filter.dto';
import AuthGuard, { Roles } from '@middlewares/auth-guard';

const router = Router();

router.post(
  '/add-beverage',
  AuthGuard([Roles.ADMIN, Roles.CHEF]),
  async (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = beverageDTOObject.validate(req.body);

    if (error) {
      return next(new HttpValidationError(error));
    }

    beverageService
      .addBeverage(value)
      .then((result) => res.status(200).json(result))
      .catch((err) => next(err));
  }
);

router.get('/get-beverage', async (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = beverageFilterDTOObject.validate(req.query);
  if (error) {
    return next(new HttpValidationError(error));
  }
  beverageService
    .filterBeverage(value)
    .then((result) => res.status(200).json(result))
    .catch((err) => next(err));
});

export default router;
