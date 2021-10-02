import type { DataErrorCodes } from "../../types/src/topics/opcodes_and_status_codes.ts";
import * as logger from "../../util/src/logger.ts";

interface HttpErrorBody {
  code: DataErrorCodes;
  message: string;
  errors: Record<
    string,
    & { [k: string]: HttpErrorBody["errors"][string] }
    & { _errors: { code: string; message: string }[] }
  >;
}

/** HTTP exception */
export class HttpError extends Error {
  constructor(public response: Response, public body: HttpErrorBody) {
    super();
  }

  get message() {
    const { code, message } = this.body;
    return logger.highlight(`[${code}] ${message}${this.#formatErrors()}`);
  }

  #formatErrors(errors = this.body.errors, x = "") {
    let str = "";
    for (const k in errors) {
      str += errors[k]._errors?.map((e) => `\n${x}${k}: ${e.message}`) ??
        this.#formatErrors(errors[k], `${x}${k}.`);
    }
    return str;
  }

  static {
    this.prototype.name = "HttpError";
  }
}
