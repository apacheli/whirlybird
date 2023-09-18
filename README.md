# whirlybird

whirlybird is a JavaScript library for building Discord bots.

### Core

- [`core/cache`](cache)
- [`core/gateway`](gateway)
- [`core/interactions`](interactions)
- [`core/rest`](rest)
- [`core/util`](util)

### Install

Deno [`deps.js`](https://deno.land/manual/examples/manage_dependencies):

```js
export * from "https://github.com/apacheli/whirlybird/raw/dev/lib.js";
```

Deno using [configuration file](https://deno.land/manual/getting_started/configuration_file):

```jsonc
{
  "imports": {
    "whirlybird": "https://github.com/apacheli/whirlybird/raw/dev/lib.js",
    "whirlybird/": "https://github.com/apacheli/whirlybird/raw/dev/"
  }
}
```

See [releases](https://github.com/apacheli/whirlybird/releases) for bundled + minified files.

### Getting Started

An example:

```js
import { CacheClient, closeOnInterrupt, GatewayClient, RestClient } from "whirlybird";

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
    intents: 1 << 9 | 1 << 15,
  },
  token,
  url: "wss://gateway.discord.gg",
});

gateway.connect();

closeOnInterrupt(gateway);
```

Information regarding core modules can be found in their respective READMEs.

### Development

Use `deno lint` and `deno fmt` for code styling.
