/**
 * @created 11/10/2021 - 13:10
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    victual.dto
 */

import Joi, { ValidationError } from 'joi';

export type VictualDTO = {
  name: string;
  description: string;
  price: number;
};

export const victualDTOObject = Joi.object({
  name: Joi.string().min(2).required().messages({
    'string.base': 'Name should be a type of "string"',
    'string.empty': 'Name cannot be an empty field',
    'string.min': `Name should have a minimum length of {#limit}`,
    'any.required': `Name is required`,
  }),
  description: Joi.string().min(10).required().messages({
    'string.base': 'Description should be a type of "string"',
    'string.empty': 'Description cannot be an empty field',
    'string.min': `Description should have a minimum length of {#limit}`,
    'any.required': `Description is required`,
  }),
  price: Joi.number().positive().required().messages({
    'number.base': 'Prise should be a type of "number"',
    'number.positive': 'Prise should be a positive amount',
    'any.required': 'Prise is required',
  }),
}).required();

export default {
  validate: (data: unknown): { error?: ValidationError; value: VictualDTO } => {
    return victualDTOObject.validate(data, { abortEarly: false, stripUnknown: true });
  },
};
