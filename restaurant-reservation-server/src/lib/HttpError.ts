/**
 * @created 10/09/2021 - 12:40
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    HttpError
 */
export class HttpError extends Error {
  public status: number;
  public message: string;
  public type?: string;

  constructor(status: number, message: string, type: string) {
    super(message);
    this.status = status;
    this.message = message;
    if (this.type) this.type = type;
  }
}
