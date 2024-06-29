import pkg from "../../../package.json" with { type: "json" };
import { field } from "../../util/embed.js";
import { botCommand } from "../bot_command.js";

export default botCommand("info", (bot) => {
  let latency = 0;
  for (const shard of bot.gateway.shards.values()) {
    latency += shard.latency;
  }
  let events = 0;
  for (const event in bot.receivedEvents) {
    events += bot.receivedEvents[event];
  }
  const embed = {
    title: "Information",
    color: bot.config.themeColor,
    fields: [
      field("Bun", `\`${process.versions.bun}\``, true),
      field("Version", `\`${bot.config.version ?? "latest"}\``, true),
      field("whirlybird", `\`${pkg.version}\``, true),
      field("Events", events, true),
      field("Guilds", bot.cache.guilds.size, true),
      field("Users", bot.cache.users.size, true),
      field("Latency", `${latency / bot.gateway.shards.size} ms`, true),
      field("Memory", `${Math.floor(process.memoryUsage().heapUsed / 1_048_576 * 100) / 100} MiB`, true),
      field("Uptime", `${Math.floor(process.uptime() / 60 * 100) / 100} m`, true),
    ],
  };
  return { data: { embeds: [embed] } };
}, {
  description: "Display information about the bot.",
  category: "info",
  parseMode: 0,
  usage: null,
  dev: false,
});
