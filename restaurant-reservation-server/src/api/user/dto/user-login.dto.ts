/**
 * @created 26/09/2021 - 17:07
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    user-login.dto
 */

import Joi, { ValidationError } from 'joi';

export type UserLoginDTO = {
  username: string;
  password: string;
};

export const userLoginDTOObject = Joi.object({
  username: Joi.string().min(2).max(20).required().messages({
    'string.base': `User Name should be a type of 'string'`,
    'string.empty': `User Name cannot be an empty field`,
    'string.min': `User Name should have a minimum length of {#limit}.`,
    'string.max': `User Name should have a max length of {#limit}`,
    'any.required': 'User Name is required',
  }),
  password: Joi.string().min(4).max(20).required().messages({
    'string.base': `Password should be a type of 'string'`,
    'string.empty': `Password cannot be an empty field`,
    'string.min': `Password should have a minimum length of {#limit}.`,
    'string.max': `Password should have a max length of {#limit}`,
    'any.required': 'Password is required',
  }),
}).required();

export default {
  validate: (data: unknown): { error?: ValidationError; value: UserLoginDTO } => {
    return userLoginDTOObject.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });
  },
};
