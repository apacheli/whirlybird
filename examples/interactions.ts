import { handleRequestEvent } from "../core/interactions/mod.ts";
import type { Handler } from "../core/interactions/mod.ts";
import { InteractionCallbackType } from "../core/types/mod.ts";

const publicKey = Deno.env.get("PUBLIC_KEY") ?? prompt("public key:");
if (!publicKey) {
  throw new Error("Missing public key");
}

const handler: Handler = async (callback, interaction) => {
  if (interaction.data?.name === "ping") {
    await callback(InteractionCallbackType.ChannelMessageWithSource, {
      content: "pong",
    });
  }
};

const serve = async (conn: Deno.Conn) => {
  for await (const event of Deno.serveHttp(conn)) {
    handleRequestEvent(publicKey, event, handler);
  }
};

for await (const conn of Deno.listen({ port: 1337 })) {
  serve(conn);
}
