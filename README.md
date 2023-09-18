# whirlybird

whirlybird is a JavaScript library for building Discord bots.

### Core

- [`core/cache`](cache)
- [`core/gateway`](gateway)
- [`core/interactions`](interactions)
- [`core/rest`](rest)
- [`core/util`](util)

### Install

Deno [`deps.js`](https://deno.land/manual/examples/manage_dependencies):

```js
export * from "https://github.com/apacheli/whirlybird/raw/dev/lib.js";
```

Deno using [configuration file](https://deno.land/manual/getting_started/configuration_file):

```jsonc
{
  "imports": {
    "whirlybird": "https://github.com/apacheli/whirlybird/raw/dev/lib.js",
    "whirlybird/": "https://github.com/apacheli/whirlybird/raw/dev/"
  }
}
```

See [releases](https://github.com/apacheli/whirlybird/releases) for bundled + minified files.

### Development

Use `deno lint` and `deno fmt` for code styling. Install [EditorConfig for VS Code](https://github.com/editorconfig/editorconfig-vscode) if using Visual Studio Code.
