/**
 * @created 16/10/2021 - 12:18
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    feedback-filters.dto
 */

import Joi, { ValidationError } from 'joi';
import { experiance, feedback_type } from '@prisma/client';

export type FeedbackFiltersDto = {
  page_no: number;
  per_page: number;
  level?: experiance;
  type?: feedback_type;
};

const feedbackFilterDTOObject = Joi.object({
  page_no: Joi.number().positive().required().messages({
    'number.base': 'Page number should be a type of "number"',
    'number.positive': 'Page number should be a positive amount',
    'any.required': 'Page number is required',
  }),
  per_page: Joi.number().positive().required().messages({
    'number.base': 'Per-Page should be a type of "number"',
    'number.positive': 'Per-Page no should be a positive amount',
    'any.required': 'Per-Page no is required',
  }),
  level: Joi.valid({ experiance }).messages({
    'any.only': `Level of Experience is allowed only, {#valids}`,
  }),
  type: Joi.valid({ feedback_type }).messages({
    'any.only': `Feedback Type is allowed only, {#valids}`,
  }),
}).required();

export default {
  validate: (data: unknown): { error?: ValidationError; value: FeedbackFiltersDto } => {
    return feedbackFilterDTOObject.validate(data, { abortEarly: false, stripUnknown: true });
  },
};
