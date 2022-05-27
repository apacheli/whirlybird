import {
  GatewayEvents,
  type GatewayPayload,
  type GuildRequestMembersPayloadData,
  type PresenceUpdatePayloadData,
  type VoiceStateUpdatePayloadData,
} from "../../types/src/topics/gateway.ts";
import { GatewayOpcodes } from "../../types/src/topics/opcodes_and_status_codes.ts";
import * as logger from "../../util/src/logger.ts";
import { DiscordSocket } from "./discord_socket.ts";
import type { GatewayClient } from "./gateway_client.ts";

/** A thing that connects to the gateway. */
export class Shard extends DiscordSocket {
  heartbeatInterval?: number;
  lastHeartbeatSentAt = -1;
  /** Heartbeat acknowledgement response time. */
  latency = -1;
  /** If the shard received a `READY` dispatch payload. */
  ready = false;
  seq = 0;
  sessionId?: string;

  constructor(public client: GatewayClient, public id: number) {
    super(client.data.url);
  }

  protected handlePayload(payload: GatewayPayload) {
    switch (payload.op) {
      case GatewayOpcodes.Dispatch: {
        if (this.seq > payload.s) {
          this.seq = payload.s;
        }

        switch (payload.t) {
          case GatewayEvents.Ready: {
            this.ready = true;
            this.sessionId = payload.d.session_id;

            logger.info(
              `Shard ${this.id} is ready as "${payload.d.application.id}"`,
              `("${payload.d.user.username}#${payload.d.user.discriminator}")`,
            );

            if (this.client.shards.every((shard) => shard.ready)) {
              this.client.data.ready?.();
            }
            break;
          }

          case GatewayEvents.Resumed: {
            logger.debug(`Shard ${this.id} resumed`);
            break;
          }
        }
        break;
      }

      case GatewayOpcodes.Hello: {
        const delay = payload.d.heartbeat_interval;
        this.heartbeatInterval = setInterval(() => this.heartbeat(), delay);
        break;
      }

      case GatewayOpcodes.InvalidSession: {
        logger.debug(`Shard ${this.id} encountered an invalid session`);
        if (payload.d) {
          this.resume();
        }
        break;
      }

      case GatewayOpcodes.HeartbeatAck: {
        this.latency = Date.now() - this.lastHeartbeatSentAt;
        break;
      }
    }

    this.client.handleShardPayload(payload, this);
  }

  protected handleSocketClose(event: CloseEvent) {
    clearInterval(this.heartbeatInterval);
    this.client.handleShardClose(event, this);
  }

  /** Send a heartbeat to keep the connection alive. */
  heartbeat() {
    this.lastHeartbeatSentAt = Date.now();
    this.sendPayload(GatewayOpcodes.Heartbeat, this.seq);
  }

  /** Identify a new session. */
  identify() {
    this.sendPayload(GatewayOpcodes.Identify, {
      properties: {
        $browser: "whirlybird",
        $device: "whirlybird",
        $os: Deno.build.os,
      },
      ...this.client.data.identifyData,
      shard: [this.id, this.client.data.shards],
      token: this.client.token,
    });
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
    this.sendPayload(GatewayOpcodes.Resume, {
      seq: this.seq,
      session_id: this.sessionId,
      token: this.client.token,
    });
  }

  /**
   * Request a list of guild members from a guild. The `GUILD_MEMBERS` intent
   * is required.
   *
   * ```ts
   * Shard.requestGuildMembers({
   *   guild_id: "812458966357377067",
   *   limit: 0,
   *   query: "",
   * });
   * ```
   */
  requestGuildMembers(data: GuildRequestMembersPayloadData) {
    this.sendPayload(GatewayOpcodes.RequestGuildMembers, data);
  }
}
