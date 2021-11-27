/**
 * @created 26/09/2021 - 09:12
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    CustomerData
 */

import { user_type } from '@prisma/client';

export const CustomerDataList = [
  {
    person: {
      create: {
        first_name: 'Shevan',
        last_name: 'Fernando',
        email: 'w.k.b.s.t.fernando@gmail.com',
        phone_number: '0123456789',
        nic: '128975931V',
      },
    },
    app_user: {
      create: {
        username: 'shevan',
        password: '12345',
        user_type: user_type.CUSTOMER,
      },
    },
  },
  {
    person: {
      create: {
        first_name: 'Hirushan',
        last_name: 'Fernando',
        email: 'hirushan@gmail.com',
        phone_number: '1234567890',
        nic: '994814965V',
      },
    },
    app_user: {
      create: {
        username: 'hirushan',
        password: '12345',
        user_type: user_type.CUSTOMER,
      },
    },
  },
  {
    person: {
      create: {
        first_name: 'Bimsara',
        last_name: 'De Silva',
        email: 'bimasara@gmail.com',
        phone_number: '1239677890',
        nic: '974814965V',
      },
    },
    app_user: {
      create: {
        username: 'bimasara',
        password: '12345',
        user_type: user_type.CUSTOMER,
      },
    },
  },
];
