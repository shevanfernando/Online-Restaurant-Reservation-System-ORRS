/**
 * @created 22/11/2021
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    filter-table.dto
 */
import Joi, { ValidationError } from 'joi';

export type FilterTableDTO = {
  numberOfSeats: number;
};

export const filterTableDTOObject = Joi.object({
  numberOfSeats: Joi.number().positive().invalid(1).required().messages({
    'number.base': 'Number of seats should be a type of "number"',
    'number.positive': 'Number of seats should be a positive amount',
    'number.invalid': 'Number of seats is invalid',
    'any.required': 'Number of seats is required',
  }),
});

export default {
  validate: (data: unknown): { error?: ValidationError; value: FilterTableDTO } => {
    return filterTableDTOObject.validate(data, { abortEarly: false, stripUnknown: true });
  },
};
