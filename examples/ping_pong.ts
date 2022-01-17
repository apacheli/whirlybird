import { CacheClient } from "../core/cache/mod.ts";
import { GatewayClient, type HandleEvent } from "../core/gateway/mod.ts";
import { HttpClient } from "../core/http/mod.ts";
import { GatewayEvents, GatewayIntents } from "../core/types/mod.ts";

const token = `Bot ${Deno.env.get("BOT_TOKEN")}`;

const cache = new CacheClient();
const http = new HttpClient(token);

const handleEvent: HandleEvent = async (payload) => {
  cache.update(payload);

  switch (payload.t) {
    case GatewayEvents.MessageCreate: {
      if (payload.d.content === "!ping") {
        await http.createMessage(payload.d.channel_id, {
          content: "pong!",
        });
      }
      break;
    }
  }
};

const gateway = new GatewayClient(token, {
  handleEvent,
  intents: GatewayIntents.GuildMessages,
  ready: () => console.log("Hello, World!"),
  url: "wss://gateway.discord.gg?v=9",
});

await gateway.connect();
