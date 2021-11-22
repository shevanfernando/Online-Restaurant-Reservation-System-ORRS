/**
 * @created 10/10/2021 - 19:45
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    TableDataList
 */

import { TableType } from '@prisma/client';

const TableDataList = [
  {
    tableType: TableType.RESERVATION,
    numberOfSeats: 2,
  },
  {
    tableType: TableType.RESERVATION,
    numberOfSeats: 4,
  },
  {
    tableType: TableType.RESERVATION,
    numberOfSeats: 8,
  },
  {
    tableType: TableType.RESERVATION,
    numberOfSeats: 12,
  },
];

export default TableDataList;
