# `core/cache`

A simple, in-memory cache for data received from Discord.

### Install

```js
export * from "https://github.com/apacheli/whirlybird/raw/dev/core/cache/lib.js";
```

### Getting Started

An example:

```js
import { CacheClient } from "whirlybird/cache/lib.js";

const cache = new CacheClient();

const handleEvent = (event, data) => {
  cache.handleEvent(event, data);

  switch (event) {
    // ...
  }
};
```

Configure cache options:

```js
const cache = new CacheClient({
  ignoreEvents: {
    // CHANNEL_CREATE: true,
  },
  ignoreTypes: {
    CHANNEL: false,
    EMOJI: false,
    GUILD: false,
    MEMBER: false,
    PRESENCE: false,
    ROLE: false,
    SCHEDULED_EVENT: false,
    STAGE_INSTANCE: false,
    STICKER: false,
    USER: false,
    VOICE_STATE: false,
  },
});
```

Considering gateway intents before choosing which types to ignore. Gateway intents prevents unnecessary data from reaching you whereas ignoring types do not.

Using custom functions for structures:

```js
const cache = new CacheClient({
  createChannel,
  updateChannel,
  createEmoji,
  updateEmoji,
  createGuild,
  updateGuild,
  createMember,
  updateMember,
  createPresence,
  updatePresence,
  createRole,
  updateRole,
  createScheduledEvent,
  updateScheduledEvent,
  createStageInstance,
  updateStageInstance,
  createSticker,
  updateSticker,
  createUser,
  updateUser,
  createVoiceState,
  updateVoiceState,
});
```

`createGuild` assumes the returned value is an object with `Map`s containing types, e.g., `guild.channels`. You can ignore said types to avoid this issue.
