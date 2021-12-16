import type { GuildMember } from "../../types/src/resources/guild.ts";
import {
  type DispatchPayloadPresenceUpdateData,
  GatewayEvents,
  type GatewayPayload,
  type GuildRequestMembersPayloadData,
  type IdentifyPayloadData,
  type PresenceUpdatePayloadData,
  type ResumePayloadData,
  type VoiceStateUpdatePayloadData,
} from "../../types/src/topics/gateway.ts";
import {
  GatewayCloseEventCodes,
  GatewayOpcodes,
} from "../../types/src/topics/opcodes_and_status_codes.ts";
import { DiscordSocket } from "../../util/src/discord_socket.ts";
import {
  REQUEST_GUILD_MEMBERS_DELAY,
  ShardSocketCloseStates,
} from "./constants.ts";

export interface RequestGuildMembersMapEntry {
  done: boolean;
  members: GuildMember[];
  presences: DispatchPayloadPresenceUpdateData[];
  notFound: (string | number)[];
  resolve: (entry: RequestGuildMembersMapEntry) => void;
  timeout: number;
}

export type ShardIdentifyData = Omit<
  IdentifyPayloadData,
  "properties" | "shard" | "token"
>;

export type Payload = (payload: GatewayPayload) => void;
export type SocketClose = (
  event: CloseEvent,
  state: ShardSocketCloseStates,
) => void;
export type SocketError = (event: Event) => void;

export interface ShardOptions {
  id?: number;
  payload?: Payload;
  shards?: number;
  requestGuildMembersDelay?: number;
  socketClose?: SocketClose;
  socketError?: SocketError;
}

/** Hello, I am a shard! */
export class Shard extends DiscordSocket {
  heartbeatInterval?: number;
  /** More accurate shard identifier */
  id?: number;
  lastHeartbeatSentAt = -1;
  latency = -1;
  ready = false;
  requestGuildMembersMap: Record<string, RequestGuildMembersMapEntry> = Object
    .create(null);
  requestGuildMembersNonce = 0;
  seq = 0;
  sessionId?: string;

  #token: string;

  /**
   * @param token Bot authentication token
   * @param id Shard identifier
   */
  constructor(token: string, public options?: ShardOptions) {
    super();

    this.id = options?.id;

    this.#token = token;
  }

  onSocketClose(event: CloseEvent) {
    clearInterval(this.heartbeatInterval);
    this.ready = false;

    let state = ShardSocketCloseStates.Closed;

    switch (event.code) {
      case GatewayCloseEventCodes.UnknownOpcode:
      case GatewayCloseEventCodes.DecodeError:
      case GatewayCloseEventCodes.InvalidSeq:
      case GatewayCloseEventCodes.RateLimited:
      case GatewayCloseEventCodes.SessionTimedOut: {
        state = ShardSocketCloseStates.Reconnectable;
        break;
      }

      case 0:
      case 1001: // "Discord WebSocket requesting client reconnect."
      case GatewayCloseEventCodes.UnknownError: {
        state = ShardSocketCloseStates.Resumable;
        break;
      }
    }

    for (const nonce in this.requestGuildMembersMap) {
      const entry = this.requestGuildMembersMap[nonce];
      delete this.requestGuildMembersMap[nonce];
      clearTimeout(entry.timeout);
      entry.resolve(entry);
    }

    this.options?.socketClose?.(event, state);
  }

  onSocketError(event: Event) {
    this.options?.socketError?.(event);
  }

