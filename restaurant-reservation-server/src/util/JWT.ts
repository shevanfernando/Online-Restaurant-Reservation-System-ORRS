/**
 * @created 26/09/2021 - 16:17
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    JWT
 */

import { ENV, TOKEN_EXPIRE_TIME, TOKEN_SECRET } from '@src/config';
import { sign, verify } from 'jsonwebtoken';

export class JWT {
  private _accessSecretToken: string = TOKEN_SECRET;

  public generateToken(data: any): Promise<string> {
    return new Promise((resolve: string | any, reject: string | any) => {
      sign(
        { data },
        this._accessSecretToken,
        { expiresIn: TOKEN_EXPIRE_TIME },
        (err: Error | null, token: string | undefined) => {
          if (err) {
            return reject(ENV === 'development' ? err : 'Internal Server Error');
          }
          return resolve(token);
        },
      );
    });
  }

  public verifyToken(token: string): Promise<boolean> {
    return new Promise((resolve: string | any, reject: string | any) => {
      verify(token, this._accessSecretToken, (err: Error | null, payload: any) => {
        if (err) {
          const message =
            err.name === 'JsonWebTokenError' ? 'Unauthorized' : ENV === 'development' ? err : 'Internal Server Error';
          return reject(message);
        }
        resolve(payload);
      });
    });
  }
}
