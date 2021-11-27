/**
 * @created 11/10/2021 - 12:33
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    StaffData
 */

import { staff_type, user_type } from '@prisma/client';

export const StaffDataList = [
  {
    staff_type: staff_type.ADMIN,
    person: {
      create: {
        first_name: 'Admin',
        last_name: 'Admin',
        email: 'admin@gmail.com',
        phone_number: '0112456789',
        nic: '138975931V',
      },
    },
    app_user: {
      create: {
        username: 'admin',
        password: 'admin',
        user_type: user_type.STAFF,
      },
    },
  },
  {
    staff_type: staff_type.CHEF,
    person: {
      create: {
        first_name: 'Aron',
        last_name: 'Udayanga',
        email: 'aronudayanga@gmail.com',
        phone_number: '0113456789',
        nic: '958972931V',
      },
    },
    app_user: {
      create: {
        username: 'staff1',
        password: '12345',
        user_type: user_type.STAFF,
      },
    },
  },
  {
    staff_type: staff_type.WAITER,
    person: {
      create: {
        first_name: 'Shehan',
        last_name: 'Perera',
        email: 'shehan@gmail.com',
        phone_number: '0123456189',
        nic: '898971231V',
      },
    },
    app_user: {
      create: {
        username: 'staff2',
        password: '12345',
        user_type: user_type.STAFF,
      },
    },
  },
  {
    staff_type: staff_type.RECEPTIONIST,
    person: {
      create: {
        first_name: 'Nuwangi',
        last_name: 'Samarakone',
        email: 'samarakone.nuwangi@gmail.com',
        phone_number: '0713456789',
        nic: '988975935V',
      },
    },
    app_user: {
      create: {
        username: 'staff3',
        password: '12345',
        user_type: user_type.STAFF,
      },
    },
  },
];
