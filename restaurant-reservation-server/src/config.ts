/**
 * @created 10/09/2021 - 11:36
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    config
 */

import * as dotenv from 'dotenv';

dotenv.config();

let DATABASE_URL;

switch (process.env.NODE_ENV) {
  case 'production': {
    // initialize your variables in production env
    break;
  }
  case 'test': {
    DATABASE_URL = process.env.DB_TEST_URL;
    break;
  }
  default: {
    DATABASE_URL = process.env.DB_URL;
  }
}

const API_PREFIX = '/api';
const API_PORT = process.env.APP_PORT || 3000;
const APP_URL = process.env.APP_URL || 'http://localhost';
const ENV = process.env.NODE_ENV || 'development';
const TOKEN_SECRET = process.env.TOKEN_SECRET || 'Pas@wOrd';
const TOKEN_EXPIRE_TIME = process.env.TOKEN_EXPIRE_TIME || '1h';

export default {
  DATABASE_URL,
  API_PREFIX,
  API_PORT,
  APP_URL,
  ENV,
  TOKEN_SECRET,
  TOKEN_EXPIRE_TIME,
};
