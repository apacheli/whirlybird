# whirlybird

[![](https://github.com/apacheli/whirlybird/actions/workflows/ci.yaml/badge.svg?branch=dev)](https://github.com/apacheli/whirlybird/actions/workflows/ci.yaml)
[![](https://canary.discord.com/api/guilds/812458966357377067/widget.png)](https://discord.gg/GtyB7gmx9Q)

### About

Whirlybird is a collection of low-level [Deno](https://deno.land/) modules for
interacting with the [Discord API](https://discord.dev/). Whirlybird aims to
provide end-users as much control over their application as possible while also
doing the complicated bits to improve the overall development experience.

### Getting Started

Run an [example](examples/ping_pong.ts) directly from the CLI:

```sh
$ BOT_TOKEN=""\
  deno run --allow-env --allow-net\
  https://github.com/apacheli/whirlybird/raw/dev/examples/ping_pong.ts
```

More examples are available [here](examples).

Using Whirlybird to power a Discord bot:

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
  intents: GatewayIntents.GuildMessages,
  ready: () => console.log("Hello, World!"),
  url: "wss://gateway.discord.gg?v=9",
});

await gateway.connect();
```

To run the program:

```sh
$ BOT_TOKEN="" deno run --allow-env --allow-net main.ts
```

A more in-depth explanation for the core modules is available in their
respective READMEs.

### Core Modules

- [`core/cache`](core/cache)
- [`core/gateway`](core/gateway)
- [`core/http`](core/http)
- [`core/interactions`](core/interactions)
- [`core/types`](core/types)
- [`core/util`](core/util)

### Resources

- [Deno](https://deno.land/) ([Manual](https://deno.land/manual))
- [Discord Developer Documentation](https://discord.dev/)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [TypeScript](https://www.typescriptlang.org/)
- [Whirlybird Wiki](https://github.com/apacheli/whirlybird/wiki)

Feel free to come hang out with us at the
[Whirlybird Discord server](https://discord.gg/GtyB7gmx9Q)! (All participating
members must abide by the terms of the
[Whirlybird code of conduct](CODE_OF_CONDUCT.md).)
