/**
 * @created 16/10/2021 - 12:18
 * @project settings.json
 * @author  Shevan
 * @file    feedbackFiltersDTO
 */

import Joi, { ValidationError } from 'joi';
import { Experiance, FeedbackType } from '@prisma/client';

export type FeedbackFiltersDTO = {
  level?: Experiance;
  type?: FeedbackType;
  numberOfRecords: number;
};

const feedbackFilterDTOObject = Joi.object({
  level: Joi.valid(Experiance.POOR, Experiance.AVERAGE, Experiance.GOOD).messages({
    'any.only': `Level of Experience is allowed only, {#valids}`,
  }),
  type: Joi.valid(FeedbackType.BUG, FeedbackType.OTHER, FeedbackType.SUGGESTION).messages({
    'any.only': `Feedback Type is allowed only, {#valids}`,
  }),
  numberOfRecords: Joi.number().messages({ 'number.base': `Number of Records should be a type of 'number'` }),
}).required();

export default {
  validate: (data: unknown): { error?: ValidationError; value: FeedbackFiltersDTO } => {
    return feedbackFilterDTOObject.validate(data, { abortEarly: false, stripUnknown: true });
  },
};
