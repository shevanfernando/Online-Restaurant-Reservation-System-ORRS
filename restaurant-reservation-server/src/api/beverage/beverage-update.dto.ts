/**
 * @created 22/11/2021
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    beverage-update.dto
 */

import Joi, { ValidationError } from 'joi';
import { BeverageType } from '@prisma/client';
import { VictualDTO, victualDTOObject } from '@api/shared/victual/victual.dto';

export type BeverageUpdateDTO = {
  beverageId: string;
  beverageType: BeverageType;
  victual: VictualDTO;
};

export const beverageUpdateDTOObject = Joi.object({
  beverageId: Joi.string().length(12).required().messages({
    'string.base': 'Beverage Id should be a type of "string"',
    'string.empty': 'Beverage Id cannot be an empty field',
    'string.length': `Beverage Id should have a {#limit} characters.`,
    'any.required': 'Beverage Id is required',
  }),
  beverageType: Joi.valid(
    BeverageType.BEER,
    BeverageType.BRANDY,
    BeverageType.RUM,
    BeverageType.VINE,
    BeverageType.VODKA,
    BeverageType.REFRESHING,
    BeverageType.NOURISHING,
    BeverageType.STIMULATING,
    BeverageType.WHISKY
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
