/**
 * @created 19/10/2021
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    beverage-filter.dto
 */

/**
 * @created 19/10/2021
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    food-filter.dto
 */
import { BeverageType } from '@prisma/client';
import Joi, { ValidationError } from 'joi';

export type BeverageFilterDTO = {
  beverageId?: string;
  name?: string;
  beverageType?: BeverageType;
  price?: number;
};

export const beverageFilterDTOObject = Joi.object({
  beverageId: Joi.string().length(12).messages({
    'string.base': `Beverage Id should be a type of 'string'`,
    'string.empty': `Beverage Id cannot be an empty field`,
    'string.length': `Beverage Id should have a {#limit} characters.`,
  }),
  name: Joi.string().min(2).messages({
    'string.base': 'Name should be a type of "string"',
    'string.empty': 'Name cannot be an empty field',
    'string.min': `Name should have a minimum length of {#limit}`,
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
  ).messages({ 'any.only': `Beverage Type is allowed only, {#valids}` }),
  price: Joi.number().positive().messages({
    'number.base': 'Prise should be a type of "number"',
    'number.positive': 'Prise should be a positive amount',
    'any.required': 'Prise is required',
  }),
}).required();

export default {
  validate: (data: unknown): { error?: ValidationError; value: BeverageFilterDTO } => {
    return beverageFilterDTOObject.validate(data, { stripUnknown: true, abortEarly: false });
  },
};
