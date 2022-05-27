import {
  blue,
  bold,
  brightBlack,
  cyan,
  green,
  magenta,
  red,
  yellow,
} from "./ansi.ts";

export const formatDate = (date = new Date()) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  const hour = `${date.getHours()}`.padStart(2, "0");
  const minute = `${date.getMinutes()}`.padStart(2, "0");
  const second = `${date.getSeconds()}`.padStart(2, "0");

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};

export const highlight = (input: string) =>
  input.replace(
    /('.+?'|".+?"|`.+?`)|-?\d*\.?\d+|true|false/g,
    (a, b) => b ? green(b) : yellow(a),
  );

export const log = (level: string, ...args: unknown[]) =>
  console.log(
    `${bold(formatDate())} | ${level.padEnd(3)} |`,
    ...args.map((arg) => typeof arg === "string" ? highlight(arg) : arg),
  );

//#region levels
// deno-fmt-ignore
export const
  debug = (...args: unknown[]) => log(brightBlack("DBG"), ...args),
  error = (...args: unknown[]) => log(red("ERR"), ...args),
  fatal = (...args: unknown[]) => log(magenta("FTL"), ...args),
  info  = (...args: unknown[]) => log(blue("INF"), ...args),
  trace = (...args: unknown[]) => log(cyan("TRC"), ...args),
  warn  = (...args: unknown[]) => log(yellow("WRN"), ...args);
//#endregion levels
