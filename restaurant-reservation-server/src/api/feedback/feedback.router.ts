/**
 * @created 16/10/2021 - 08:17
 * @project settings.json
 * @author  Shevan
 * @file    feedback.router
 */

import { NextFunction, Request, Response, Router } from 'express';
import feedbackDTO from './feedbackDTO';
import { HttpValidationError } from '@lib/HttpValidationError';
import feedbackService from './feedback-service';
import feedbackFiltersService from '@api/feedback/feedbackFiltersDTO';
import { Feedback, Prisma, PrismaPromise } from '@prisma/client';
import AuthGuard, { Roles } from '@middlewares/auth-guard';

const router = Router();

router.post('/create-feedback', async (req: Request, res: Response, next: NextFunction) => {
  const { value, error } = feedbackDTO.validate(req.body);

  if (error) {
    return next(new HttpValidationError(error));
  }

  await feedbackService
    .createNewFeedback(value)
    .then((result: Prisma.Prisma__FeedbackClient<Feedback>) => res.status(200).send())
    .catch((err) => next(err));
});

router.get('/get-feedbacks', AuthGuard([Roles.ADMIN]), async (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = feedbackFiltersService.validate(req.query);
  if (error) {
    return next(new HttpValidationError(error));
  }
  await feedbackService
    .getFeedbackByFilters(value)
    .then((result: PrismaPromise<Array<Feedback>>) => res.status(200).json(result))
    .catch((err) => next(err));
});

export default router;
