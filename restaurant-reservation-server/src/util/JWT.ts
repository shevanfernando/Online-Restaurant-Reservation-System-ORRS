/**
 * @created 06/10/2021 - 13:40
 * @project express-ts-startup-project
 * @author  Shevan
 * @file    JWT
 */

import config from '@src/config';
import { sign, verify } from 'jsonwebtoken';

export class JWT {
  private _accessSecretToken: string = config.TOKEN_SECRET;

  public generateToken(data: string | any): Promise<string> {
    return new Promise((resolve: string | any, reject: string | any) => {
      sign(
        { data },
        this._accessSecretToken,
        { expiresIn: config.TOKEN_EXPIRE_TIME, algorithm: 'HS256' },
        (err: Error | null, token: string | undefined) => {
          if (err !== null) {
            return reject(config.ENV === 'development' ? err : 'Internal Server Error');
          }
          return resolve(token);
        }
      );
    });
  }

  public verifyToken(token?: string): Promise<any> {
    return new Promise((resolve: string | any, reject: string | any) => {
      if (token) {
        verify(token, this._accessSecretToken, (err: Error | null, payload: any) => {
          if (err) {
            const message =
              err.name === 'JsonWebTokenError'
                ? 'Unauthorized'
                : config.ENV === 'development'
                ? err
                : 'Internal Server Error';
            return reject(message);
          }
          resolve(payload);
        });
      }
      return reject('Unauthorized');
    });
  }
}
