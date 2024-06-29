import { botCommand } from "../bot_command.js";

export default botCommand("args", (_bot, _, ctx) => {
  const date = ctx.parsed === null ? Date.now() : new Date(ctx.parsed).getTime();
  return { data: `{"content":"<t:${Math.floor(date / 1000)}>"}` };
}, {
  description: "Display the date.",
  category: "info",
  parseMode: 2,
  usage: "[...date]",
  dev: false,
});
