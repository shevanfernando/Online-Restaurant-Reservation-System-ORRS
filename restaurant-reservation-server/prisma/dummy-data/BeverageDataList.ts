/**
 * @created 11/10/2021 - 12:11
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    BeverageData
 */

import { beverage_type } from '@prisma/client';

export const BeverageDataList = [
  {
    beverage_type: beverage_type.REFRESHING,
    victual: {
      create: {
        name: 'Watermelon Lemonade',
        description: 'Lorem ipsum',
        price: 250.0,
      },
    },
  },
  {
    beverage_type: beverage_type.REFRESHING,
    victual: {
      create: {
        name: 'Frosted Lemonadede',
        description: 'Lorem ipsumum',
        price: 25.0,
      },
    },
  },
  {
    beverage_type: beverage_type.NOURISHING,
    victual: {
      create: {
        name: 'Milkshake',
        description: 'Lorem ipsum',
        price: 300.0,
      },
    },
  },
  {
    beverage_type: beverage_type.NOURISHING,
    victual: {
      create: {
        name: 'Banana Smoothie',
        description: 'Lorem ipsum',
        price: 260.0,
      },
    },
  },
  {
    beverage_type: beverage_type.NOURISHING,
    victual: {
      create: {
        name: 'Mango Lassi',
        description: 'Lorem ipsum',
        price: 380.0,
      },
    },
  },
];
