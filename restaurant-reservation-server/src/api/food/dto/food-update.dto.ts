/**
 * @created 17/11/2021
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    food-update.dto
 */

import Joi, { ValidationError } from 'joi';
import { FoodType } from '@prisma/client';
import { VictualDTO, victualDTOObject } from '@api/shared/victual/dto/victual.dto';

export type FoodUpdateDTO = {
  foodId: string;
  foodType: FoodType;
  victual: VictualDTO;
};

export const foodUpdateDTOObject = Joi.object({
  foodId: Joi.string().length(12).required().messages({
    'string.base': 'Food Id should be a type of "string"',
    'string.empty': 'Food Id cannot be an empty field',
    'string.length': `Food Id should have a {#limit} characters.`,
    'any.required': 'Food Id is required',
  }),
  foodType: Joi.valid(FoodType.DESSERTS, FoodType.MAIN_COURSES, FoodType.SIDE_DISHES, FoodType.STARTERS)
    .required()
    .messages({
      'any.only': `Food Type is allowed only, {#valids}`,
      'any.required': 'Food Type is required',
    }),
  victual: victualDTOObject,
}).required();

export default {
  validate: (data: unknown): { error?: ValidationError; value: FoodUpdateDTO } => {
    return foodUpdateDTOObject.validate(data, { stripUnknown: true, abortEarly: false });
  },
};
