/**
 * @created 19/10/2021
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    food.service
 */

import { food, Prisma, PrismaClient } from '@prisma/client';
import { FoodDTO } from '@api/food/dto/food.dto';
import sequenceGenerator from '@util/IdSequenceGenerator';
import { HttpError } from '@lib/HttpError';
import titleCaseConverter from '@util/title-case-converter';
import { FoodFilterDTO } from '@api/food/dto/food-filter.dto';
import { FoodUpdateDTO } from '@api/food/dto/food-update.dto';
import { ItemDeleteDTO } from '@api/shared/dto/item-delete.dto';
import { foodPaginationDTO } from '@api/shared/dto/pagination.dto';

const prisma = new PrismaClient();

const addFood = async (data: FoodDTO): Promise<Prisma.Prisma__foodClient<food> | void> => {
  const id = await sequenceGenerator.idGenerator('FOD_', 'food');
  return prisma.food
    .create({
      data: {
        id: id,
        food_type: data.food_type,
        victual: {
          create: data.victual,
        },
      },
    })
    .catch((err) => {
      const {
        code,
        meta: { target },
      } = err;

      if (code === 'P2002') {
        throw new HttpError(409, `${titleCaseConverter(target[0])} already exists.`);
      }
    });
};

const updateFood = async (data: FoodUpdateDTO): Promise<Prisma.Prisma__foodClient<food> | void> => {
  return prisma.food
    .update({
      where: { id: data.id },
      data: {
        food_type: data.food_type,
        victual: {
          update: data.victual,
        },
      },
    })
    .catch((err) => {
      const { code } = err;
      if (code === 'P2025') {
        throw new HttpError(404, "Can't find any Food item using this food id.");
      }
      return err;
    });
};

const deleteFood = async (data: ItemDeleteDTO): Promise<Prisma.Prisma__foodClient<food> | void> => {
  return prisma.food
    .delete({
      where: { id: data.id },
    })
    .then((res) => {
      prisma.victual.delete({ where: { id: res.victual_id } });
    });
};

const filterFoods = async (data: FoodFilterDTO): Promise<foodPaginationDTO | void> => {
  const start = (data.page_no - 1) * data.per_page;
  let food = await prisma.food.findMany({
    skip: start,
    take: data.per_page,
    where: {
      id: data.id,
      food_type: data.food_type,
      victual: {
        name: data.name,
        price: data.price,
      },
    },
    select: {
      food_type: true,
      victual_id: true,
      victual: true,
    },
    orderBy: [
      {
        victual_id: 'asc',
      },
    ],
  });

  if (food.length !== 0) {
    await prisma.food.count({
      where: {
        id: data.id,
        food_type: data.food_type,
        victual: {
          name: data.name,
          price: data.price,
        },
      },
    });
    food = food.map((res) => {
      if (res.victual.image_path) {
        res.victual.image_path = `images/${res.victual.image_path}`;
        return res;
      } else return res;
    });

    console.log(food);
  }

  let errorFields;

  if (data.id) errorFields = `foodId = ${data.id}`;

  if (data.name) errorFields = `${(errorFields !== undefined && errorFields + ', ') || ''} name = ${data.name}`;

  if (data.food_type)
    errorFields = `${(errorFields !== undefined && errorFields + ', ') || ''} food type = ${data.food_type}`;

  if (data.price) errorFields = `${(errorFields !== undefined && errorFields + ', ') || ''}price = ${data.price}`;

  throw new HttpError(
    404,
    errorFields === undefined ? "Can't find any matching food." : `Can't find any food with {${errorFields}}.`
  );
};

export default {
  addFood,
  updateFood,
  deleteFood,
  filterFoods,
};
