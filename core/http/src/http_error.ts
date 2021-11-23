import type { DataErrorCodes } from "../../types/src/topics/opcodes_and_status_codes.ts";
import * as logger from "../../util/src/logger.ts";

export interface ErrorMessage {
  code: DataErrorCodes;
  message: string;
  errors:
    | { [k: string]: ErrorMessage["errors"] }
    | { _errors: { code: string; message: string }[] };
}

export class HttpError extends Error {
  constructor(public response: Response, public body: ErrorMessage) {
    super();
  }

  get message() {
    const { code, message } = this.body;
    return logger.highlight(`[${code}] ${message}${this.#formatErrors()}`);
  }

  #formatErrors(errors = this.body.errors, x = "") {
    if (errors._errors instanceof Array) {
      return errors._errors.reduce((a, b) => `${a}\n${x}: ${b.message}`, "");
    }
    let str = "";
    for (const key in errors) {
      // I love TypeScript
      const e = errors[key as keyof typeof errors];
      str += this.#formatErrors(e as typeof errors, `${x}.${key}`);
    }
    return str;
  }

  static {
    this.prototype.name = "HttpError";
  }
}
