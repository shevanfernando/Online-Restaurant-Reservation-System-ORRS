/**
 * @created 23/11/2021
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    booking.dto
 */

import Joi, { ValidationError } from 'joi';

export type BookingDTO = {
  food_list: { id: string; quantity: number }[];
  beverage_list: { id: string; quantity: number }[];
  table_id: string;
  request_date_and_time: string;
  no_of_persons: number;
  booking_date: string;
  booking_start: string;
  booking_end: string;
  customer_id: string;
  reserved_table: string[];
};

export const bookingDTOObject = Joi.object({
  food_list: Joi.array().items({
    id: Joi.string().required().messages({
      'string.base': 'Food Id list should be a type of "string"',
      'string.empty': 'Food Id list cannot be an empty field',
    }),
    quantity: Joi.number().positive().required().messages({
      'number.base': 'Food quantity should be a type of "number"',
      'number.positive': 'Food quantity should be a positive amount',
      'number.invalid': 'Food quantity is invalid',
      'any.required': 'Food quantity is required',
    }),
  }),
  beverage_list: Joi.array().items({
    id: Joi.string().required().messages({
      'string.base': 'Beverage Id list should be a type of "string"',
      'string.empty': 'Beverage Id list cannot be an empty field',
    }),
    quantity: Joi.number().positive().required().messages({
      'number.base': 'Beverage quantity should be a type of "number"',
      'number.positive': 'Beverage quantity should be a positive amount',
      'number.invalid': 'Beverage quantity is invalid',
      'any.required': 'Beverage quantity is required',
    }),
  }),
  table_id: Joi.string().length(12).required().messages({
    'string.base': 'Table Id should be a type of "string"',
    'string.empty': 'Table Id cannot be an empty field',
    'string.length': `Table Id should have a {#limit} characters.`,
    'any.required': 'Table Id is required',
  }),
  request_date_and_time: Joi.string().required().messages({
    'string.base': 'Request Date And Time should be a type of "string"',
    'string.empty': 'Request Date And Time cannot be an empty field',
    'any.required': 'Request Date And Time is required',
  }),
  no_of_persons: Joi.number().positive().invalid(1).required().messages({
    'number.base': 'Number of persons should be a type of "number"',
    'number.positive': 'Number of persons should be a positive amount',
    'number.invalid': 'Number of persons is invalid',
    'any.required': 'Number of persons is required',
  }),
  booking_date: Joi.string().required().messages({
    'string.base': 'Booking Date should be a type of "string"',
    'string.empty': 'Booking Date cannot be an empty field',
    'any.required': 'Booking Date is required',
  }),
  booking_start: Joi.string().required().messages({
    'string.base': 'Start Time should be a type of "string"',
    'string.empty': 'Start Time cannot be an empty field',
    'any.required': 'Start Time is required',
  }),
  booking_end: Joi.string().required().messages({
    'string.base': 'End Time should be a type of "string"',
    'string.empty': 'End Time cannot be an empty field',
    'any.required': 'End Time is required',
  }),
  customer_id: Joi.string().required().messages({
    'string.base': 'Customer Id should be a type of "string"',
    'string.empty': 'Customer Id cannot be an empty field',
    'any.required': 'Customer Id is required',
  }),
  reserved_table: Joi.array()
    .items(
      Joi.string().messages({
        'string.base': 'Reserved Tables should be a type of "string"',
        'string.empty': 'Reserved Tables cannot be an empty field',
      })
    )
    .required()
    .messages({ 'any.required': 'Reserved Tables is required' }),
});

export default {
  validate: (data: unknown): { error?: ValidationError; value: BookingDTO } => {
    return bookingDTOObject.validate(data, { abortEarly: false, stripUnknown: true });
  },
};
