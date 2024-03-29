import { CacheClient, closeOnInterrupt, GatewayClient, IntentFlags, RestClient } from "../core/lib.js";

const developerId = Deno.env.get("DEVELOPER_ID");
const token = `Bot ${Deno.env.get("BOT_TOKEN")}`;

const cache = new CacheClient();
const rest = new RestClient(token);

const handleEvent = async (event, data) => {
  cache.handleEvent(event, data);

  switch (event) {
    case "MESSAGE_CREATE": {
      if (data.author.id !== developerId || !data.content.startsWith("===js ")) {
        return;
      }
      const x = data.content.substring(6);
      let result;
      try {
        result = await eval(x);
      } catch (e) {
        result = e;
      }
      await rest.createMessage(data.channel_id, {
        body: {
          allowed_mentions: { parse: [] },
          message_reference: { message_id: data.id },
        },
        files: [
          new File([Deno.inspect(result, { depth: 0, colors: true })], `${Date.now()}.ansi`),
        ],
      });
      break;
    }
  }
};

const gateway = new GatewayClient({
  handleEvent,
  identifyOptions: {
    intents: IntentFlags.GuildMessages | IntentFlags.MessageContent,
  },
  token,
  url: "wss://gateway.discord.gg",
});

gateway.connect();

closeOnInterrupt(gateway);
