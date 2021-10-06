/**
 * @created 26/09/2021 - 17:07
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    UserLoginDTO
 */

import Joi, { ValidationError } from 'joi';

export type UserLoginDTO = {
  username: string;
  password: string;
};

export const userLoginDTOObject = Joi.object({
  username: Joi.string().min(2).max(20).required(),
  password: Joi.string().min(4).max(20).required(),
}).required();

export default {
  validate: (data: unknown): { error?: ValidationError; value: UserLoginDTO } => {
    return userLoginDTOObject.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });
  },
};
