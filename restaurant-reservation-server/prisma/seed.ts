/**
 * @created 26/09/2021 - 09:13
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    seed.ts
 */
import { PrismaClient } from '@prisma/client';

import config from '../src/config';
import { PasswordCrypto } from '@util/PasswordCrypto';

import { StaffDataList } from './dummy-data/StaffDataList';
import { CustomerDataList } from './dummy-data/CustomerDataList';
import { logger } from '@util/logger';
import sequenceGenerator from '@util/IdSequenceGenerator';
import { FoodDataList } from './dummy-data/FoodDataList';
import { BeverageDataList } from './dummy-data/BeverageDataList';
import { FeedbackDataList } from './dummy-data/FeedbackDataList';
import TableDataList from './dummy-data/TableDataList';

const dummyData = {
  staffDataList: StaffDataList,
  customerDataList: CustomerDataList,
  foodDataList: FoodDataList,
  beverageDataList: BeverageDataList,
  feedbackDataList: FeedbackDataList,
  tableDataList: TableDataList,
};

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
  for (const s of dummyData.staffDataList) {
    if ((await prisma.person.findUnique({ where: { email: s.person.create.email } })) === null) {
      const id = await sequenceGenerator.idGenerator('STF_', 'staff');
      await new PasswordCrypto()
        .encrypt(s.app_user.create.password)
        .then((res) => (s.app_user.create.password = res))
        .catch((err) => logger.error(err));
      const staff = await prisma.staff.create({
        data: {
          id: id,
          ...s,
        },
      });
      logger.info(`Created staff member with id: ${staff.id}`);
    }
  }

  // Add Customers
  for (const c of dummyData.customerDataList) {
    if ((await prisma.person.findUnique({ where: { email: c.person.create.email } })) === null) {
      const id = await sequenceGenerator.idGenerator('CUS_', 'customer');
      await new PasswordCrypto()
        .encrypt(c.app_user.create.password)
        .then((res) => (c.app_user.create.password = res))
        .catch((err) => logger.error(err));
      const customer = await prisma.customer.create({
        data: {
          id: id,
          ...c,
        },
      });
      logger.info(`Created customer with id: ${customer.id}`);
    }
  }

  // Add Foods
  for (const f of dummyData.foodDataList) {
    if ((await prisma.victual.findUnique({ where: { name: f.victual.create.name } })) === null) {
      const id = await sequenceGenerator.idGenerator('FOD_', 'food');

      const food = await prisma.food.create({
        data: {
          id: id,
          ...f,
        },
      });
      logger.info(`Create food with id: ${food.id}`);
    }
  }

  // Add Beverages
  for (const b of dummyData.beverageDataList) {
    if ((await prisma.victual.findUnique({ where: { name: b.victual.create.name } })) === null) {
      const id = await sequenceGenerator.idGenerator('BVG_', 'beverage');

      const beverage = await prisma.beverage.create({
        data: {
          id: id,
          ...b,
        },
      });
      logger.info(`Create beverage with id: ${beverage.id}`);
    }
  }

  // Add Feedbacks
  for (const feed of dummyData.feedbackDataList) {
    if ((await prisma.feedback.findMany()).length < 3) {
      const feedback = await prisma.feedback.create({ data: feed });
      logger.info(`Create feedback with id: ${feedback.id}`);
    }
  }

  // Add Tables
  if ((await prisma.table.findMany()).length === 0) {
    for (const t of dummyData.tableDataList) {
      const id = await sequenceGenerator.idGenerator('TAB_', 'table');

      const table = await prisma.table.create({
        data: { id: id, ...t },
      });

      logger.info(`Create table with id: ${table.id}`);
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
