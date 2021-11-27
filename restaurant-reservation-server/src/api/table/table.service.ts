/**
 * @created 22/11/2021
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    table.service
 */

import { number_of_seats, Prisma, PrismaClient, reserved_table, table, table_status, table_type } from '@prisma/client';
import { TableDTO } from '@api/table/dto/table.dto';
import sequenceGenerator from '@util/IdSequenceGenerator';
import { HttpError } from '@lib/HttpError';
import { FilterTableDTO } from '@api/table/dto/filter-table.dto';
import { FreeTableDTO } from '@api/table/dto/free-table.dto';
import moment from 'moment';

const prisma = new PrismaClient();

const addTable = async (data: TableDTO): Promise<Prisma.Prisma__tableClient<table>> => {
  const id = await sequenceGenerator.idGenerator('TAB_', 'table');
  return prisma.table.create({ data: { id: id, ...data } });
};

const freeTable = async (data: FreeTableDTO): Promise<Prisma.Prisma__tableClient<table> | void> => {
  return prisma.table
    .update({
      where: { id: data.id },
      data: { status: table_status.AVAILABLE },
    })
    .catch((err) => {
      const { code } = err;
      if (code === 'P2025') {
        throw new HttpError(404, "Can't find any Table using this table id.");
      }
      return err;
    });
};

const filterTable = async (data: FilterTableDTO): Promise<any | string> => {
  const table = await prisma.table.findMany({
    where: {
      number_of_seats: data.number_of_seats,
      table_type: table_type.RESERVATION,
    },
  });

  let dat: reserved_table[] = [];
  for (const t of table) {
    dat = await prisma.reserved_table.findMany({
      where: { table_id: t.id },
      take: 1,
      orderBy: { booking_id: 'desc' },
    });
  }

  const result_table: { id: string; number_of_seats: number_of_seats }[] = await prisma.table.findMany({
    where: {
      number_of_seats: data.number_of_seats,
      table_type: table_type.RESERVATION,
      status: table_status.AVAILABLE,
    },
    select: { id: true, number_of_seats: true },
  });

  for (const d of dat) {
    const b = await prisma.booking.findMany({
      where: { id: d.booking_id },
      select: {
        reserved_table: { select: { table: { select: { id: true, number_of_seats: true } } } },
        booking_date: true,
        booking_end: true,
        booking_start: true,
      },
    });
    if (moment(b[0].booking_date, 'DD-MM-YYYY').isSame(moment(data.booking_date, 'DD-MM-YYYY').toDate())) {
      if (
        moment(b[0].booking_start, 'HH:mm A').isBefore(moment(data.booking_end, 'HH:mm A')) ||
        moment(b[0].booking_end, 'HH:mm A').isAfter(moment(data.booking_start, 'HH:mm A'))
      ) {
        b[0].reserved_table.forEach((res) => result_table.push(res.table));
      } else b[0].reserved_table.forEach((res) => result_table.push(res.table));
    }
  }
  if (result_table.length !== 0) return result_table;
  return 'All tables are reserved, sorry for the inconvenience. Please try again in a few minutes.';
};
export default { addTable, freeTable, filterTable };
