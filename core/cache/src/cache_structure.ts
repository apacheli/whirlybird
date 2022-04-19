import type { Snowflake } from "../../types/src/reference.ts";

export interface Structure {
  id: Snowflake;
}

export abstract class CacheStructure {
  id;

  constructor(data: Structure) {
    this.id = BigInt(data.id);
  }

  abstract __update__(data: Partial<Structure>): void;
}
