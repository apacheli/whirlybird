// deno-fmt-ignore-next-line
export const
  REQUEST_GUILD_MEMBERS_DELAY = 60_000,
  SHARD_IDENTIFY_DELAY = 5_000;

export enum ShardSocketCloseStates {
  Closed,
  /** The shard can open a new connection and identify */
  Reconnectable,
  /** The shard can open a new connection and resume */
  Resumable,
}
