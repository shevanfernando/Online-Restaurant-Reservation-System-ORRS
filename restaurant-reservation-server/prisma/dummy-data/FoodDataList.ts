/**
 * @created 08/10/2021 - 07:56
 * @project settings.json
 * @author  Shevan
 * @file    FoodData
 */

import { FoodType } from '@prisma/client';

export const FoodDataList = [
  {
    foodType: FoodType.SIDE_DISHES,
    Victual: {
      create: {
        name: 'French Fries',
        description: 'Lorem ipsum',
        price: 200.0,
      },
    },
  },
  {
    foodType: FoodType.SIDE_DISHES,
    Victual: {
      create: {
        name: 'Garlic Bread',
        description: 'Lorem ipsum',
        price: 320.0,
      },
    },
  },
  {
    foodType: FoodType.MAIN_COURSES,
    Victual: {
      create: {
        name: 'Fried Rice',
        description: 'Lorem ipsum',
        price: 360.0,
      },
    },
  },
];
