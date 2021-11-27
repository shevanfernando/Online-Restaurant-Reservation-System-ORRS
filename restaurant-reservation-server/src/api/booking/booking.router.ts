/**
 * @created 23/11/2021
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    booking.router
 */

import { NextFunction, Request, Response, Router } from 'express';
import AuthGuard, { Roles } from '@middlewares/auth-guard';
import bookingDTOObject from '@api/booking/dto/booking.dto';
import { HttpValidationError } from '@lib/HttpValidationError';
import bookingService from './booking.service';

const router = Router();

router.post('/create', AuthGuard([Roles.CUSTOMER]), (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = bookingDTOObject.validate(req.body);

  if (error) {
    return next(new HttpValidationError(error));
  }

  bookingService
    .createNewBooking(value)
    .then((result) => res.status(201).json(result))
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

export default router;
