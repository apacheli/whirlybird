# `whirlybird-http`

[![](https://github.com/apacheli/whirlybird/actions/workflows/ci.yaml/badge.svg?branch=dev)](https://github.com/apacheli/whirlybird/actions/workflows/ci.yaml)
[![](https://canary.discord.com/api/guilds/812458966357377067/widget.png)](https://discord.gg/GtyB7gmx9Q)

### About

An implementation for the Discord HTTP API. This allows end-users to execute
most actions (such as creating and deleting messages) programmatically.
Whirlybird will also automatically handles rate limits.

### Getting Started

```ts
import { HttpClient } from "https://github.com/apacheli/whirlybird/raw/dev/core/http/mod.ts";

let token = Deno.env.get("BOT_TOKEN") ?? prompt("bot token:");
if (!token) {
  throw new Error("Missing token");
}
token = `Bot ${token}`;

const http = new HttpClient(token);

await http.createMessage("826605722397442089", {
  content: "Hello, World!",
});
```

The generated documentation is available
[here](https://doc.deno.land/https://github.com/apacheli/whirlybird/raw/dev/core/http/mod.ts).
