import { cyan } from "../util/ansi.js";
import { highlight } from "../util/logger.js";

export class HttpError extends Error {
  constructor(body) {
    super(highlight(`[${cyan(body.code)}] ${body.message}${formatErrors(body.errors)}`));
  }
}

HttpError.prototype.name = "HttpError";

export const formatErrors = (errors, x = "") => {
  const e = errors?._errors;
  if (e !== undefined) {
    const s = e.map((a) => `    - [${cyan(a.code)}] ${a.message}`).join("\n");
    return `\n  ${x}:\n${s}`;
  }
  let str = "";
  for (const key in errors) {
    str += formatErrors(errors[key], `${x}.${key}`);
  }
  return str;
};
