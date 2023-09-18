const a = (type) => (name, description, x) => ({
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

const o = (type) => (name, description, x) => ({
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

export const choice = (name, value) => ({
  name,
  value,
});
