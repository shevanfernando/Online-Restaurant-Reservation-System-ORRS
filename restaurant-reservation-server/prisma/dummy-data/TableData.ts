/**
 * @created 10/10/2021 - 19:45
 * @project settings.json
 * @author  Shevan
 * @file    TableData
 */

import { TableTypes } from '@prisma/client';

const TableData = [
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

export default TableData;
