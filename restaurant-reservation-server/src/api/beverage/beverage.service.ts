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

const filterBeverage = async (
  data: BeverageFilterDTO
): Promise<
  | {
      beverageType: string;
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
  const beverage = await prisma.beverage.findMany({
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
  });

  if (beverage.length !== 0) return beverage;

  let errorFields;

  if (data.beverageId) errorFields = `beverageId = ${data.beverageId}`;

  if (data.name) errorFields = `${(errorFields !== undefined && errorFields + ', ') || ''}name = ${data.name}`;

  if (data.beverageType)
    errorFields = `${(errorFields !== undefined && errorFields + ', ') || ''} beverage type = ${data.beverageType}`;

  if (data.price) errorFields = `${(errorFields !== undefined && errorFields + ', ') || ''}price = ${data.price}`;

  throw new HttpError(404, `Can't find any beverage with {${errorFields}}.`);
};

export default {
  addBeverage,
  filterBeverage,
};
