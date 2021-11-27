/**
 * @created 16/10/2021 - 08:22
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    feedback.service
 */

import { FeedbackDto } from '@api/feedback/dto/feedback.dto';
import { feedback, Prisma, PrismaClient } from '@prisma/client';
import { FeedbackFiltersDto } from '@api/feedback/dto/feedback-filters.dto';
import { paginationFunc } from '@api/shared/dto/pagination.dto';
import { HttpError } from '@lib/HttpError';

const prisma = new PrismaClient();

const createNewFeedback = async (data: FeedbackDto): Promise<Prisma.Prisma__feedbackClient<feedback>> =>
  prisma.feedback.create({ data: data });

const getFeedbackByFilters = async (data: FeedbackFiltersDto): Promise<any | void> => {
  const start = (data.page_no - 1) * data.per_page;
  const feedback = await prisma.feedback.findMany({
    skip: start,
    take: data.per_page,
    where: { level: data.level, type: data.type },
    orderBy: [
      {
        id: 'asc',
      },
    ],
  });

  if (feedback.length !== 0) {
    const total = await prisma.feedback.count({ where: { level: data.level, type: data.type } });
    return {
      pagination: paginationFunc({
        total_rec: total,
        per_page: data.per_page,
        cr_num_data: feedback.length,
        page_no: data.page_no,
      }),
      data: feedback,
    };
  }

  let errorFields;

  if (data.level) errorFields = `level = ${data.level}`;

  if (data.type) errorFields = `${(errorFields !== undefined && errorFields + ', ') || ''} type = ${data.type}`;

  throw new HttpError(
    404,
    errorFields === undefined ? "Can't find any matching feedback." : `Can't find any feedback with {${errorFields}}.`
  );
};

export default {
  createNewFeedback,
  getFeedbackByFilters,
};
