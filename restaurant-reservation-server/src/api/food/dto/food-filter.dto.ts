/**
 * @created 19/10/2021
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    food-filter.dto
 */
import { food_type } from '@prisma/client';
import Joi, { ValidationError } from 'joi';

export type FoodFilterDTO = {
  page_no: number;
  per_page: number;
  id?: string;
  name?: string;
  food_type?: food_type;
  price?: number;
};

export const foodFilterDTOObject = Joi.object({
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
    'string.base': `Food Id should be a type of 'string'`,
    'string.empty': 'Food Id cannot be an empty field',
    'string.length': `Food Id should have a {#limit} characters.`,
  }),
  name: Joi.string().min(2).messages({
    'string.base': 'Name should be a type of "string"',
    'string.empty': 'Name cannot be an empty field',
    'string.min': `Name should have a minimum length of {#limit}`,
  }),
  food_type: Joi.valid(food_type.SIDE_DISHES, food_type.MAIN_COURSES, food_type.DESSERTS, food_type.STARTERS).messages({
    'any.only': `Food Type is allowed only, {#valids}`,
  }),
  price: Joi.number().positive().messages({
    'number.base': 'Prise should be a type of "number"',
    'number.positive': 'Prise should be a positive amount',
  }),
}).required();

export default {
  validate: (data: unknown): { error?: ValidationError; value: FoodFilterDTO } => {
    return foodFilterDTOObject.validate(data, { stripUnknown: true, abortEarly: false });
  },
};
