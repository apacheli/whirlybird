export const snowflake = (id) => ({
  timestamp: (id >> 22n) + 1420070400000n,
  worker: (id & 0x01F000n) >> 12n,
  process: (id & 0x01F000n) >> 12n,
  increment: id & 0x0FFFn,
});

export const generateSnowflake = (
  timestamp = BigInt(Date.now()),
  worker = 0n,
  process = 0n,
  increment = 0n,
) => timestamp - 1420070400000n << 22n | worker << 17n | process << 12n | increment;