  onSocketMessage(message: MessageEvent) {
    const payload: GatewayPayload = JSON.parse(message.data);

    switch (payload.op) {
      case GatewayOpcodes.Dispatch: {
        this.seq = payload.s;

        switch (payload.t) {
          case GatewayEvents.GuildMembersChunk: {
            if (!payload.d.nonce) {
              break;
            }
            const entry = this.requestGuildMembersMap[payload.d.nonce];
            if (!entry) {
              break;
            }
            entry.members.push(...payload.d.members);
            if (payload.d.presences) {
              entry.presences.push(...payload.d.presences);
            }
            if (payload.d.not_found) {
              entry.notFound.push(...payload.d.not_found);
            }
            if (payload.d.chunk_index + 1 === payload.d.chunk_count) {
              entry.done = true;
              delete this.requestGuildMembersMap[payload.d.nonce];
              clearTimeout(entry.timeout);
              entry.resolve(entry);
            }
            break;
          }

          case GatewayEvents.Ready: {
            this.id = payload.d.shard?.[0];
            this.sessionId = payload.d.session_id;
          } /* falls through */

          case GatewayEvents.Resumed: {
            this.ready = true;
            break;
          }
        }
        break;
      }

      case GatewayOpcodes.InvalidSession: {
        this.ready = false;
        break;
      }

      case GatewayOpcodes.Hello: {
        const delay = payload.d.heartbeat_interval;
        this.heartbeatInterval = setInterval(() => this.heartbeat(), delay);
        break;
      }

      case GatewayOpcodes.HeartbeatAck: {
        this.latency = Date.now() - this.lastHeartbeatSentAt;
        break;
      }
    }

    this.options?.payload?.(payload);
  }

  /** Send a heartbeat. */
  heartbeat() {
    this.lastHeartbeatSentAt = Date.now();
    this.sendPayload(GatewayOpcodes.Heartbeat, this.seq);
  }

  /** Identify a new session. */
  identify(data: ShardIdentifyData) {
    if (this.sessionId) {
      throw new Error("There is already a session.");
    }
    const payload: IdentifyPayloadData = {
      properties: {
        $browser: "whirlybird",
        $device: "whirlybird",
        $os: Deno.build.os,
      },
      shard: this.id !== void 0 && this.options?.shards !== void 0
        ? [this.id, this.options.shards]
        : void 0,
      token: this.#token,
      ...data,
    };
    this.sendPayload(GatewayOpcodes.Identify, payload);
  }

  /**
   * Update the shard's presence.
   *
   * ```ts
   * Shard.presenceUpdate({
   *   activities: [
   *     {
   *       name: "Bloons TD 6",
   *       type: ActivityTypes.Game,
   *     },
   *   ],
   *   afk: false,
   *   since: null,
   *   status: StatusTypes.Online,
   * });
   * ```
   */
  presenceUpdate(data: PresenceUpdatePayloadData) {
    this.sendPayload(GatewayOpcodes.PresenceUpdate, data);
  }

  /**
   * Update the shard's voice state in a guild. Setting `channel_id` to `null`
   * will remove the bot from their current voice channel in the guild.
   *
   * ```ts
   * Shard.voiceStateUpdate({
   *   channel_id: "836841935976923146",
   *   guild_id: "812458966357377067",
   *   self_deaf: false,
   *   self_mute: false,
   * });
   * ```
   */
  voiceStateUpdate(data: VoiceStateUpdatePayloadData) {
    this.sendPayload(GatewayOpcodes.VoiceStateUpdate, data);
  }

  /** Resume the current gateway session. */
  resume() {
    if (!this.sessionId) {
      throw new Error("Unable to resume.");
    }
    const payload: ResumePayloadData = {
      seq: this.seq,
      "session_id": this.sessionId,
      token: this.#token,
    };
    this.sendPayload(GatewayOpcodes.Resume, payload);
  }

  /**
   * Request a list of guild members from a guild. The `GUILD_MEMBERS` intent
   * is required. Otherwise, you will receive a 4001 socket close code.
   *
   * ```ts
   * const { members } = await Shard.requestGuildMembers({
   *   guild_id: "812458966357377067",
   *   limit: 0,
   *   query: "",
   * });
   * ```
   */
  requestGuildMembers(data: GuildRequestMembersPayloadData, delay?: number) {
    const nonce = data.nonce ?? `${this.requestGuildMembersNonce++}`;
    const payload: GuildRequestMembersPayloadData = {
      nonce,
      ...data,
    };
    this.sendPayload(GatewayOpcodes.RequestGuildMembers, payload);
    return new Promise<RequestGuildMembersMapEntry>((resolve) => {
      const timeout = setTimeout(() => {
        delete this.requestGuildMembersMap[nonce];
        resolve(entry);
      }, delay ?? REQUEST_GUILD_MEMBERS_DELAY);
      const entry = this.requestGuildMembersMap[nonce] = {
        done: false,
        members: [],
        presences: [],
        notFound: [],
        resolve,
        timeout,
      };
    });
  }
}
