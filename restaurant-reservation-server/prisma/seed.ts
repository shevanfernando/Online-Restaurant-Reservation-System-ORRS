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
import { FoodDataList } from './dummy-data/FoodDataList';
import { BeverageDataList } from './dummy-data/BeverageDataList';
import { logger } from '@util/logger';
import sequenceGenerator from '@util/IdSequenceGenerator';
import { FeedbackDataList } from './dummy-data/FeedbackDataList';

const dummyData = {
  staffDataList: StaffDataList,
  customerDataList: CustomerDataList,
  foodDataList: FoodDataList,
  beverageDataList: BeverageDataList,
  feedbackDataList: FeedbackDataList,
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
  for (const c of dummyData.customerDataList) {
    if ((await prisma.person.findUnique({ where: { email: c.Person.create.email } })) === null) {
      const id = await sequenceGenerator.idGenerator('CUS_', 'customer');
      await new PasswordCrypto()
        .encrypt(c.User.create.password)
        .then((res) => (c.User.create.password = res))
        .catch((err) => logger.error(err));
      const customer = await prisma.customer.create({
        data: {
          customerId: id,
          Person: c.Person,
          User: c.User,
        },
      });
      logger.info(`Created customer with id: ${customer.customerId}`);
    }
  }

  // Add Foods
  for (const f of dummyData.foodDataList) {
    if ((await prisma.victual.findUnique({ where: { name: f.Victual.create.name } })) === null) {
      const id = await sequenceGenerator.idGenerator('FOD_', 'food');

      const food = await prisma.food.create({
        data: {
          foodId: id,
          foodType: f.foodType,
          Victual: f.Victual,
        },
      });
      logger.info(`Create food with id: ${food.foodId}`);
    }
  }

  // Add Beverages
  for (const b of dummyData.beverageDataList) {
    if ((await prisma.victual.findUnique({ where: { name: b.Victual.create.name } })) === null) {
      const id = await sequenceGenerator.idGenerator('BVG_', 'beverage');

      const beverage = await prisma.beverage.create({
        data: {
          beverageId: id,
          beverageType: b.beverageType,
          Victual: b.Victual,
        },
      });
      logger.info(`Create beverage with id: ${beverage.beverageId}`);
    }
  }

  // Add Feedbacks
  for (const feed of dummyData.feedbackDataList) {
    if ((await prisma.feedback.findMany()).length < 3) {
      const feedback = await prisma.feedback.create({ data: feed });
      logger.info(`Create feedback with id: ${feedback.feedbackId}`);
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
