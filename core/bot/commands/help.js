import { botCommand } from "../bot_command.js";

const _cached = new Map();
let _commands;
const _notFound = { data: JSON.stringify({ content: "command not found" }) };

export default botCommand("help", (bot, _, ctx) => {
  if (ctx.parsed === null) {
    if (_commands !== undefined) {
      return _commands;
    }
    const categories = {};
    for (const command of bot.commands.values()) {
      if (categories[command.options.category] === undefined) {
        categories[command.options.category] = "";
      }
      categories[command.options.category] += `, \`${command.id}\``;
    }
    const fields = [];
    for (const name in categories) {
      fields.push({ name, value: categories[name].slice(2) });
    }
    const embed = {
      title: "Commands",
      color: bot.config.themeColor,
      fields,
      footer: {
        text: `Type ${bot.config.prefix}help [command] for more information.`,
      },
    };
    _commands = { data: JSON.stringify({ embeds: [embed] }) };
    return _commands;
  }
  const cached = _cached.get(ctx.parsed);
  if (cached !== undefined) {
    return cached;
  }
  const command = bot.commands.get(ctx.parsed);
  if (command === undefined) {
    return _notFound;
  }
  let u = `${bot.config.prefix}${command.id}`;
  if (command.options.usage !== null) {
    u += ` ${command.options.usage}`;
  }
  const embed = {
    title: command.id,
    color: bot.config.themeColor,
    description: `\`\`\`\n${u}\n\`\`\`\n${command.options.description}`,
    footer: {
      text: command.options.category,
    },
  };
  const response = { data: JSON.stringify({ embeds: [embed] }) };
  _cached.set(command.id, response);
  return response;
}, {
  description: "Display a list of commands or command details.",
  category: "info",
  parseMode: 2,
  usage: "[...command]",
  dev: false,
});
