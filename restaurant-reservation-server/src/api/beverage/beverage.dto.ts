/**
 * @created 19/10/2021
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    beverage.dto
 */

import Joi, { ValidationError } from 'joi';
import { BeverageType } from '@prisma/client';
import { VictualDTO, victualDTOObject } from '@api/shared/victual/victual.dto';

export type BeverageDTO = {
  beverageType: BeverageType;
  victual: VictualDTO;
};

export const beverageDTOObject = Joi.object({
  beverageType: Joi.valid({ BeverageType }).required().messages({
    'any.only': `Beverage Type is allowed only, {#valids}`,
    'any.required': 'Beverage Type is required',
  }),
  victual: victualDTOObject,
}).required();

export default {
  validate: (data: unknown): { error?: ValidationError; value: BeverageDTO } => {
    return beverageDTOObject.validate(data, { stripUnknown: true, abortEarly: false });
  },
};
