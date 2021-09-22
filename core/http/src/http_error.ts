import * as logger from "../../util/src/logger.ts";

/** HTTP exception */
export class HttpError extends Error {
  name = "HTTPError";

  // deno-lint-ignore no-explicit-any
  constructor(public body: any) {
    super();
  }

  get message() {
    if (typeof this.body === "string") {
      return this.body;
    }
    const { code, message } = this.body;
    return logger.highlight(`[${code}] ${message}${this.#formatErrors()}`);
  }

  #formatErrors(errors = this.body.errors, x = "") {
    let str = "";
    for (const k in errors) {
      // deno-lint-ignore no-explicit-any
      str += errors[k]._errors?.map((e: any) => `\n${x}${k}: ${e.message}`) ??
        this.#formatErrors(errors[k], `${x}${k}.`);
    }
    return str;
  }
}
