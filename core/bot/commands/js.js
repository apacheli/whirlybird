import * as whirlybird from "../../lib.js";
import { botCommand } from "../bot_command.js";

const _inspect = { depth: 0 };

export default botCommand("js", async (bot, message, ctx) => {
  let _result;
  try {
    _result = await eval(ctx.parsed);
  } catch (error) {
    _result = error;
  }
  return {
    files: [new File([Bun.inspect(_result, _inspect)], `${Date.now()}.js`)],
  };
}, {
  description: "Run JavaScript code. Developer only.",
  category: "dev",
  parseMode: 2,
  usage: "[...code]",
  dev: true,
});
