# `whirlybird-interactions`

[![](https://github.com/apacheli/whirlybird/actions/workflows/ci.yaml/badge.svg?branch=dev)](https://github.com/apacheli/whirlybird/actions/workflows/ci.yaml)
[![](https://canary.discord.com/api/guilds/812458966357377067/widget.png)](https://discord.gg/GtyB7gmx9Q)

### About

An implementation for HTTP server interactions.

### Getting Started

```ts
import {
  type Handler,
  handleRequestEvent,
} from "https://github.com/apacheli/whirlybird/raw/dev/core/interactions/mod.ts";
import { InteractionCallbackType } from "https://github.com/apacheli/whirlybird/raw/dev/core/types/mod.ts";

const publicKey = Deno.env.get("PUBLIC_KEY") ?? prompt("public key:");
if (!publicKey) {
  throw new Error("Missing public key");
}

const handler: Handler = async (callback, interaction) => {
  if (interaction.data?.name === "ping") {
    await callback(InteractionCallbackType.ChannelMessageWithSource, {
      content: "pong",
    });
  }
};

const serve = async (conn: Deno.Conn) => {
  for await (const event of Deno.serveHttp(conn)) {
    handleRequestEvent(publicKey, event, handler);
  }
};

for await (const conn of Deno.listen({ port: 1337 })) {
  serve(conn);
}
```

whirlybird also provides built-in utilities to help make building commands and
message components easier. It's entirely optional if you prefer them.

Application command utility example:

```ts
import {
  chatInputCommand,
  integerOption,
  stringOption,
} from "https://github.com/apacheli/whirlybird/raw/dev/core/interactions/mod.ts";

const command = chatInputCommand("ping", "ping pong command", {
  options: [
    stringOption("a", "look at me i am a string"),
    integerOption("b", "wow i am an integer", {
      max_value: 5,
      min_value: 1,
    }),
  ],
});

await http.createGlobalApplicationCommand("483372261815091201", command);
```

Message component utility example:

```ts
import {
  actionRow,
  button,
  InteractionCallbackType,
  selectMenu,
} from "https://github.com/apacheli/whirlybird/raw/dev/core/interactions/mod.ts";

await callback(InteractionCallbackType.ChannelMessageWithSource, {
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

### Documentation

The generated documentation is available
[here](https://doc.deno.land/https://github.com/apacheli/whirlybird/raw/dev/core/interactions/mod.ts).
