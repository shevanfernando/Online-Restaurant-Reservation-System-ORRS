/**
 * @created 10/09/2021 - 12:04
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    app
 */

import express, { Application, json, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import router from '@src/router';
import { HttpError } from '@lib/http-error';
import { logger } from '@util/logger';
import { httpLogger } from '@middlewares/http-logger';

const app: Application = express();

// use middleware
app.use(json());
app.use(httpLogger);

// allow localhost: 4200
app.use(cors({ origin: ['http://localhost:4200'], credentials: true }));

// use router
app.use(router);

// error handling
app.use((err: HttpError | SyntaxError | Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof HttpError) {
    res.status(err.status).send(err.toJSON());
  } else if ('body' in err) {
    res.status(400).send(err);
  } else {
    logger.error(err);
    res.status(500).send(process.env.NODE_ENV === 'development' ? err : 'Internal Server Error');
  }
});

export default app;
