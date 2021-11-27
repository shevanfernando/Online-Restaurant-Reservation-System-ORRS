/**
 * @created 23/11/2021
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    booking.service
 */

import { booking, PrismaClient, PrismaPromise, table_status } from '@prisma/client';
import sequenceGenerator from '@util/IdSequenceGenerator';
import { BookingDTO } from '@api/booking/dto/booking.dto';
import moment from 'moment';

const prisma = new PrismaClient();

const createNewBooking = async (data: BookingDTO): Promise<any> => {
  const booking_id = await sequenceGenerator.idGenerator('BOK_', 'booking');
  const order_id = await sequenceGenerator.idGenerator('ORD_', 'order');

  const reserved_table = data.reserved_table.map((res: string) => {
    return {
      table: {
        connect: {
          id: res,
        },
      },
    };
  });

  const beverage = data.beverage_list.map((res: { id: string; quantity: number }) => {
    return { beverage_id: res.id, quantity: res.quantity };
  });

  const food = data.food_list.map((res: { id: string; quantity: number }) => {
    return { food_id: res.id, quantity: res.quantity };
  });

  return prisma.order
    .create({
      data: {
        id: order_id,
        table: {
          connect: { id: data.table_id },
        },
        booking: {
          create: {
            id: booking_id,
            booked_date: new Date().toLocaleDateString(),
            booking_date: moment(data.booking_date, 'DD-MM-YYYY').format('DD-MM-YYYY'),
            booking_end: moment(data.booking_end, 'HH:mm A').format('HH:mm A'),
            booking_start: moment(data.booking_start, 'HH:mm A').format('HH:mm A'),
            customer: {
              connect: { id: data.customer_id },
            },
            reserved_table: {
              create: reserved_table,
            },
          },
        },
        request_date_and_time: new Date().toISOString(),
        order_item: {
          create: [
            {
              food_order_item: { create: food },
              beverage_order_item: { create: beverage },
            },
          ],
        },
      },
      include: {
        booking: { include: { reserved_table: true } },
        order_item: { include: { food_order_item: true, beverage_order_item: true } },
      },
    })
    .then(async () => {
      for (const table_id of data.reserved_table) {
        await prisma.table.update({
          where: { id: table_id },
          data: {
            status: table_status.RESERVED,
          },
        });
      }
    })
    .catch((err) => console.log(err));
};

const getBookingData = async (): Promise<PrismaPromise<Array<booking>> | void> => {
  return prisma.booking.findMany();
};

export default { createNewBooking, getBookingData };
