/**
 * @created 11/10/2021 - 13:08
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    food.dto
 */

import Joi, { ValidationError } from 'joi';
import { FoodType } from '@prisma/client';
import { VictualDTO, victualDTOObject } from '@api/shared/victual.dto';

export type FoodDTO = {
  foodType: FoodType;
  victual: VictualDTO;
};

export const foodDTOObject = Joi.object({
  foodType: Joi.valid(FoodType.DESSERTS, FoodType.MAIN_COURSES, FoodType.SIDE_DISHES, FoodType.STARTERS)
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
