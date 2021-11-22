/**
 * @created 22/11/2021
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    table.dto
 */
import { TableType } from '@prisma/client';
import Joi, { ValidationError } from 'joi';

export type TableDTO = {
  tableType: TableType;
  numberOfSeats: number;
};

export const tableDTOObject = Joi.object({
  tabletype: Joi.valid({ TableType }).required().messages({
    'any.only': `Table Type is allowed only, {#valids}`,
    'any.required': 'Table Type is required',
  }),
  numberOfSeats: Joi.number().invalid(1).positive().required().messages({
    'number.base': 'Number of seats should be a type of "number"',
    'number.positive': 'Number of seats should be a positive amount',
    'number.invalid': 'Number of seats is invalid',
    'any.required': 'Number of seats is required',
  }),
});

export default {
  validate: (data: unknown): { error?: ValidationError; value: TableDTO } => {
    return tableDTOObject.validate(data, { abortEarly: false, stripUnknown: true });
  },
};
