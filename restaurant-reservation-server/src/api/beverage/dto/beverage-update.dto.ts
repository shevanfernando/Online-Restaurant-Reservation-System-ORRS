/**
 * @created 22/11/2021
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    beverage-update.dto
 */

import Joi, { ValidationError } from 'joi';
import { beverage_type } from '@prisma/client';
import { VictualDTO, victualDTOObject } from '@api/shared/victual/dto/victual.dto';

export type BeverageUpdateDTO = {
  id: string;
  beverage_type: beverage_type;
  victual: VictualDTO;
};

export const beverageUpdateDTOObject = Joi.object({
  id: Joi.string().length(12).required().messages({
    'string.base': 'Beverage Id should be a type of "string"',
    'string.empty': 'Beverage Id cannot be an empty field',
    'string.length': `Beverage Id should have a {#limit} characters.`,
    'any.required': 'Beverage Id is required',
  }),
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
  validate: (data: unknown): { error?: ValidationError; value: BeverageUpdateDTO } => {
    return beverageUpdateDTOObject.validate(data, { stripUnknown: true, abortEarly: false });
  },
};
