# whirlybird-http

[![](https://github.com/apacheli/whirlybird/actions/workflows/ci.yaml/badge.svg?branch=dev)](https://github.com/apacheli/whirlybird/actions/workflows/ci.yaml)
[![](https://canary.discord.com/api/guilds/812458966357377067/widget.png)](https://discord.gg/GtyB7gmx9Q)

### About

An implementation for the Discord HTTP API. This allows end-users to execute
most actions (such as creating and deleting messages) programmatically.
Whirlybird will also automatically handles rate limits.

### Getting Started

Creating a message:

```ts
import { HttpClient } from "https://github.com/apacheli/whirlybird/raw/dev/core/http/mod.ts";

const token = `Bot ${Deno.env.get("BOT_TOKEN")}`;

const http = new HttpClient(token);

const message = await http.createMessage("826605722397442089", {
  content: "Hello, World!",
});
console.log(message);
```

Another example showcasing getting the icon of a guild:

```ts
import {
  guildIcon,
  HttpClient,
} from "https://github.com/apacheli/whirlybird/raw/dev/core/http/mod.ts";

const token = `Bot ${Deno.env.get("BOT_TOKEN")}`;

const http = new HttpClient(token);

const guild = await http.getGuild("812458966357377067");
const guildIconData = await guildIcon(guild.id, guild.icon!);
console.log(guildIconData);
```

The generated documentation is available
[here](https://doc.deno.land/https://github.com/apacheli/whirlybird/raw/dev/core/http/mod.ts).
