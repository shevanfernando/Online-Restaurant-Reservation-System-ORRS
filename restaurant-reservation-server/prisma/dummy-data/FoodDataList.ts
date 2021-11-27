/**
 * @created 08/10/2021 - 07:56
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    FoodData
 */

import { food_type } from '@prisma/client';

export const FoodDataList = [
  {
    food_type: food_type.SIDE_DISHES,
    victual: {
      create: {
        name: 'French Fries',
        description: 'Lorem ipsum',
        price: 200.0,
      },
    },
  },
  {
    food_type: food_type.SIDE_DISHES,
    victual: {
      create: {
        name: 'Garlic Bread',
        description: 'Lorem ipsum',
        price: 320.0,
      },
    },
  },
  {
    food_type: food_type.MAIN_COURSES,
    victual: {
      create: {
        name: 'Fried Rice',
        description: 'Lorem ipsum',
        price: 360.0,
      },
    },
  },
];
