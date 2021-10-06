/**
 * @created 04/10/2021 - 06:42
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    HttpValidationError
 */

import { HttpError } from './http-error';
import Joi from 'joi';

// @ts-ignore
export class HttpValidationError extends HttpError {
  name: 'ValidationError';
  details: Joi.ValidationErrorItem[];

  constructor({ name = 'ValidationError', details }: { name?: 'ValidationError'; details: Joi.ValidationErrorItem[] }) {
    super(400, name);
    this.name = name;
    this.details = details;
  }
  // @ts-ignore
  toJSON(): { status: number; type?: string; message: string; name: string; details: Joi.ValidationErrorItem[] } {
    return {
      ...super.toJSON(),
      name: this.name,
      details: this.details,
    };
  }
}
