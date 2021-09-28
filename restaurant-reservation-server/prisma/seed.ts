/**
 * @created 26/09/2021 - 09:13
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    seed.ts
 */
import { PrismaClient } from '@prisma/client';

import { DATABASE_URL } from '../src/config';
import { logger } from '../src/util/logger';
import { PasswordCrypto } from '../src/util/PasswordCrypto';

import { AdminData, CustomerDataList, StaffDataList } from './dummy-data/UserData';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: DATABASE_URL.toString(),
    },
  },
});

async function main() {
  logger.info('Start seeding ...');

  // Add Admin
  if (!(await prisma.person.findUnique({ where: { email: AdminData.Person.create.email } }))) {
    await new PasswordCrypto()
      .encrypt(AdminData.User.create.password)
      .then((res: string) => (AdminData.User.create.password = res))
      .catch((err) => logger.error(err));

    const admin = await prisma.admin.create({ data: AdminData });

    logger.info(`Created admin with id: ${admin.adminId}`);
  }

  // Add Staff Members
  for (const s of StaffDataList) {
    if (!(await prisma.person.findUnique({ where: { email: s.Person.create.email } }))) {
      await new PasswordCrypto()
        .encrypt(s.User.create.password)
        .then((res: string) => (s.User.create.password = res))
        .catch((err) => logger.error(err));
      const staff = await prisma.staff.create({ data: s });
      logger.info(`Created staff member with id: ${staff.staffId}`);
    }
  }

  // Add Customers
  for (const c of CustomerDataList) {
    if (!(await prisma.person.findUnique({ where: { email: c.Person.create.email } }))) {
      await new PasswordCrypto()
        .encrypt(c.User.create.password)
        .then((res: string) => (c.User.create.password = res))
        .catch((err) => logger.error(err));
      const customer = await prisma.customer.create({ data: c });
      logger.info(`Created customer with id: ${customer.customerId}`);
    }
  }

  logger.info('Seeding finished.');
}

main()
  .catch((err) => {
    logger.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
