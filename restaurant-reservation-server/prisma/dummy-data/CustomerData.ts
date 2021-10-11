/**
 * @created 26/09/2021 - 09:12
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    CustomerData
 */
import { UserType } from '@prisma/client';

const CustomerDataList = [
  {
    Person: {
      create: {
        firstName: 'Shevan',
        lastName: 'Fernando',
        email: 'w.k.b.s.t.fernando@gmail.com',
        phoneNumber: '0123456789',
        nic: '128975931V',
      },
    },
    User: {
      create: {
        username: 'shevan',
        password: '12345',
        userType: UserType.CUSTOMER,
      },
    },
  },
  {
    Person: {
      create: {
        firstName: 'Hirushan',
        lastName: 'Fernando',
        email: 'hirushan@gmail.com',
        phoneNumber: '1234567890',
        nic: '994814965V',
      },
    },
    User: {
      create: {
        username: 'hirushan',
        password: '12345',
        userType: UserType.CUSTOMER,
      },
    },
  },
  {
    Person: {
      create: {
        firstName: 'Bimsara',
        lastName: 'De Silva',
        email: 'bimasara@gmail.com',
        phoneNumber: '1239677890',
        nic: '974814965V',
      },
    },
    User: {
      create: {
        username: 'bimasara',
        password: '12345',
        userType: UserType.CUSTOMER,
      },
    },
  },
];

export default CustomerDataList;
