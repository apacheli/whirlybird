# `core/rest`

The library for Discord's HTTP API.

### Install

You need Deno 1.38 or higher.

```js
export * from "https://github.com/apacheli/whirlybird/raw/dev/core/rest/lib.js";
```

### Getting Started

An example:

```js
import { RestClient } from "whirlybird/rest/lib.js";

const rest = new RestClient(`Bot ${Deno.env.get("BOT_TOKEN")}`);

await rest.createMessage(channelId, {
  body: {
    content: "Hello, World!",
  },
});
```

Uploading files:

```js
await rest.createMessage(channelId, {
  body: {
    content: "Hello, World!",
  },
  files: [
    new File(["Hello, World!"], "hello_world.txt"),
  ],
});
```

Using `RestClient.clearRateLimits()` to reset rate limits:

```js
setInterval(() => rest.clearRateLimits(), 3.6e+6);
```
