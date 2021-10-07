/**
 * @created 06/10/2021 - 12:40
 * @project express-ts-startup-project
 * @author  Shevan
 * @file    HttpError
 */
export class HttpError extends Error {
  status: number;
  message: string;
  type?: string;

  constructor(status: number, message: string, type?: string) {
    super(message);
    this.status = status;
    this.message = message;
    if (type) this.type = type;
  }

  toJSON(): { status: number; type?: string; message: string } {
    return {
      status: this.status,
      type: this.type,
      message: this.message,
    };
  }
}
