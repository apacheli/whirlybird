# whirlybird

whirlybird is a JavaScript library for building Discord bots.

### Core

- [`core/cache`](core/cache)
- [`core/gateway`](core/gateway)
- [`core/interactions`](core/interactions)
- [`core/rest`](core/rest)
- [`core/util`](core/util)

### Install

Deno [`deps.js`](https://deno.land/manual/examples/manage_dependencies):

```js
export * from "https://github.com/apacheli/whirlybird/raw/dev/core/lib.js";
```

Deno using [configuration file](https://deno.land/manual/getting_started/configuration_file):

```jsonc
{
  "imports": {
    "whirlybird": "https://github.com/apacheli/whirlybird/raw/core/dev/lib.js",
    "whirlybird/": "https://github.com/apacheli/whirlybird/raw/dev/core/"
  }
}
```

See [releases](https://github.com/apacheli/whirlybird/releases) for bundled + minified files.

### Getting Started

An example:

```js
import { CacheClient, closeOnInterrupt, GatewayClient, Intents, RestClient } from "whirlybird";

const token = `Bot ${Deno.env.get("BOT_TOKEN")}`;

const cache = new CacheClient();
const rest = new RestClient(token);

const handleEvent = async (event, data) => {
  cache.handleEvent(event, data);

  switch (event) {
    case "MESSAGE_CREATE": {
      if (data.content === "!ping") {
        await rest.createMessage(data.channel_id, {
          body: {
            content: "Hello, World!",
          },
        });
      }
    }
  }
};

const gateway = new GatewayClient({
  handleEvent,
  identifyOptions: {
    intents: Intents.GuildMessages | Intents.MessageContent,
  },
  token,
  url: "wss://gateway.discord.gg",
});

gateway.connect();

closeOnInterrupt(gateway);
```

Information regarding core modules can be found in [their respective READMEs](core).

### Development

use `$ deno task ci` before committing a change.
