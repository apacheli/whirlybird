export const actionRow = (components) => ({
  components,
  type: 1,
});

export const button = (customId, label, style, x) => ({
  custom_id: customId,
  label,
  style,
  type: 2,
  ...x,
});

export const textInput = (customId, label, style, x) => ({
  custom_id: customId,
  label,
  style,
  type: 4,
  ...x,
});

const s = (type) => (customId, options, x) => ({
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

export const option = (label, value, description) => ({
  description,
  label,
  value,
});
