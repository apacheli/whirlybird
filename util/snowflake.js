export const DISCORD_EPOCH = 1420070400000n;

export const getTimestamp = (snowflake) => (snowflake >> 22n) + DISCORD_EPOCH;

export const getInternalWorkerId = (snowflake) => (snowflake & 0x3E0000n) >> 17n;

export const getInternalProcessId = (snowflake) => (snowflake & 0x01F000n) >> 12n;

export const getIncrement = (snowflake) => snowflake & 0x0FFFn;

export const generateSnowflake = (
  timestamp = BigInt(Date.now()),
  internalWorkerId = 0n,
  internalProcessId = 0n,
  increment = 0n,
) =>
  timestamp - DISCORD_EPOCH << 22n |
  internalWorkerId << 17n |
  internalProcessId << 12n |
  increment;
