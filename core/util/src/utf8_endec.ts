// deno-lint-ignore-file no-explicit-any

export const utf8Decode = (globalThis.Deno as any)?.core?.decode ??
  TextDecoder.prototype.decode.bind(new TextDecoder());

export const utf8Encode = (globalThis.Deno as any)?.core?.encode ??
  TextEncoder.prototype.encode.bind(new TextEncoder());
