import { botCommand } from "../bot_command.js";

export default botCommand("events", (bot) => {
  let str = "";
  for (const key in bot.receivedEvents) {
    str += `${key}: ${bot.receivedEvents[key]}\n`;
  }
  return { data: { content: `\`\`\`yaml\n${str}\n\`\`\`` } };
}, {
  description: "Display the events received.",
  category: "dev",
  parseMode: 0,
  usage: null,
  dev: false,
});
