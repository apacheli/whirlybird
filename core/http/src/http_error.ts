import * as logger from "../../util/src/logger.ts";

export interface ErrorMessage {
  code: number;
  errors?:
    | { [K: string]: ErrorMessage["errors"] }
    | { _errors: { code: string; message: string }[] };
  message: string;
}

export class HttpError extends Error {
  constructor(public response: Response, public body: ErrorMessage) {
    super();
  }

  get message() {
    const list = this.body.errors ? this.#formatErrors() : "";
    return logger.highlight(`[${this.body.code}] ${this.body.message}${list}`);
  }

  #formatErrors(errors = this.body.errors, x = "") {
    if (errors?._errors instanceof Array) {
      return errors._errors.reduce((a, b) => `${a}\n${x}: ${b.message}`, "");
    }
    let str = "";
    for (const key in errors) {
      const e = errors[key as keyof typeof errors] as typeof errors;
      str += this.#formatErrors(e, `${x}.${key}`);
    }
    return str;
  }

  static {
    this.prototype.name = "HttpError";
  }
}
