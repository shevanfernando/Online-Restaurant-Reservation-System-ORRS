/**
 * @created 19/10/2021
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    food.service
 */
import { Food, Prisma, PrismaClient } from '@prisma/client';
import { FoodDTO } from '@api/food/food.dto';
import sequenceGenerator from '@util/IdSequenceGenerator';
import { HttpError } from '@lib/HttpError';
import titleCaseConverter from '@util/title-case-converter';
import { FoodFilterDTO } from '@api/food/food-filter.dto';

const prisma = new PrismaClient();

const addFood = async (data: FoodDTO): Promise<Prisma.Prisma__FoodClient<Food> | void> => {
  const id = await sequenceGenerator.idGenerator('FOD_', 'food');
  return prisma.food
    .create({
      data: {
        foodId: id,
        foodType: data.foodType,
        Victual: {
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

const filterFoods = async (
  data: FoodFilterDTO
): Promise<
  | {
      foodType: string;
      victualId: number;
      Victual: {
        victualId: number;
        name: string;
        description: string;
        price: number;
        imagePath: string | null;
      };
    }[]
  | void
> => {
  const food = await prisma.food.findMany({
    where: {
      foodId: data.foodId,
      foodType: data.foodType,
      Victual: {
        name: data.name,
        price: data.price,
      },
    },
    select: {
      foodType: true,
      victualId: true,
      Victual: true,
    },
  });

  if (food.length !== 0) return food;

  let errorFields;

  if (data.foodId) errorFields = `foodId = ${data.foodId}`;

  if (data.name) errorFields = `${(errorFields !== undefined && errorFields + ', ') || ''}name = ${data.name}`;

  if (data.foodType)
    errorFields = `${(errorFields !== undefined && errorFields + ', ') || ''} food type = ${data.foodType}`;

  if (data.price) errorFields = `${(errorFields !== undefined && errorFields + ', ') || ''}price = ${data.price}`;

  throw new HttpError(404, `Can't find any food with {${errorFields}}.`);
};

export default {
  addFood,
  filterFoods,
};
