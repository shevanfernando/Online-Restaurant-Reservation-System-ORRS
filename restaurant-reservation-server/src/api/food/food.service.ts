/**
 * @created 19/10/2021
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    food.service
 */
import { Food, Prisma, PrismaClient } from '@prisma/client';
import { FoodDTO } from '@api/food/dto/food.dto';
import sequenceGenerator from '@util/IdSequenceGenerator';
import { HttpError } from '@lib/HttpError';
import titleCaseConverter from '@util/title-case-converter';
import { FoodFilterDTO } from '@api/food/dto/food-filter.dto';
import { FoodUpdateDTO } from '@api/food/dto/food-update.dto';
import { ItemDeleteDTO } from '@api/shared/dto/item-delete.dto';
import { foodPaginationDTO, paginationFunc } from '@api/shared/dto/pagination.dto';

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

const updateFood = async (data: FoodUpdateDTO): Promise<Prisma.Prisma__FoodClient<Food> | void> => {
  return prisma.food
    .update({
      where: { foodId: data.foodId },
      data: {
        foodType: data.foodType,
        Victual: {
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

const deleteFood = async (data: ItemDeleteDTO): Promise<Prisma.Prisma__FoodClient<Food> | void> => {
  return prisma.food
    .delete({
      where: { foodId: data.id },
    })
    .then((res) => {
      prisma.victual.delete({ where: { victualId: res.victualId } });
    });
};

const filterFoods = async (data: FoodFilterDTO): Promise<foodPaginationDTO | void> => {
  const start = (data.page_no - 1) * data.per_page;
  let food = await prisma.food.findMany({
    skip: start,
    take: data.per_page,
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
    orderBy: [
      {
        victualId: 'asc',
      },
    ],
  });

  if (food.length !== 0) {
    const total = await prisma.food.count({
      where: {
        foodId: data.foodId,
        foodType: data.foodType,
        Victual: {
          name: data.name,
          price: data.price,
        },
      },
    });
    food = food.map((res) => {
      if (res.Victual.imagePath) {
        res.Victual.imagePath = `images/${res.Victual.imagePath}`;
        return res;
      } else return res;
    });
    return {
      pagination: paginationFunc({
        total_rec: total,
        per_page: data.per_page,
        cr_num_data: food.length,
        page_no: data.page_no,
      }),
      data: food,
    };
  }

  let errorFields;

  if (data.foodId) errorFields = `foodId = ${data.foodId}`;

  if (data.name) errorFields = `${(errorFields !== undefined && errorFields + ', ') || ''} name = ${data.name}`;

  if (data.foodType)
    errorFields = `${(errorFields !== undefined && errorFields + ', ') || ''} food type = ${data.foodType}`;

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
