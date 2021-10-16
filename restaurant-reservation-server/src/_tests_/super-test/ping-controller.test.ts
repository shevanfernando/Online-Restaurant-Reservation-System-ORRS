/**
 * @created 06/10/2021 - 13:20
 * @project express-ts-startup-project
 * @author  Shevan
 * @file    ping-controller.test
 */

import config from '@src/config';
import request from 'supertest';
import app from '@src/app';

// describe('Test Ping Controller', () => {
//   it('Request /pin should return Pong!', async () => {
//     const result = await request(app).get(`${config.API_PREFIX}/ping`).send();
//     expect(result.status).toBe(200);
//     expect(result.body.data).toBe('Pong!');
//   });
// });
