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
import { itemDeleteDTO } from '@api/shared/item-delete.dto';
import upload from '@util/image-saver';
import { imageSaveDTOObject } from '@api/shared/victual/image-save.dto';
import victualService from '@api/shared/victual/victual.service';
import { beverageUpdateDTOObject } from '@api/beverage/beverage-update.dto';

const router = Router();

router.post('/add', AuthGuard([Roles.ADMIN, Roles.CHEF]), async (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = beverageDTOObject.validate(req.body);

  if (error) {
    return next(new HttpValidationError(error));
  }

  beverageService
    .addBeverage(value)
    .then((result) => res.status(201).json(result))
    .catch((err) => next(err));
});

router.get('/get', async (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = beverageFilterDTOObject.validate(req.query);
  if (error) {
    return next(new HttpValidationError(error));
  }
  beverageService
    .filterBeverage(value)
    .then((result) => res.status(200).json(result))
    .catch((err) => next(err));
});

router.put('/update', AuthGuard([Roles.ADMIN, Roles.CHEF]), async (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = beverageUpdateDTOObject.validate(req.body);

  if (error) {
    return next(new HttpValidationError(error));
  }

  beverageService
    .updateBeverage(value)
    .then((result) => res.status(204).json(result))
    .catch((err) => next(err));
});

router.delete('/delete/:id', AuthGuard([Roles.ADMIN]), async (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = itemDeleteDTO.validate(req.params);

  if (error) {
    return next(new HttpValidationError(error));
  }

  beverageService
    .deleteBeverage(value)
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
      victualId: req.body.victualId,
    });

    if (error) {
      return next(new HttpValidationError(error));
    }

    victualService
      .addImage(value, 'Beverage')
      .then((result) => res.status(200).json(result))
      .catch((err) => next(err));
  }
);

export default router;
