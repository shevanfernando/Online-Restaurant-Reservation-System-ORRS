/**
 * @created 22/11/2021
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    filter-table.dto
 */

import Joi, { ValidationError } from 'joi';
import { number_of_seats } from '@prisma/client';

export type FilterTableDTO = {
  number_of_seats: number_of_seats;
  booking_date: string;
  booking_start: string;
  booking_end: string;
};

export const filterTableDTOObject = Joi.object({
  number_of_seats: Joi.valid(number_of_seats.TWO, number_of_seats.SIX, number_of_seats.FOUR).messages({
    'any.only': `Number of seats is allow only, {#valids}`,
    'any.required': 'Number of seats is required',
  }),
  booking_date: Joi.string().required().messages({ 'any.required': 'Booking Date is required' }),
  booking_start: Joi.string().required().messages({ 'any.required': 'Booking Start Time is required' }),
  booking_end: Joi.string().required().messages({ 'any.required': 'Booking End Time is required' }),
});

export default {
  validate: (data: unknown): { error?: ValidationError; value: FilterTableDTO } => {
    return filterTableDTOObject.validate(data, { abortEarly: false, stripUnknown: true });
  },
};
