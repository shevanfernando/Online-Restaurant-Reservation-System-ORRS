/**
 * @created 10/10/2021 - 19:45
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    TableDataList
 */

import { TableTypes } from '@prisma/client';

const TableDataList = [
  {
    tableType: TableTypes.RESERVATION,
    numberOfSeats: 2,
  },
  {
    tableType: TableTypes.RESERVATION,
    numberOfSeats: 4,
  },
  {
    tableType: TableTypes.RESERVATION,
    numberOfSeats: 8,
  },
  {
    tableType: TableTypes.RESERVATION,
    numberOfSeats: 12,
  },
];

export default TableDataList;
