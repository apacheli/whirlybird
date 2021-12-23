export const DISCORD_EPOCH = 1420070400000n;

export const timestamp = (snowflake: bigint) =>
  (snowflake >> 22n) + DISCORD_EPOCH;

export const internalWorkerId = (snowflake: bigint) =>
  (snowflake & 0x3E0000n) >> 17n;

export const internalProcessId = (snowflake: bigint) =>
  (snowflake & 0x1F000n) >> 12n;

export const increment = (snowflake: bigint) => snowflake & 0xFFFn;

/** Generate a snowflake */
export const generate = (timestamp = BigInt(Date.now())) =>
  (timestamp - DISCORD_EPOCH) << 22n;
