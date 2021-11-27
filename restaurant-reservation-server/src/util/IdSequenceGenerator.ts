/**
 * @created 08/10/2021 - 11:07
 * @project settings.json
 * @author  Shevan
 * @file    IdSequenceGenerator
 */
import { PrismaClient } from '@prisma/client';

const leadingZeros = (number: number): string => {
  return String(number).padStart(8, '0');
};

const idGenerator = async (stringLiterals: string, tableName: string): Promise<string> => {
  const prisma = new PrismaClient();
  let result: any[] = [];
  let num = 0;
  switch (tableName) {
    case 'customer': {
      result = await prisma.customer.findMany({ take: 1, orderBy: { id: 'desc' } });
      if (result.length !== 0) num = Number(result[0].id.split(stringLiterals)[1]) + 1;
      break;
    }
    case 'staff': {
      result = await prisma.staff.findMany({ take: 1, orderBy: { id: 'desc' } });
      if (result.length !== 0) num = Number(result[0].id.split(stringLiterals)[1]) + 1;
      break;
    }
    case 'food': {
      result = await prisma.food.findMany({ take: 1, orderBy: { id: 'desc' } });
      if (result.length !== 0) num = Number(result[0].id.split(stringLiterals)[1]) + 1;
      break;
    }
    case 'beverage': {
      result = await prisma.beverage.findMany({ take: 1, orderBy: { id: 'desc' } });
      if (result.length !== 0) num = Number(result[0].id.split(stringLiterals)[1]) + 1;
      break;
    }
    case 'order': {
      result = await prisma.order.findMany({ take: 1, orderBy: { id: 'desc' } });
      if (result.length !== 0) num = Number(result[0].id.split(stringLiterals)[1]) + 1;
      break;
    }
    case 'table': {
      result = await prisma.table.findMany({ take: 1, orderBy: { id: 'desc' } });
      if (result.length !== 0) num = Number(result[0].id.split(stringLiterals)[1]) + 1;
      break;
    }
    case 'booking': {
      result = await prisma.booking.findMany({ take: 1, orderBy: { id: 'desc' } });
      if (result.length !== 0) num = Number(result[0].id.split(stringLiterals)[1]) + 1;
      break;
    }
  }
  if (result.length === 0) {
    return stringLiterals + leadingZeros(1001);
  } else {
    return stringLiterals + leadingZeros(num);
  }
};

export default { idGenerator, leadingZeros };
