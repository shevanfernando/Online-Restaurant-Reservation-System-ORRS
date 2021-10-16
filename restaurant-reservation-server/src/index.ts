/**
 * @created 10/09/2021 - 13:26
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    index
 */

import app from '@src/app';
import config from '@src/config';
import { logger } from '@util/logger';

const startServer = async () => {
  // start listening
  app.listen(config.API_PORT, async () => {
    logger.info(`app started on port ${config.APP_URL}:${config.API_PORT}/`);
  });
};

startServer();
