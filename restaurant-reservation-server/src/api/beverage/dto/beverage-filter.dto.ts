/**
 * @created 19/10/2021
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    beverage-filter.dto
 */

import { beverage_type } from '@prisma/client';
import Joi, { ValidationError } from 'joi';

export type BeverageFilterDTO = {
  page_no: number;
  per_page: number;
  id?: string;
  name?: string;
  beverage_type?: beverage_type;
  price?: number;
};

export const beverageFilterDTOObject = Joi.object({
  page_no: Joi.number().positive().required().messages({
    'number.base': 'Page number should be a type of "number"',
    'number.positive': 'Page number should be a positive amount',
    'any.required': 'Page number is required',
  }),
  per_page: Joi.number().positive().required().messages({
    'number.base': 'Per-Page should be a type of "number"',
    'number.positive': 'Per-Page no should be a positive amount',
    'any.required': 'Per-Page no is required',
  }),
  id: Joi.string().length(12).messages({
    'string.base': `Beverage Id should be a type of 'string'`,
    'string.empty': `Beverage Id cannot be an empty field`,
    'string.length': `Beverage Id should have a {#limit} characters.`,
  }),
  name: Joi.string().min(2).messages({
    'string.base': 'Name should be a type of "string"',
    'string.empty': 'Name cannot be an empty field',
    'string.min': `Name should have a minimum length of {#limit}`,
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
