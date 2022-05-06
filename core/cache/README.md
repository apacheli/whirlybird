# `whirlybird-cache`

### About

> :warning: `cache` is currently experimental. Expect massive changes to the
> overall structure of this module.

A simple in-memory cache management system.

### Getting Started

Simply use `CacheClient.update()` in your `handleEvent` function:

```ts
const cache = new CacheClient();

const handleEvent: HandleEvent = (payload) => {
  cache.update(payload);
};
```

You can also pass `disableEvents` property as an option. This option should be
used in conjunction with intents.

```ts
const cache = new CacheClient({
  disableEvents: {
    MESSAGE_CREATE: true,
  },
});
```

By default, a textable channel can store up to 100 messages. You can use the
`messageLimit` option to limit how many messages you want to cache per channel:

```ts
const cache = new CacheClient({
  messageLimit: 0,
});
```

### Documentation

The generated documentation is available
[here](https://doc.deno.land/https://github.com/apacheli/whirlybird/raw/dev/core/cache/mod.ts).
