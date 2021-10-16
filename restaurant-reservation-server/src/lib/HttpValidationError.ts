/**
 * @created 06/10/2021 - 12:45
 * @project express-ts-startup-project
 * @author  Shevan
 * @file    HttpValidationError
 */

import { HttpError } from './HttpError';
import { ValidationError, ValidationErrorItem } from 'joi';

export class HttpValidationError extends HttpError {
  name: 'ValidationError';
  details: { field?: string; message: string }[];

  constructor({ name = 'ValidationError', details }: { name?: 'ValidationError'; details: ValidationErrorItem[] }) {
    super(400, name);
    this.name = name;
    this.details = details.map((e: ValidationErrorItem) => {
      return e.context?.key
        ? {
            field: e.context?.key,
            message: e.message,
          }
        : { message: e.message };
    });
  }

  toJSON(): {
    status: number;
    type?: string;
    message: string;
    name: string;
    details: { field?: string; message: string }[];
  } {
    return {
      ...super.toJSON(),
      name: this.name,
      details: this.details,
    };
  }
}
