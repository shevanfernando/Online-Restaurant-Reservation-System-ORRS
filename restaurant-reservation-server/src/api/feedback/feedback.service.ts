/**
 * @created 16/10/2021 - 08:22
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    feedback.service
 */
import { FeedbackDto } from '@api/feedback/feedback.dto';
import { Feedback, Prisma, PrismaClient, PrismaPromise } from '@prisma/client';
import { FeedbackFiltersDto } from '@api/feedback/feedback-filters.dto';

const prisma = new PrismaClient();

const createNewFeedback = async (data: FeedbackDto): Promise<Prisma.Prisma__FeedbackClient<Feedback>> =>
  prisma.feedback.create({ data: data });

const getFeedbackByFilters = async (filters: FeedbackFiltersDto): Promise<PrismaPromise<Array<Feedback>>> =>
  prisma.feedback.findMany({
    take: filters.numberOfRecords || 10,
    where: { level: filters.level, type: filters.type },
  });

export default {
  createNewFeedback,
  getFeedbackByFilters,
};
