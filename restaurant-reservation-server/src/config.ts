/**
 * @created 10/09/2021 - 11:36
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    config
 */

import * as dotenv from 'dotenv';

dotenv.config();

export const ENV = process.env.NODE_ENV === undefined ? 'development' : process.env.NODE_ENV;
export const PORT = process.env.APP_PORT === undefined ? 3000 : process.env.APP_PORT;
export const APP_URL = process.env.APP_URL === undefined ? 'http://localhost' : process.env.APP_URL;
export const DATABASE_URL = () => {
  if (ENV === 'development') {
    return process.env.DB_URL;
  }

  return process.env.DB_TEST_URL;
};
export const API_PREFIX = '/api';
export const TOKEN_SECRET = process.env.TOKEN_SECRET === undefined ? 'Pas@wOrd' : process.env.TOKEN_SECRET;
export const TOKEN_EXPIRE_TIME = process.env.TOKEN_EXPIRE_TIME === undefined ? '1h' : process.env.TOKEN_EXPIRE_TIME;
