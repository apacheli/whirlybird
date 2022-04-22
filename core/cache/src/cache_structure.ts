import type { Snowflake } from "../../types/src/reference.ts";

export interface Structure {
  id: Snowflake;
}

/**
 * Basic class for cached structures.
 *
 * You must call `.__update__()` after initializing. I did not call them in
 * `constructor` because I do not like super chaining which calls it multiple
 * times. If you are using `CacheMap`, then this method will be called
 * automatically.
 */
export abstract class CacheStructure {
  id;

  constructor(data: Structure) {
    this.id = BigInt(data.id);
  }

  abstract __update__(data: Partial<Structure>): void;
}
