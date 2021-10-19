/**
 * @created 19/10/2021
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    food.router
 */

import { NextFunction, Request, Response, Router } from 'express';
import foodService from './food.service';
import { foodFilterDTOObject } from '@api/food/food-filter.dto';
import { HttpValidationError } from '@lib/HttpValidationError';
import { foodDTOObject } from '@api/food/food.dto';

const router = Router();

router.post('/add-food', async (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = foodDTOObject.validate(req.body);

  if (error) {
    return next(new HttpValidationError(error));
  }

  foodService
    .addFood(value)
    .then((result) => res.status(200).json(result))
    .catch((err) => next(err));
});

router.get('/get-food', async (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = foodFilterDTOObject.validate(req.query);
  if (error) {
    return next(new HttpValidationError(error));
  }
  foodService
    .filterFoods(value)
    .then((result) => res.status(200).json(result))
    .catch((err) => next(err));
});

export default router;
