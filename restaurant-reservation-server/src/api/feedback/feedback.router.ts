/**
 * @created 16/10/2021 - 08:17
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    feedback.router
 */

import { NextFunction, Request, Response, Router } from 'express';
import feedbackDTO from './dto/feedback.dto';
import { HttpValidationError } from '@lib/HttpValidationError';
import feedbackService from './feedback.service';
import feedbackFiltersService from '@api/feedback/dto/feedback-filters.dto';
import AuthGuard, { Roles } from '@middlewares/auth-guard';
import { feedbackPaginationDTO } from '@api/shared/dto/pagination.dto';

const router = Router();

router.post('/create', async (req: Request, res: Response, next: NextFunction) => {
  const { value, error } = feedbackDTO.validate(req.body);

  if (error) {
    return next(new HttpValidationError(error));
  }

  await feedbackService
    .createNewFeedback(value)
    .then(() => res.status(200).send())
    .catch((err) => next(err));
});

router.get('/get', AuthGuard([Roles.ADMIN]), async (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = feedbackFiltersService.validate(req.query);
  if (error) {
    return next(new HttpValidationError(error));
  }
  await feedbackService
    .getFeedbackByFilters(value)
    .then((result: feedbackPaginationDTO | void) => res.status(200).json(result))
    .catch((err) => next(err));
});

export default router;
