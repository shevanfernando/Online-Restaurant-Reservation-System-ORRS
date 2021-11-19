/**
 * @created 19/10/2021
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    food-filter.dto
 */
import { FoodType } from '@prisma/client';
import Joi, { ValidationError } from 'joi';

export type FoodFilterDTO = {
  foodId?: string;
  name?: string;
  foodType?: FoodType;
  price?: number;
};

export const foodFilterDTOObject = Joi.object({
  foodId: Joi.string().length(12).messages({
    'string.base': `Food Id should be a type of 'string'`,
    'string.empty': 'Food Id cannot be an empty field',
    'string.length': `Food Id should have a {#limit} characters.`,
  }),
  name: Joi.string().min(2).messages({
    'string.base': 'Name should be a type of "string"',
    'string.empty': 'Name cannot be an empty field',
    'string.min': `Name should have a minimum length of {#limit}`,
  }),
  foodType: Joi.valid(FoodType.DESSERTS, FoodType.MAIN_COURSES, FoodType.SIDE_DISHES, FoodType.STARTERS).messages({
    'any.only': `Food Type is allowed only, {#valids}`,
  }),
  price: Joi.number().positive().messages({
    'number.base': 'Prise should be a type of "number"',
    'number.positive': 'Prise should be a positive amount',
    'any.required': 'Prise is required',
  }),
}).required();

export default {
  validate: (data: unknown): { error?: ValidationError; value: FoodFilterDTO } => {
    return foodFilterDTOObject.validate(data, { stripUnknown: true, abortEarly: false });
  },
};
