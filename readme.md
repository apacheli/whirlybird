# whirlybird

A JavaScript library for making Discord bots.

## Core

- [`whirlybird/gcache`](core/cache)
- [`whirlybird/gateway`](core/gateway)
- [`whirlybird/interactions`](core/interactions)
- [`whirlybird/rest`](core/rest)
- [`whirlybird/util`](core/util)

## Install

Install using Bun v1.1.15 (recommended):

```sh
$ bun install https://github.com/apacheli/whirlybird
```

Install using Deno:

```js
import * as whirlybird from "https://github.com/apacheli/whirlybird/raw/dev/core/lib.js";
```

Install with Node.js:

```sh
$ npm i https://github.com/apacheli/whirlybird
```

> [!TIP]
> You can install `ws` and `node-fetch` if you use an older version of Node.js.
> This is not recommended.

## Example

```js
import { CacheClient, GatewayClient, IntentFlags, RestClient } from "whirlybird";

const token = `Bot ${process.env.BOT_TOKEN}`;

const cache = new CacheClient();
const rest = new RestClient(token);

const handleEvent = (event, data) => {
  cache.handleEvent(event, data);

  switch (event) {
    case "MESSAGE_CREATE": {
      if (data.content === "!ping") {
        rest.createMessage(data.channel_id, {
          data: {
            content: "Pong!",
          },
        });
      }
      break;
    }
  }
};

const gateway = new GatewayClient(token, {
  handleEvent,
  identify: {
    intents: IntentFlags.GUILD_MESSAGES | IntentFlags.MESSAGE_CONTENT,
  },
  token,
  url: "wss://gateway.discord.gg",
});

gateway.connect();
```
