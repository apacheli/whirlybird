import { botCommand } from "../bot_command.js";

const _ping = { data: '{"content":":ping_pong: Pong!"}' };

export default botCommand("ping", () => _ping, {
  description: "Ping the bot.",
  category: "dev",
  parseMode: 0,
  usage: null,
  dev: false,
});
