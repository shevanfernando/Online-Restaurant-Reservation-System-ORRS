/**
 * @created 26/09/2021 - 09:12
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    CustomerData
 */
import { UserType } from '@prisma/client';

const AdminData = {
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
      userType: UserType.ADMIN,
    },
  },
};

const StaffDataList = [
  {
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

export { AdminData, StaffDataList, CustomerDataList };
