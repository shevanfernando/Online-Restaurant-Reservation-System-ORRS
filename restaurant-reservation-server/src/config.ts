/**
 * @created 10/09/2021 - 11:36
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    config
 */

import * as dotenv from 'dotenv';

dotenv.config();

export const ENV = process.env.NODE_ENV || 'development';
export const PORT = process.env.APP_PORT || 3000;
export const APP_URL = process.env.APP_URL || 'http://localhost';
export const DATABASE_URL = () => {
  if (ENV === 'development') {
    return process.env.DB_URL;
  }

  return process.env.DB_TEST_URL;
};
export const API_PREFIX = '/api';
export const TOKEN_SECRET = process.env.TOKEN_SECRET || 'Pas@wOrd';
export const TOKEN_EXPIRE_TIME = process.env.TOKEN_EXPIRE_TIME || '1h';
