# whirlybird

[![](https://github.com/apacheli/whirlybird/actions/workflows/ci.yaml/badge.svg?branch=dev)](https://github.com/apacheli/whirlybird/actions/workflows/ci.yaml)
[![](https://canary.discord.com/api/guilds/812458966357377067/widget.png)](https://discord.gg/GtyB7gmx9Q)

### About

_whirlybird_ ([/wɜrlibɜrd/](http://ipa-reader.xyz/?text=w%C9%9Crlib%C9%9Crd)) is
a collection of low-level [Deno](https://deno.land/) modules for interacting
with the [Discord API](https://discord.dev/). whirlybird aims to provide
end-users as much control over their application as possible while also doing
the complicated bits to improve the overall development experience.

### Core Modules

Learn more about the purpose of the individual core modules in their respective
READMEs.

- [`core/cache`](core/cache)
- [`core/gateway`](core/gateway)
- [`core/http`](core/http)
- [`core/interactions`](core/interactions)
- [`core/types`](core/types)
- [`core/util`](core/util)
- [`core/voice`](core/voice)

### Getting Started

You will need Deno v1.22.0 at minimum.
[See the Deno installation instructions](https://deno.land/#installation) to
learn how you can install Deno on your operating system.

Run an [example](examples/example.ts) directly from the CLI:

```sh
$ BOT_TOKEN=""\
  deno run --allow-env --allow-net\
  https://github.com/apacheli/whirlybird/raw/dev/examples/example.ts
```

Using whirlybird to power a Discord bot:

```ts
import { CacheClient } from "https://github.com/apacheli/whirlybird/raw/dev/core/cache/mod.ts";
import {
  GatewayClient,
  type HandleEvent,
} from "https://github.com/apacheli/whirlybird/raw/dev/core/gateway/mod.ts";
import { HttpClient } from "https://github.com/apacheli/whirlybird/raw/dev/core/http/mod.ts";
import {
  GatewayEvents,
  GatewayIntents,
} from "https://github.com/apacheli/whirlybird/raw/dev/core/types/mod.ts";

let token = Deno.env.get("BOT_TOKEN") ?? prompt("bot token:");
if (!token) {
  throw new Error("Missing token");
}
token = `Bot ${token}`;

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
  identifyData: {
    intents: GatewayIntents.GuildMessages,
  },
  ready: () => console.log("Hello, World!"),
});

await gateway.connect();
```

To run the program:

```sh
$ BOT_TOKEN="" deno run --allow-env --allow-net main.ts
```

More examples are available [here](examples).

### Resources

- [Deno](https://deno.land/) ([Manual](https://deno.land/manual))
- [Discord Developer Documentation](https://discord.dev/)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [TypeScript](https://www.typescriptlang.org/)
- [whirlybird Manual](https://apacheli.github.io/whirlybird/)

Feel free to come hang out with us at the
[whirlybird Discord server](https://discord.gg/GtyB7gmx9Q). (All participating
members must abide by the terms of the
[whirlybird code of conduct](CODE_OF_CONDUCT.md).)
