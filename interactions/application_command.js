/**
 * @param {number} type
 */
const a = (type) =>
/**
 * @param {string} name
 * @param {string} description
 * @param {Record<string, unknown>} [x]
 */
(name, description, x) => ({
  name,
  description,
  type,
  ...x,
});

// deno-fmt-ignore
export const
  slashCommand = a(2),
  messageCommand = a(2),
  userCommand = a(3);

/**
 * @param {number} type
 */
const o = (type) =>
/**
 * @param {string} name
 * @param {string} description
 * @param {Record<string, unknown>} [x]
 */
(name, description, x) => ({
  name,
  description,
  type,
  ...x,
});

// deno-fmt-ignore
export const
  subcommand = o(1),
  subcommandGroup = o(2),
  string = o(3),
  integer = o(4),
  boolean = o(5),
  user = o(6),
  channel = o(7),
  role = o(8),
  mentionable = o(9),
  number = o(10),
  attachment = o(11);

/**
 * @param {string} name
 * @param {string | number} value
 * @param {Record<string, unknown>} [x]
 */
export const choice = (name, value, x) => ({
  name,
  value,
  ...x,
});
