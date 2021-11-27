/**
 * @created 10/10/2021 - 19:45
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    TableDataList
 */

import { number_of_seats, table_status, table_type } from '@prisma/client';

const TableDataList = [
  {
    table_type: table_type.RESERVATION,
    number_of_seats: number_of_seats.TWO,
    status: table_status.AVAILABLE,
  },
  {
    table_type: table_type.RESERVATION,
    number_of_seats: number_of_seats.TWO,
    status: table_status.AVAILABLE,
  },
  {
    table_type: table_type.RESERVATION,
    number_of_seats: number_of_seats.TWO,
    status: table_status.AVAILABLE,
  },
  {
    table_type: table_type.RESERVATION,
    number_of_seats: number_of_seats.TWO,
    status: table_status.AVAILABLE,
  },
];

export default TableDataList;
