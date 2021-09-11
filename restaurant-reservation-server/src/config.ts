/**
 * @created 10/09/2021 - 11:36
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    config
 */

import * as dotenv from 'dotenv';

dotenv.config();

export const ENV = process.env.NODE_ENV || 'development';
export const PORT = process.env.APP_PORT || 30000;
