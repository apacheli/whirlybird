# `core/cache`

Cache stuff into the cache.

### Install

```js
export * from "https://github.com/apacheli/whirlybird/raw/dev/cache/lib.js";
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
