/**
 * @created 19/10/2021
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    beverage.dto
 */

import Joi, { ValidationError } from 'joi';
import { beverage_type } from '@prisma/client';
import { VictualDTO, victualDTOObject } from '@api/shared/victual/dto/victual.dto';

export type BeverageDTO = {
  beverage_type: beverage_type;
  victual: VictualDTO;
};

export const beverageDTOObject = Joi.object({
  beverage_type: Joi.valid(
    beverage_type.STIMULATING,
    beverage_type.NOURISHING,
    beverage_type.RUM,
    beverage_type.BEER,
    beverage_type.VODKA,
    beverage_type.REFRESHING,
    beverage_type.VINE,
    beverage_type.BRANDY,
    beverage_type.WHISKY
  )
    .required()
    .messages({
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
