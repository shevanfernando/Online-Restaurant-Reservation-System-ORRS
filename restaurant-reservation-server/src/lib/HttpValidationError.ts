/**
 * @created 06/10/2021 - 12:45
 * @project express-ts-startup-project
 * @author  Shevan
 * @file    HttpValidationError
 */

import { HttpError } from './http-error';
import Joi from 'joi';

export class HttpValidationError extends HttpError {
  name: 'ValidationError';
  details: Joi.ValidationErrorItem[];

  constructor({ name = 'ValidationError', details }: { name?: 'ValidationError'; details: Joi.ValidationErrorItem[] }) {
    super(400, name);
    this.name = name;
    this.details = details;
  }

  toJSON(): { status: number; type?: string; message: string; name: string; details: Joi.ValidationErrorItem[] } {
    return {
      ...super.toJSON(),
      name: this.name,
      details: this.details,
    };
  }
}
