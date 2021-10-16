/**
 * @created 06/10/2021 - 17:00
 * @project express-ts-startup-project
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
