# `core/rest`

The library for Discord's HTTP API.

### Install

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

Using `RestClient.resetRateLimits()` to reset rate limits:

```js
setInterval(() => rest.resetRateLimits(), 3.6e+6);
```
