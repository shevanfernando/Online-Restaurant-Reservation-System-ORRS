/**
 * @created 10/09/2021 - 12:04
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    app
 */

import { ENV } from '@src/config';
import { HttpError } from '@src/lib/HttpError';
import { httpLogger } from '@src/middlewares/http-logger';
import { router } from '@src/router';
import { logger } from '@src/util/logger';
import express, { json, NextFunction, Response } from 'express';

export const app = express();

// use middleware
app.use(json());
app.use(httpLogger);

// use router
app.use(router);

// error handling
app.use((err, req, res, nxt) => {
  if (err instanceof HttpError) {
    res.status(err.status).send(err);
  } else {
    logger.error(err);
    res.status(500).send(ENV === 'development' ? err : 'Internal Server Error');
  }
});
