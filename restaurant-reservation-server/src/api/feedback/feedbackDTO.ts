/**
 * @created 16/10/2021 - 07:30
 * @project settings.json
 * @author  Shevan
 * @file    feedbackDTO
 */

import { Experiance, FeedbackType } from '@prisma/client';
import Joi, { ValidationError } from 'joi';

export type FeedbackDTO = {
  level: Experiance;
  feedback: string;
  type: FeedbackType;
};

const feedbackDTOObject = Joi.object({
  level: Joi.valid(Experiance.POOR, Experiance.AVERAGE, Experiance.GOOD)
    .required()
    .messages({ 'any.only': `Level of Experience is allowed only, {#valids}` }),
  feedback: Joi.string().min(2).required().messages({
    'string.base': `Feedback Description should be a type of 'string'`,
    'string.empty': `Feedback Description cannot be an empty field`,
    'string.min': `Feedback Description should have min length of {#limit}`,
    'any.required': 'Feedback Description is required',
  }),
  type: Joi.valid(FeedbackType.BUG, FeedbackType.OTHERS, FeedbackType.SUGGESTION)
    .required()
    .messages({ 'any:only': `Feedback Type is allowed only, {#valids}` }),
}).required();

export default {
  validate: (data: unknown): { error?: ValidationError; value: FeedbackDTO } => {
    return feedbackDTOObject.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });
  },
};
