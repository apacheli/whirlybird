import { blue, brBlack, cyan, green, magenta, red, yellow } from "./ansi.js";

// deno-fmt-ignore
const levels = {
  DBG:   green("[DBG]"),
  ERR:     red("[ERR]"),
  FTL: magenta("[FTL]"),
  INF:    blue("[INF]"),
  TRC:    cyan("[TRC]"),
  WRN:  yellow("[WRN]"),
};

export const log = (l, m) => console.log(`${brBlack(new Date().toISOString())} | ${levels[l]} | ${m}`);
