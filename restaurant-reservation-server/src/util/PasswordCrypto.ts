/**
 * @created 26/09/2021 - 09:19
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    PasswordCrypto
 */

import { compare, hash } from 'bcrypt';

export class PasswordCrypto {
  private readonly _saltRounds: number;

  constructor() {
    this._saltRounds = 10;
  }

  public encrypt(password: string): Promise<string> {
    return hash(password, this._saltRounds);
  }

  public compare(password: string, hashPassword: string): Promise<boolean> {
    return compare(password, hashPassword);
  }
}
