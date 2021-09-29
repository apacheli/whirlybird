import type { GuildMember } from "../../types/src/resources/guild.ts";
import { GatewayEvents } from "../../types/src/topics/gateway.ts";
import type {
  DispatchPayloadGuildMembersChunkData,
  DispatchPayloadPresenceUpdateData,
  GatewayPayload,
  GuildRequestMembersPayloadData,
  IdentifyPayloadData,
  PresenceUpdatePayloadData,
  ResumePayloadData,
  VoiceStateUpdatePayloadData,
} from "../../types/src/topics/gateway.ts";
import {
  GatewayCloseEventCodes,
  GatewayOpcodes,
} from "../../types/src/topics/opcodes_and_status_codes.ts";
import { DiscordSocket } from "../../util/src/discord_socket.ts";
import type { PartialKeys } from "../../util/src/types.ts";

export interface RequestGuildMembersMapEntry {
  members: GuildMember[];
  presences: DispatchPayloadPresenceUpdateData[];
  notFound: (string | number)[];
  resolve: (value: RequestGuildMembersMapEntry) => void;
}

export const concatGuildMembersChunk = (
  entry: RequestGuildMembersMapEntry,
  chunk: DispatchPayloadGuildMembersChunkData,
) => {
  entry.members.push(...chunk.members);
  if (chunk.presences) {
    entry.presences.push(...chunk.presences);
  }
  if (chunk.not_found) {
    entry.notFound.push(...chunk.not_found);
  }
};

/** Class representing a shard */
export class Shard extends DiscordSocket {
  /** `Heartbeat` send and `Heartbeat ACK` latency */
  latency = -1;

  #heartbeatInterval?: number;
  #seq = 0;
  #sessionId?: string;
  #lastHeartbeatSentAt = -1;
  #requestGuildMembersMap = new Map<string, RequestGuildMembersMapEntry>();
  #requestGuildMembersNonce = 0;

  /**
   * @param token Bot authentication token
   */
  constructor(public token: string) {
    super();
  }

  onClose?(reconnectable: boolean, resumable: boolean, event: CloseEvent): void;
  onError?(event: Event): void;
  onPayload?(payload: GatewayPayload): void;

  onSocketClose(event: CloseEvent) {
    clearInterval(this.#heartbeatInterval);

    let reconnectable = false;
    let resumable = false;

    switch (event.code) {
      case 0:
      case 1001: // "Discord WebSocket requesting client reconnect."
      case GatewayCloseEventCodes.UnknownError: {
        resumable = true;
      } /* falls through */

      case GatewayCloseEventCodes.UnknownOpcode:
      case GatewayCloseEventCodes.DecodeError:
      case GatewayCloseEventCodes.InvalidSeq:
      case GatewayCloseEventCodes.RateLimited:
      case GatewayCloseEventCodes.SessionTimedOut: {
        reconnectable = true;
        break;
      }
    }

    this.onClose?.(reconnectable, resumable, event);
  }

  onSocketError(event: Event) {
    this.onError?.(event);
  }

  onSocketMessage(message: MessageEvent) {
    const payload: GatewayPayload = JSON.parse(message.data);

    switch (payload.op) {
      case GatewayOpcodes.Dispatch: {
        this.#seq = payload.s;

        switch (payload.t) {
          case GatewayEvents.Ready: {
            this.#sessionId = payload.d.session_id;
            break;
          }

          case GatewayEvents.GuildMembersChunk: {
            if (!payload.d.nonce) {
              break;
            }
            const entry = this.#requestGuildMembersMap.get(payload.d.nonce);
            if (!entry) {
              break;
            }
            concatGuildMembersChunk(entry, payload.d);
            if (payload.d.chunk_index + 1 === payload.d.chunk_count) {
              this.#requestGuildMembersMap.delete(payload.d.nonce);
              entry.resolve(entry);
            }
            break;
          }
        }
        break;
      }

      case GatewayOpcodes.InvalidSession: {
        // https://canary.discord.com/channels/81384788765712384/381887113391505410/887898774033268736
        if (payload.d) {
          this.resume();
        }
        break;
      }

      case GatewayOpcodes.Hello: {
        const delay = payload.d.heartbeat_interval;
        this.#heartbeatInterval = setInterval(() => this.heartbeat(), delay);
        break;
      }

      case GatewayOpcodes.HeartbeatAck: {
        this.latency = Date.now() - this.#lastHeartbeatSentAt;
        break;
      }
    }

    this.onPayload?.(payload);
  }

  /** Send a heartbeat */
  heartbeat() {
    this.#lastHeartbeatSentAt = Date.now();
    this.sendPayload(GatewayOpcodes.Heartbeat, this.#seq);
  }

  /** Identify */
  identify(data: PartialKeys<IdentifyPayloadData, "token" | "properties">) {
    const payload: IdentifyPayloadData = {
      properties: {
        $browser: "whirlybird",
        $device: "whirlybird",
        $os: Deno.build.os,
      },
      token: this.token,
      ...data,
    };
    this.sendPayload(GatewayOpcodes.Identify, payload);
  }

  /**
   * Update the shard's presence
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
   * Update the shard's voice state for a guild
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

  /** Resume the current gateway session */
  resume() {
    if (!this.#sessionId) {
      throw new Error("Unable to resume.");
    }
    const payload: ResumePayloadData = {
      seq: this.#seq,
      "session_id": this.#sessionId,
      token: this.token,
    };
    this.sendPayload(GatewayOpcodes.Resume, payload);
  }

  /**
   * Request a guild's members
   *
   * ```ts
   * const members = await Shard.requestGuildMembers({
   *   guild_id: "812458966357377067",
   *   limit: 0,
   * });
   * ```
   */
  requestGuildMembers(data: GuildRequestMembersPayloadData) {
    const nonce = data.nonce ?? `${this.#requestGuildMembersNonce++}`;
    const payload: GuildRequestMembersPayloadData = {
      nonce,
      query: "",
      ...data,
    };
    this.sendPayload(GatewayOpcodes.RequestGuildMembers, payload);
    return new Promise((resolve) => {
      this.#requestGuildMembersMap.set(nonce, {
        members: [],
        presences: [],
        notFound: [],
        resolve,
      });
    });
  }
}
