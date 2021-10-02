import type { DataErrorCodes } from "../../types/src/topics/opcodes_and_status_codes.ts";
import * as logger from "../../util/src/logger.ts";

/** Response body error */
export interface DiscordApiError {
  code: DataErrorCodes;
  message: string;
  errors: Record<
    string,
    & { [k: string]: DiscordApiError["errors"][string] }
    & { _errors: DiscordApiErrorChunk[] }
  >;
}

export interface DiscordApiErrorChunk {
  code: string;
  message: string;
}

/** An error that was encountered over HTTP */
export class HttpError extends Error {
  constructor(public response: Response, public body: DiscordApiError) {
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
