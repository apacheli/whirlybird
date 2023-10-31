# `core/interactions`

The library for Discord's interactions API.

### Install

```js
export * from "https://github.com/apacheli/whirlybird/raw/dev/core/interactions/lib.js";
```

### Getting Started

An example:

```js
import { startServer } from "whirlybird/interactions/lib.js";

startServer(1337, Deno.env.get("PUBLIC_KEY"), (interaction) => {
  if (interaction.data.name === "ping") {
    return {
      body: {
        data: {
          content: "pong",
        },
        type: 4,
      },
    };
  }
});
```

Using `handleRequest` instead of `startServer`:

```js
import { createKey, handleRequest } from "whirlybird/interactions/lib.js";

const key = await createkey(Deno.env.get("PUBLIC_KEY"));

const handle = async (interaction) => {
  // ...
};

Deno.serve({ port: 1337 }, async (request) => {
  const response = await handleRequest(request, key, handle);
  return response;
});
```

Using application command helpers:

```js
import { integer, slashCommand, string } from "whirlybird/interactions/lib.js";

const command = slashCommand("ping", "ping pong command", {
  options: [
    string("a", "look at me i am a string"),
    integer("b", "wow i am an integer", {
      max_value: 5,
      min_value: 1,
    }),
  ],
});

await rest.createApplicationCommand(applicationId, {
  body: command,
});
```

Using message component helpers:

```js
import { actionRow, button, message } from "whirlybird/interactions/lib.js";

return message({
  components: [
    actionRow([
      button("a", "Click Me!", 1),
      button("b", "Click Me Too!", 2),
    ]),
    actionRow([
      selectMenu("c", [
        button("c", "wow another row that is so cool", 1),
        button("d", "very cool indeed", 2),
      ]),
    ]),
  ],
  content: "wow components are so cool",
});
```
