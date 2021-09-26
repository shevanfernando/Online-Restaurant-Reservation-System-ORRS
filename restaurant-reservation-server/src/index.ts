/**
 * @created 10/09/2021 - 13:26
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    index
 */

import { app } from '@src/app';
import { logger } from '@src/util/logger';

import { APP_URL, PORT } from './config';

const startServer = async () => {
  // start listening
  app.listen(PORT, async () => {
    logger.info(`app started on port ${APP_URL}:${PORT}/`);
  });
};

startServer();
