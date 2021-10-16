/**
 * @created 16/10/2021 - 08:22
 * @project settings.json
 * @author  Shevan
 * @file    feedback.service
 */
import { FeedbackDTO } from '@api/feedback/feedbackDTO';
import { Feedback, Prisma, PrismaClient, PrismaPromise } from '@prisma/client';
import { FeedbackFiltersDTO } from '@api/feedback/feedbackFiltersDTO';

const prisma = new PrismaClient();

const createNewFeedback = async (data: FeedbackDTO): Promise<Prisma.Prisma__FeedbackClient<Feedback>> =>
  prisma.feedback.create({ data: data });

const getFeedbackByFilters = async (filters: FeedbackFiltersDTO): Promise<PrismaPromise<Array<Feedback>>> =>
  prisma.feedback.findMany({
    take: filters.numberOfRecords || 10,
    where: { level: filters.level, type: filters.type },
  });

export default {
  createNewFeedback,
  getFeedbackByFilters,
};
