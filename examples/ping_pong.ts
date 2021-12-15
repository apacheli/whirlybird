import { GatewayClient } from "../core/gateway/mod.ts";
import type { HandleEvent } from "../core/gateway/mod.ts";
import { HttpClient } from "../core/http/mod.ts";
import { GatewayEvents, GatewayIntents } from "../core/types/mod.ts";

const token = `Bot ${Deno.env.get("BOT_TOKEN")}`;

const http = new HttpClient(token);

const handleEvent: HandleEvent = (payload) => {
  switch (payload.t) {
    case GatewayEvents.MessageCreate: {
      if (payload.d.content === "!ping") {
        http.createMessage(payload.d.channel_id, {
          content: "pong!",
        });
      }
      break;
    }
  }
};

const { url, shards } = await http.getGatewayBot();

const gateway = new GatewayClient(token, {
  allShardsReady: () => console.log("Hello, World!"),
  handleEvent,
  intents: GatewayIntents.GuildMessages,
  url: `${url}?v=9`,
});

await gateway.connect({
  shards,
});
