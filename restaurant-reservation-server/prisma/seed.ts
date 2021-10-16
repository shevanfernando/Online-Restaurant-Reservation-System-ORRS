/**
 * @created 26/09/2021 - 09:13
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    seed.ts
 */
import { PrismaClient } from '@prisma/client';

import config from '../src/config';
import { PasswordCrypto } from '@util/PasswordCrypto';

import userData from './dummy-data/UserData';
import { logger } from '@util/logger';
import sequenceGenerator from '@util/IdSequenceGenerator';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: config.DATABASE_URL,
    },
  },
});

async function main() {
  logger.info('Start seeding...');

  // Add Staff Members
  for (const s of userData.StaffDataList) {
    if ((await prisma.person.findUnique({ where: { email: s.Person.create.email } })) === null) {
      const id = await sequenceGenerator.idGenerator('STF_', 'staff');
      await new PasswordCrypto()
        .encrypt(s.User.create.password)
        .then((res) => (s.User.create.password = res))
        .catch((err) => logger.error(err));
      const staff = await prisma.staff.create({
        data: {
          staffId: id,
          staffType: s.staffType,
          Person: s.Person,
          User: s.User,
        },
      });
      logger.info(`Created staff member with id: ${staff.staffId}`);
    }
  }

  // Add Customers
  for (const c of userData.CustomerDataList) {
    if ((await prisma.person.findUnique({ where: { email: c.Person.create.email } })) === null) {
      const id = await sequenceGenerator.idGenerator('CUS_', 'customer');
      await new PasswordCrypto()
        .encrypt(c.User.create.password)
        .then((res) => (c.User.create.password = res))
        .catch((err) => logger.error(err));
      const customer = await prisma.customer.create({ data: { customerId: id, Person: c.Person, User: c.User } });
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
