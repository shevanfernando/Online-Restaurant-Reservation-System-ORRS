/**
 * @created 22/11/2021
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    table.dto
 */
import { number_of_seats, table_status, table_type } from '@prisma/client';
import Joi, { ValidationError } from 'joi';

export type TableDTO = {
  table_type: table_type;
  number_of_seats: number_of_seats;
  status: table_status;
};

export const tableDTOObject = Joi.object({
  table_type: Joi.valid({ table_type }).required().messages({
    'any.only': `Table Type is allowed only, {#valids}`,
    'any.required': 'Table Type is required',
  }),
  number_of_seats: Joi.valid(number_of_seats.TWO, number_of_seats.SIX, number_of_seats.FOUR).required().messages({
    'any.only': `Number of seats is allow only, {#valids}`,
    'any.required': 'Number of seats is required',
  }),
  status: table_status.AVAILABLE,
});

export default {
  validate: (data: unknown): { error?: ValidationError; value: TableDTO } => {
    return tableDTOObject.validate(data, { abortEarly: false, stripUnknown: true });
  },
};
