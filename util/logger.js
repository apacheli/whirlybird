import { blue, bold, cyan, gray, green, magenta, red, yellow } from "./ansi.js";

export const formatDate = (date = new Date()) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  const hour = `${date.getHours()}`.padStart(2, "0");
  const minute = `${date.getMinutes()}`.padStart(2, "0");
  const second = `${date.getSeconds()}`.padStart(2, "0");

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};

export const highlight = (input) =>
  input.replace(
    // deno-lint-ignore no-control-regex
    /('.+?'|".+?"|`.+?`)|(?<!\x1b\[)-?\d+(?:\.\d+)?(?!m)|true|false/g,
    (a, b) => b ? green(b) : yellow(a),
  );

export const log = (level, args) =>
  console.log(
    `${bold(formatDate())} | ${level} |`,
    ...args.map((arg) => typeof arg === "string" ? highlight(arg) : arg),
  );

// deno-fmt-ignore
export const
  debug = (...args) => log(gray("[DBG]"), args),
  error = (...args) => log(red("[ERR]"), args),
  fatal = (...args) => log(magenta("[FTL]"), args),
  info  = (...args) => log(blue("[INF]"), args),
  trace = (...args) => log(cyan("[TRC]"), args),
  warn  = (...args) => log(yellow("[WRN]"), args);
