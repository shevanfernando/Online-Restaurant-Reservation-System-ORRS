/**
 * @created 11/10/2021 - 12:33
 * @project settings.json
 * @author  Shevan
 * @file    StaffData
 */

import { StaffType, UserType } from '@prisma/client';

const StaffDataList = [
  {
    staffType: StaffType.ADMIN,
    Person: {
      create: {
        firstName: 'Admin',
        lastName: 'Admin',
        email: 'admin@gmail.com',
        phoneNumber: '0112456789',
        nic: '138975931V',
      },
    },
    User: {
      create: {
        username: 'admin',
        password: 'admin',
        userType: UserType.STAFF,
      },
    },
  },
  {
    staffType: StaffType.CHEF,
    Person: {
      create: {
        firstName: 'Aron',
        lastName: 'Udayanga',
        email: 'aronudayanga@gmail.com',
        phoneNumber: '0113456789',
        nic: '958972931V',
      },
    },
    User: {
      create: {
        username: 'staff1',
        password: '12345',
        userType: UserType.STAFF,
      },
    },
  },
  {
    staffType: StaffType.WAITER,
    Person: {
      create: {
        firstName: 'Shehan',
        lastName: 'Perera',
        email: 'shehan@gmail.com',
        phoneNumber: '0123456189',
        nic: '898971231V',
      },
    },
    User: {
      create: {
        username: 'staff2',
        password: '12345',
        userType: UserType.STAFF,
      },
    },
  },
  {
    staffType: StaffType.RECEPTIONIST,
    Person: {
      create: {
        firstName: 'Nuwangi',
        lastName: 'Samarakone',
        email: 'samarakone.nuwangi@gmail.com',
        phoneNumber: '0713456789',
        nic: '988975935V',
      },
    },
    User: {
      create: {
        username: 'staff3',
        password: '12345',
        userType: UserType.STAFF,
      },
    },
  },
];

export default StaffDataList;
