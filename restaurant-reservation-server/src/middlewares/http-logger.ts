/**
 * @created 10/09/2021 - 12:26
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    http-logger
 */

import config from '@src/config';
import { logger } from '@util/logger';
import morgan, { StreamOptions } from 'morgan';

const stream: StreamOptions = { write: (msg: string) => logger.http(msg) };

const skip = () => config.ENV !== 'development';

export const httpLogger = morgan(':method :url :status :res[content-length] - :response-time ms', { stream, skip });
