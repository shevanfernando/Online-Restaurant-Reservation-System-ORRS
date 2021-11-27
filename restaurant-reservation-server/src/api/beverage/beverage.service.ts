/**
 * @created 19/10/2021
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    beverage.service
 */

import { beverage, Prisma, PrismaClient } from '@prisma/client';
import sequenceGenerator from '@util/IdSequenceGenerator';
import { HttpError } from '@lib/HttpError';
import titleCaseConverter from '@util/title-case-converter';
import { BeverageDTO } from '@api/beverage/dto/beverage.dto';
import { BeverageFilterDTO } from '@api/beverage/dto/beverage-filter.dto';
import { ItemDeleteDTO } from '@api/shared/dto/item-delete.dto';
import { BeverageUpdateDTO } from '@api/beverage/dto/beverage-update.dto';
import { paginationFunc } from '@api/shared/dto/pagination.dto';

const prisma = new PrismaClient();

const addBeverage = async (data: BeverageDTO): Promise<Prisma.Prisma__beverageClient<beverage> | void> => {
  const id = await sequenceGenerator.idGenerator('BVG_', 'beverage');
  return prisma.beverage
    .create({
      data: {
        id: id,
        beverage_type: data.beverage_type,
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

const updateBeverage = async (data: BeverageUpdateDTO): Promise<Prisma.Prisma__beverageClient<beverage> | void> => {
  return prisma.beverage
    .update({
      where: { id: data.id },
      data: {
        beverage_type: data.beverage_type,
        victual: {
          update: data.victual,
        },
      },
    })
    .catch((err) => {
      const { code } = err;
      if (code === 'P2025') {
        throw new HttpError(404, "Can't find any Beverage item using this beverage id.");
      }
      return err;
    });
};

const deleteBeverage = async (data: ItemDeleteDTO): Promise<Prisma.Prisma__beverageClient<beverage> | void> => {
  return prisma.beverage
    .delete({
      where: { id: data.id },
    })
    .then((res) => {
      prisma.victual.delete({ where: { id: res.victual_id } });
    })
    .catch((err) => {
      const { code } = err;
      if (code == 'P2025') {
        throw new HttpError(404, "Can't find any Beverage item using this beverage id.");
      }
      return err;
    });
};

const filterBeverage = async (data: BeverageFilterDTO): Promise<any | void> => {
  const start = (data.page_no - 1) * data.per_page;
  let beverage = await prisma.beverage.findMany({
    skip: start,
    take: data.per_page,
    where: {
      id: data.id,
      beverage_type: data.beverage_type,
      victual: {
        name: data.name,
        price: data.price,
      },
    },
    select: {
      beverage_type: true,
      victual_id: true,
      victual: true,
    },
    orderBy: [
      {
        victual_id: 'asc',
      },
    ],
  });

  if (beverage.length !== 0) {
    const total = await prisma.beverage.count({
      where: {
        id: data.id,
        beverage_type: data.beverage_type,
        victual: {
          name: data.name,
          price: data.price,
        },
      },
    });
    beverage = beverage.map((res) => {
      if (res.victual.image_path) {
        res.victual.image_path = `images/${res.victual.image_path}`;
        return res;
      } else return res;
    });
    return {
      pagination: paginationFunc({
        total_rec: total,
        per_page: data.per_page,
        cr_num_data: beverage.length,
        page_no: data.page_no,
      }),
      data: beverage,
    };
  }

  let errorFields;

  if (data.id) errorFields = `beverageId = ${data.id}`;

  if (data.name) errorFields = `${(errorFields !== undefined && errorFields + ', ') || ''} name = ${data.name}`;

  if (data.beverage_type)
    errorFields = `${(errorFields !== undefined && errorFields + ', ') || ''} beverage type = ${data.beverage_type}`;

  if (data.price) errorFields = `${(errorFields !== undefined && errorFields + ', ') || ''}price = ${data.price}`;

  throw new HttpError(
    404,
    errorFields === undefined ? "Can't find any matching beverage." : `Can't find any beverage with {${errorFields}}.`
  );
};

export default {
  addBeverage,
  filterBeverage,
  updateBeverage,
  deleteBeverage,
};
