# `core/gateway`

The library for Discord's WebSocket API.

### Install

You need Deno 1.38 or higher.

```js
export * from "https://github.com/apacheli/whirlybird/raw/dev/core/gateway/lib.js";
```

### Getting Started

An example:

```js
import { GatewayClient } from "whirlybird/gateway/lib.js";

const handleEvent = (event, data) => {
  // ...
};

const gateway = new GatewayClient({
  handleEvent,
  identifyOptions: {
    intents: 1 << 9 | 1 << 15,
  },
  token: `Bot ${Deno.env.get("BOT_TOKEN")}`,
  url: "wss://gateway.discord.gg",
});

gateway.connect();
```

An example using shards in the main thread:

```js
const gateway = new GatewayClient({
  handleEvent: (event, data) => {/* ... */},
  identifyOptions: {
    intents: 1 << 9 | 1 << 15,
  },
  shardCount: 6,
  token: `Bot ${Deno.env.get("BOT_TOKEN")}`,
  url: "wss://gateway.discord.gg",
});

gateway.connect(0, 4);
```

An example using shards in worker threads:

```js
import { ClusterClient, WorkerGatewayClient } from "whirlybird/gateway/lib.js";

if (self.postMessage) {
  const gateway = new WorkerGatewayClient({
    handleEvent: (event, data) => {/* ... */},
    identifyOptions: {
      intents: 1 << 9 | 1 << 15,
    },
    shardCount: 4,
    token: `Bot ${Deno.env.get("BOT_TOKEN")}`,
    url: "wss://gateway.discord.gg",
    workerShardCount: 2,
  });
  // gateway.connect() is called automatically
} else {
  const cluster = new ClusterClient({
    specifier: import.meta.url,
    workerCount: 2,
  });
  cluster.connect();
}
```
