# whirlybird-interactions

[![](https://canary.discord.com/api/guilds/812458966357377067/widget.png)](https://discord.gg/GtyB7gmx9Q)

### About

An implementation for HTTP server interactions.

### Getting Started

```ts
import { handleRequestEvent } from "https://github.com/apacheli/whirlybird/raw/dev/core/interactions/mod.ts";
import type { Handler } from "https://github.com/apacheli/whirlybird/raw/dev/core/interactions/mod.ts";
import { InteractionCallbackType } from "https://github.com/apacheli/whirlybird/raw/dev/core/types/mod.ts";

const publicKey = Deno.env.get("PUBLIC_KEY")!;

const handler: Handler = (callback, interaction) => {
  if (interaction.data?.name === "ping") {
    callback(InteractionCallbackType.ChannelMessageWithSource, {
      content: "pong",
    });
  }
};

for await (const conn of Deno.listen({ port: 1337 })) {
  (async () => {
    for await (const event of Deno.serveHttp(conn)) {
      handleRequestEvent(publicKey, event, handler);
    }
  })();
}
```

Whirlybird also has built-in utilities that make building commands and
components easier. It's entirely optional if you prefer them.

```ts
import {
  actionRow,
  button,
  InteractionCallbackType,
  selectMenu,
} from "https://github.com/apacheli/whirlybird/raw/dev/core/interactions/mod.ts";

callback(InteractionCallbackType.ChannelMessageWithSource, {
  components: [
    actionRow([
      button("a", "Click Me!", ButtonStyles.Primary),
      button("b", "Click Me Too!", ButtonStyles.Secondary),
    ]),
    actionRow([
      selectMenu("c", [
        selectOption("i am a select option", "value"),
        selectOption("all of the above", "Hello, World!"),
      ]),
    ]),
  ],
  content: "wow components are so cool",
});
```
