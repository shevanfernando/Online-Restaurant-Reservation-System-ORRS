/**
 * @created 19/10/2021
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    food.router
 */

import { NextFunction, Request, Response, Router } from 'express';
import foodService from './food.service';
import foodFilterDTOObject from '@api/food/dto/food-filter.dto';
import { HttpValidationError } from '@lib/HttpValidationError';
import foodDTOObject from '@api/food/dto/food.dto';
import AuthGuard, { Roles } from '@middlewares/auth-guard';
import foodUpdateDTOObject from '@api/food/dto/food-update.dto';
import upload from '@util/image-saver';
import imageSaveDTOObject from '@api/shared/victual/dto/image-save.dto';
import victualService from '@api/shared/victual/victual.service';
import itemDeleteDTO from '@api/shared/dto/item-delete.dto';
import { food, Prisma } from '@prisma/client';
import { foodPaginationDTO } from '@api/shared/dto/pagination.dto';

const router = Router();
router.post('/add', AuthGuard([Roles.ADMIN, Roles.CHEF]), async (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = foodDTOObject.validate(req.body);

  if (error) {
    return next(new HttpValidationError(error));
  }

  foodService
    .addFood(value)
    .then((result: Prisma.Prisma__foodClient<food> | void) => res.status(201).json(result))
    .catch((err) => next(err));
});

router.get('/get', async (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = foodFilterDTOObject.validate(req.query);
  if (error) {
    return next(new HttpValidationError(error));
  }
  foodService
    .filterFoods(value)
    .then((result: foodPaginationDTO | void) => res.status(200).json(result))
    .catch((err) => next(err));
});

router.put('/update', AuthGuard([Roles.ADMIN, Roles.CHEF]), async (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = foodUpdateDTOObject.validate(req.body);

  if (error) {
    return next(new HttpValidationError(error));
  }

  foodService
    .updateFood(value)
    .then((result) => res.status(204).json(result))
    .catch((err) => next(err));
});

router.delete('/delete/:id', AuthGuard([Roles.ADMIN]), async (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = itemDeleteDTO.validate(req.params);

  if (error) {
    return next(new HttpValidationError(error));
  }

  foodService
    .deleteFood(value)
    .then((result) => res.status(200).json(result))
    .catch((err) => next(err));
});

router.post(
  '/add-picture',
  AuthGuard([Roles.ADMIN, Roles.CHEF]),
  upload,
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req);
    const { error, value } = imageSaveDTOObject.validate({
      imagePath: req.file?.filename,
      victualId: req.body.victualid,
    });

    if (error) {
      return next(new HttpValidationError(error));
    }

    victualService
      .addImage(value, 'Food')
      .then((result) => res.status(200).json(result))
      .catch((err) => next(err));
  }
);

export default router;
