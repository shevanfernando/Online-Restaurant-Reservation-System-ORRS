/**
 * @created 22/11/2021
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    table.router
 */

import { NextFunction, Request, Response, Router } from 'express';
import { tableDTOObject } from '@api/table/dto/table.dto';
import { HttpValidationError } from '@lib/HttpValidationError';
import tableService from './table.service';
import filterTableDTOObject from '@api/table/dto/filter-table.dto';
import freeTableDTOObject from '@api/table/dto/free-table.dto';

const router = Router();

router.post('/add', (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = tableDTOObject.validate(req.body);

  if (error) {
    return next(new HttpValidationError(error));
  }

  tableService
    .addTable(value)
    .then((result) => res.status(201).json(result))
    .catch((err) => next(err));
});

router.get('/get', (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = filterTableDTOObject.validate(req.body);

  if (error) {
    return next(new HttpValidationError(error));
  }

  tableService
    .filterTable(value)
    .then((result) => res.status(200).json(result))
    .catch((err) => next(err));
});

router.put('table-free', (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = freeTableDTOObject.validate(req.body);

  if (error) {
    return next(new HttpValidationError(error));
  }

  tableService
    .freeTable(value)
    .then((result) => res.status(200).json(result))
    .catch((err) => next(err));
});

export default router;
