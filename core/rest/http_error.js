import { cyan } from "../util/ansi.js";
import { highlight } from "../util/logger.js";

/** An error received over HTTP. */
export class HttpError extends Error {
  body;

  constructor(body) {
    super();

    this.body = body;
  }

  get message() {
    const list = this.body.errors ? this.#formatErrors() : "";
    return highlight(`[${this.body.code}] ${this.body.message}${list}`);
  }

  #formatErrors(errors = this.body.errors, x = "") {
    const e = errors?._errors;
    if (e) {
      const s = e.map((a) => `    - [${cyan(a.code)}] ${a.message}`).join("\n");
      return `\n  ${x}:\n${s}`;
    }
    let str = "";
    for (const key in errors) {
      str += this.#formatErrors(errors[key], `${x}.${key}`);
    }
    return str;
  }
}

HttpError.prototype.name = "HttpError";
