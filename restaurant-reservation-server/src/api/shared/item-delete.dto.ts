/**
 * @created 18/11/2021
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    item-delete.dto.ts
 */
import Joi, { ValidationError } from 'joi';

export type ItemDeleteDTO = {
  id: string;
};

export const itemDeleteDTO = Joi.object({
  id: Joi.string().length(12).required().messages({
    'string.base': 'Id should be a type of "string"',
    'string.empty': 'Id cannot be an empty field',
    'string.length': `Id should have a {#limit} characters.`,
    'any.required': 'Id is required',
  }),
});

export default {
  validate: (data: unknown): { error?: ValidationError; value: ItemDeleteDTO } => {
    return itemDeleteDTO.validate(data, { abortEarly: false, stripUnknown: true });
  },
};
