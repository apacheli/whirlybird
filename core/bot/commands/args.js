import { botCommand } from "../bot_command.js";

export default botCommand("args", (_bot, _, ctx) => {
  return {
    data: {
      content: `\`\`\`json\n${JSON.stringify(ctx.parsed, null, 2)}\n\`\`\``,
    },
  };
}, {
  description: "Display command arguments. Use `--` to specify a keyword argument.",
  category: "dev",
  parseMode: 1,
  usage: "[...args]",
  dev: false,
});
