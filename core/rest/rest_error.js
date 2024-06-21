import { blue, cyan } from "../util/ansi.js";

export class RestError extends Error {
  #body;

  constructor(body) {
    super();

    this.#body = body;
  }

  get message() {
    return `[${cyan(this.#body.code)}] ${this.#body.message}${formatError(this.#body.errors)}`;
  }
}

RestError.prototype.name = "RestError";

export const formatError = (errors, x = "") => {
  let str = "";
  const _errors = errors?._errors;
  if (_errors !== undefined) {
    const len = _errors.length;
    for (let i = 0; i < len; i++) {
      const error = _errors[i];
      str += `\n        - [${cyan(error.code)}] ${highlight(error.message)}`;
    }
    return `\n    ${blue(x)}:${str}`;
  }
  for (const key in errors) {
    str += formatError(errors[key], `${x}.${key}`);
  }
  return str;
};

export const highlight = (str) => str.replace(/".*?"|'.*?'|-?\b\d*\.?\d+?\b/g, cyan);
