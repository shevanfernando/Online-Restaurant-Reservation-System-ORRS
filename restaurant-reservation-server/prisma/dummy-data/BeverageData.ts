/**
 * @created 11/10/2021 - 12:11
 * @project settings.json
 * @author  Shevan
 * @file    BeverageData
 */

import { BeverageType } from '@prisma/client';

const BeverageData = [
  {
    beverageType: BeverageType.REFRESHING,
    Victual: {
      create: {
        name: 'Watermelon Lemonade',
        description: 'Lorem ipsum',
        price: 250.0,
      },
    },
  },
  {
    beverageType: BeverageType.REFRESHING,
    Victual: {
      create: {
        name: 'Frosted Lemonade',
        description: 'Lorem ipsum',
        price: 250.0,
      },
    },
  },
  {
    beverageType: BeverageType.NOURISHING,
    Victual: {
      create: {
        name: 'Milkshake',
        description: 'Lorem ipsum',
        price: 300.0,
      },
    },
  },
  {
    beverageType: BeverageType.NOURISHING,
    Victual: {
      create: {
        name: 'Banana Smoothie',
        description: 'Lorem ipsum',
        price: 260.0,
      },
    },
  },
  {
    beverageType: BeverageType.NOURISHING,
    Victual: {
      create: {
        name: 'Mango Lassi',
        description: 'Lorem ipsum',
        price: 380.0,
      },
    },
  },
];

export default BeverageData;
