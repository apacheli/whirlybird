// deno-lint-ignore-file camelcase

import type { Snowflake } from "../reference.ts";

// https://discord.dev/game-sdk/lobbies

/** https://discord.dev/game-sdk/lobbies#data-models-lobbytype-enum */
export enum LobbyType {
  Private = 1,
  Public,
}

// Not properly documented
export interface Lobby {
  capacity: number;
  region: string;
  secret: Snowflake;
  application_id: Snowflake;
  metadata: unknown;
  type: LobbyType;
  id: Snowflake;
  owner_id: Snowflake;
}

/** https://discord.dev/game-sdk/lobbies#create-lobby */
export interface CreateLobbyData {
  /** your application id */
  application_id: Snowflake;
  /** the type of lobby */
  type: LobbyType;
  /** metadata for the lobby - key/value pairs with types `string` */
  metadata: Record<string, string>;
  /** max lobby capacity with a default of 16 */
  capacity: number;
  /** the region in which to make the lobby - defaults to the region of the requesting server's IP address */
  region: string;
}

/** https://discord.dev/game-sdk/lobbies#create-lobby */
export type CreateLobbyBody = Lobby;

/** https://discord.dev/game-sdk/lobbies#update-lobby */
export interface UpdateLobbyData {
  /** the type of lobby */
  type: LobbyType;
  /** metadata for the lobby - key/value pairs with types `string` */
  metadata: Record<string, string>;
  /** max lobby capacity with a default of 16 */
  capacity: number;
}

/** https://discord.dev/game-sdk/lobbies#update-lobby */
export type UpdateLobbyBody = Lobby;

/** https://discord.dev/game-sdk/lobbies#delete-lobby */
export type DeleteLobbyBody = void;

/** https://discord.dev/game-sdk/lobbies#update-lobby-member */
export interface UpdateLobbyMemberData {
  /** metadata for the lobby - key/value pairs with types `string` */
  metadata: Record<string, string>;
}

/** https://discord.dev/game-sdk/lobbies#update-lobby-member */
export type UpdateLobbyMemberBody = unknown;

/** https://discord.dev/game-sdk/lobbies#create-lobby-search */
export interface CreateLobbySearchData {
  /** your application id */
  application_id: Snowflake;
  /** the filter to check against */
  filter: SearchFilter;
  /** how to sort the results */
  sort: SearchSort;
  /** limit of lobbies returned, default of 25 */
  limit: number;
}

/** https://discord.dev/game-sdk/lobbies#create-lobby-search */
export type CreateLobbySearchBody = Lobby;

/** https://discord.dev/game-sdk/lobbies#create-lobby-search-post-lobbiessearch-searchfilter-object */
export interface SearchFilter {
  /** the metadata key to search */
  key: string;
  /** the value of the metadata key to validate against */
  value: string;
  /** the type to cast `value` as */
  cast: SearchCastTypes;
  /** how to compare the metadata values */
  comparison: SearchComparisonTypes;
}

/** https://discord.dev/game-sdk/lobbies#create-lobby-search-post-lobbiessearch-searchcomparison-types */
export enum SearchComparisonTypes {
  EqualToOrLessThan = -2,
  LessThan,
  Equal,
  EqualToOrGreaterThan,
  GreaterThan,
  NotEqual,
}

/** https://discord.dev/game-sdk/lobbies#create-lobby-search-post-lobbiessearch-searchsort-object */
export interface SearchSort {
  /** the metadata key on which to sort lobbies that meet the search criteria */
  key: string;
  /** the type to cast `value` as */
  cast: SearchCastTypes;
  /** the value around which to sort the key */
  near_value: string;
}

/** https://discord.dev/game-sdk/lobbies#create-lobby-search-post-lobbiessearch-searchcast-types */
export enum SearchCastTypes {
  String = 1,
  Number,
}

/** https://discord.dev/game-sdk/lobbies#send-lobby-data */
export interface SendLobbyDataData {
  /** a message to be sent to other lobby members */
  data: string;
}

/** https://discord.dev/game-sdk/lobbies#send-lobby-data */
export type SendLobbyDataBody = unknown;
