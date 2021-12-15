import { handleRequestEvent } from "../core/interactions/mod.ts";
import type { Handler } from "../core/interactions/mod.ts";
import { InteractionCallbackType } from "../core/types/mod.ts";

const publicKey = Deno.env.get("PUBLIC_KEY")!;

const handler: Handler = (callback, interaction) => {
  if (interaction.data?.name === "ping") {
    callback(InteractionCallbackType.ChannelMessageWithSource, {
      content: "pong",
    });
  }
};

for await (const conn of Deno.listen({ port: 1337 })) {
  (async () => {
    for await (const event of Deno.serveHttp(conn)) {
      handleRequestEvent(publicKey, event, handler);
    }
  })();
}
