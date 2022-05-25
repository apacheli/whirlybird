# `whirlybird-gateway`

[![](https://github.com/apacheli/whirlybird/actions/workflows/ci.yaml/badge.svg?branch=dev)](https://github.com/apacheli/whirlybird/actions/workflows/ci.yaml)
[![](https://canary.discord.com/api/guilds/812458966357377067/widget.png)](https://discord.gg/GtyB7gmx9Q)

### About

A low-level implementation for interacting with the Discord gateway. This allows
you to receive events (such as someone creating and deleting messages) in
real-time.

### Getting Started

```ts
import { GatewayClient } from "https://github.com/apacheli/whirlybird/raw/dev/core/gateway/mod.ts";
import { GatewayIntents } from "https://github.com/apacheli/whirlybird/raw/dev/core/types/mod.ts";

const token = `Bot ${Deno.env.get("BOT_TOKEN")}`;

const gateway = new GatewayClient(token, {
  handleEvent: (payload) => {
    console.log(`Got an event: ${payload.t}`);
  },
  identifyData: {
    intents: GatewayIntents.GuildMessages,
  },
});

await gateway.connect();
```

### Sharding

Although whirlybird does support sharding, the current implementation is very
bare-bones. whirlybird will support clusters and make integrating with
[web workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)
easier sometime in the future.

Connect 4 shards to the Discord gateway:

```ts
await gateway.connect({
  shards: 4,
});
```

Connect 4 shards with identifiers ranging from 0-3 to the Discord gateway.
whirlybird will automatically tell Discord that 4 shards are to connecting:

```ts
await gateway.connect({
  firstShardId: 0,
  lastShardId: 4,
});
```

Connect 4 shards with identifiers ranging from 0-3 to the Discord gateway, but
tell Discord that 6 shards are connecting:

```ts
await gateway.connect({
  firstShardId: 0,
  lastShardId: 4,
  shards: 6,
});
```

### Documentation

The generated documentation is available
[here](https://doc.deno.land/https://github.com/apacheli/whirlybird/raw/dev/core/gateway/mod.ts).
