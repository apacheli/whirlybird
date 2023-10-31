/**
 * @param {unknown[]} components
 */
export const actionRow = (components) => ({
  components,
  type: 1,
});

/**
 * @param {string} customId
 * @param {string} label
 * @param {number} style
 * @param {Record<string, unknown>} [x]
 */
export const button = (customId, label, style, x) => ({
  custom_id: customId,
  label,
  style,
  type: 2,
  ...x,
});

/**
 * @param {string} customId
 * @param {string} label
 * @param {number} style
 * @param {Record<string, unknown>} [x]
 */
export const textInput = (customId, label, style, x) => ({
  custom_id: customId,
  label,
  style,
  type: 4,
  ...x,
});

/**
 * @param {number} type
 */
const s = (type) =>
/**
 * @param {string} customId
 * @param {unknown[]} options
 * @param {Record<string, unknown>} [x]
 */
(customId, options, x) => ({
  custom_id: customId,
  options,
  type,
  ...x,
});

// deno-fmt-ignore
export const
  stringSelect = s(3),
  userSelect = s(5),
  roleSelect = s(6),
  mentionableSelect = s(7),
  channelSelect = s(8);

/**
 * @param {string} label
 * @param {string} value
 * @param {Record<string, unknown>} [x]
 */
export const option = (label, value, x) => ({
  label,
  value,
  ...x,
});
