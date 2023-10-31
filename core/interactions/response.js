/**
 * @param {number} type
 */
const r = (type) =>
/**
 * @param {unknown} data
 * @param {File[]} [files]
 */
(data, files) => ({ body: { type, data }, files });

// deno-fmt-ignore
export const
  // pong = { ping: 1 },
  message = r(4),
  deferMessage = r(5),
  deferMessageUpdate = r(6),
  messageUpdate = r(7),
  autocompleteResult = r(8),
  modal = r(9);
