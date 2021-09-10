/**
 * @created 10/09/2021 - 12:40
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    HttpError
 */
export class HttpError extends Error {
  private _status: number;
  private _message: string;
  private readonly _type?: string;

  constructor(status: number, message: string, type: string) {
    super(message);
    this._status = status;
    this._message = message;
    if (this._type) this._type = type;
  }
}
