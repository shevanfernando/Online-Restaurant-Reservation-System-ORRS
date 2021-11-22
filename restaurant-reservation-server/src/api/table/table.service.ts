/**
 * @created 22/11/2021
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    table.service
 */
import { Prisma, PrismaClient, PrismaPromise, Table } from '@prisma/client';
import { TableDTO } from '@api/table/table.dto';
import sequenceGenerator from '@util/IdSequenceGenerator';
import { HttpError } from '@lib/HttpError';
import { FilterTableDTO } from '@api/table/filter-table.dto';
import { FreeTableDTO } from '@api/table/free-table.dto';

const prisma = new PrismaClient();

const addTable = async (data: TableDTO): Promise<Prisma.Prisma__TableClient<Table>> => {
  const id = await sequenceGenerator.idGenerator('TAB_', 'table');
  return prisma.table.create({ data: { tableId: id, tableType: data.tableType, numberOfSeats: data.numberOfSeats } });
};

const freeTable = async (data: FreeTableDTO): Promise<Prisma.Prisma__TableClient<Table> | void> => {
  return prisma.table
    .update({
      where: { tableId: data.tableId },
      data: { orderId: null, bookingId: null },
    })
    .catch((err) => {
      const { code } = err;
      if (code === 'P2025') {
        throw new HttpError(404, "Can't find any Table using this table id.");
      }
      return err;
    });
};

const filterTable = async (data: FilterTableDTO): Promise<PrismaPromise<Array<Table>> | string> => {
  const table = await prisma.table
    .findMany({
      where: {
        orderId: null,
        bookingId: null,
        numberOfSeats: data.numberOfSeats,
      },
    })
    .catch((err) => {
      const { code } = err;
      if (code === 'P2025') {
        throw new HttpError(404, "Can't find any Table using this table id.");
      }
      return err;
    });

  if (table.length !== 0) return table;
  else return 'All tables are reserved, sorry for the inconvenience. Please try again in a few minutes.';
};
export default { addTable, freeTable, filterTable };
