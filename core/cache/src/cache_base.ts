import type { Snowflake } from "../../types/src/reference.ts";

export const SYMBOL_UPDATE = Symbol("SYMBOL_UPDATE");

export interface Structure {
  id: Snowflake;
}

export abstract class CacheStructure {
  constructor(data: Structure, public id = BigInt(data.id)) {
  }

  abstract [SYMBOL_UPDATE](data: unknown): void;
}
