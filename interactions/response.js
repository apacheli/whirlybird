const r = (type) => (data) => ({ type, data });

// deno-fmt-ignore
export const
  // pong = { ping: 1 },
  message = r(4),
  deferMessage = r(5),
  deferMessageUpdate = r(6),
  messageUpdate = r(7),
  autocompleteResult = r(8),
  modal = r(9);
