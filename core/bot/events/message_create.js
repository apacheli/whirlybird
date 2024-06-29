import { parse } from "../../util/args.js";
import { log } from "../../util/log.js";

export default async (bot, message) => {
  if (
    message.author.bot ||
    message.content.slice(0, bot.config.prefix.length) !== bot.config.prefix
  ) {
    return;
  }
  const content = message.content.slice(bot.config.prefix.length);
  const index = content.indexOf(" ");
  const name = index === -1 ? content : content.slice(0, index);
  const command = bot.commands.get(name.toLowerCase());
  if (command === undefined) {
    log("ERR", `${name}: command not found`);
    return;
  }
  if (command.options.dev && message.author.id !== bot.config.developerId) {
    log("ERR", `${name}: executor is not developer`);
    return;
  }
  const ctx = {
    command,
    parsed: null,
  };
  if (index !== -1) {
    switch (command.options.parseMode) {
      case 1: {
        ctx.parsed = parse(content.slice(index + 1));
        break;
      }

      case 2: {
        ctx.parsed = content.slice(index + 1);
        break;
      }
    }
  }
  try {
    const response = await command.handler(bot, message, ctx);
    if (response !== undefined) {
      bot.rest.createMessage(message.channel_id, response);
    }
  } catch (error) {
    log("ERR", `${command.id}: execution error:`);
    console.error(error);
  }
};
