/**
 * @created 19/10/2021
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    beverage.service
 */

import { Beverage, Prisma, PrismaClient } from '@prisma/client';
import sequenceGenerator from '@util/IdSequenceGenerator';
import { HttpError } from '@lib/HttpError';
import titleCaseConverter from '@util/title-case-converter';
import { BeverageDTO } from '@api/beverage/beverage.dto';
import { BeverageFilterDTO } from '@api/beverage/beverage-filter.dto';
import { ItemDeleteDTO } from '@api/shared/item-delete.dto';
import { BeverageUpdateDTO } from '@api/beverage/beverage-update.dto';
import { beveragePaginationDTO, paginationFunc } from '@api/shared/pagination.dto';

const prisma = new PrismaClient();

const addBeverage = async (data: BeverageDTO): Promise<Prisma.Prisma__BeverageClient<Beverage> | void> => {
  const id = await sequenceGenerator.idGenerator('BVG_', 'beverage');
  return prisma.beverage
    .create({
      data: {
        beverageId: id,
        beverageType: data.beverageType,
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

const updateBeverage = async (data: BeverageUpdateDTO): Promise<Prisma.Prisma__BeverageClient<Beverage> | void> => {
  return prisma.beverage
    .update({
      where: { beverageId: data.beverageId },
      data: {
        beverageType: data.beverageType,
        Victual: {
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

const deleteBeverage = async (data: ItemDeleteDTO): Promise<Prisma.Prisma__BeverageClient<Beverage> | void> => {
  return prisma.beverage
    .delete({
      where: { beverageId: data.id },
    })
    .then((res) => {
      prisma.victual.delete({ where: { victualId: res.victualId } });
    })
    .catch((err) => {
      const { code } = err;
      if (code === 'P2025') {
        throw new HttpError(404, "Can't find any Beverage item using this beverage id.");
      }
      return err;
    });
};

const filterBeverage = async (data: BeverageFilterDTO): Promise<beveragePaginationDTO | void> => {
  const start = (data.page_no - 1) * data.per_page;
  let beverage = await prisma.beverage.findMany({
    skip: start,
    take: data.per_page,
    where: {
      beverageId: data.beverageId,
      beverageType: data.beverageType,
      Victual: {
        name: data.name,
        price: data.price,
      },
    },
    select: {
      beverageType: true,
      victualId: true,
      Victual: true,
    },
    orderBy: [
      {
        victualId: 'asc',
      },
    ],
  });

  if (beverage.length !== 0) {
    const total = await prisma.beverage.count({
      where: {
        beverageId: data.beverageId,
        beverageType: data.beverageType,
        Victual: {
          name: data.name,
          price: data.price,
        },
      },
    });
    beverage = beverage.map((res) => {
      if (res.Victual.imagePath) {
        res.Victual.imagePath = `images/${res.Victual.imagePath}`;
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

  if (data.beverageId) errorFields = `beverageId = ${data.beverageId}`;

  if (data.name) errorFields = `${(errorFields !== undefined && errorFields + ', ') || ''}name = ${data.name}`;

  if (data.beverageType)
    errorFields = `${(errorFields !== undefined && errorFields + ', ') || ''} beverage type = ${data.beverageType}`;

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
