/**
 * @created 16/10/2021 - 07:30
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    feedback.dto
 */

import { experiance, feedback_type } from '@prisma/client';
import Joi, { ValidationError } from 'joi';

export type FeedbackDto = {
  level: experiance;
  feedback: string;
  type: feedback_type;
};

const feedbackDTOObject = Joi.object({
  level: Joi.valid(experiance.POOR, experiance.AVERAGE, experiance.GOOD)
    .required()
    .messages({ 'any.only': `Level of Experience is allowed only, {#valids}` }),
  feedback: Joi.string().min(2).required().messages({
    'string.base': `Feedback Description should be a type of 'string'`,
    'string.empty': `Feedback Description cannot be an empty field`,
    'string.min': `Feedback Description should have min length of {#limit}`,
    'any.required': 'Feedback Description is required',
  }),
  type: Joi.valid({ feedback_type }).required().messages({ 'any.only': `Feedback Type is allowed only, {#valids}` }),
}).required();

export default {
  validate: (data: unknown): { error?: ValidationError; value: FeedbackDto } => {
    return feedbackDTOObject.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });
  },
};
