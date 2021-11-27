/**
 * @created 11/10/2021 - 13:08
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    food.dto
 */

import Joi, { ValidationError } from 'joi';
import { food_type } from '@prisma/client';
import { VictualDTO, victualDTOObject } from '@api/shared/victual/dto/victual.dto';

export type FoodDTO = {
  food_type: food_type;
  victual: VictualDTO;
};

export const foodDTOObject = Joi.object({
  food_type: Joi.valid(food_type.SIDE_DISHES, food_type.MAIN_COURSES, food_type.DESSERTS, food_type.STARTERS)
    .required()
    .messages({
      'any.only': `Food Type is allowed only, {#valids}`,
      'any.required': 'Food Type is required',
    }),
  victual: victualDTOObject,
}).required();

export default {
  validate: (data: unknown): { error?: ValidationError; value: FoodDTO } => {
    return foodDTOObject.validate(data, { stripUnknown: true, abortEarly: false });
  },
};
