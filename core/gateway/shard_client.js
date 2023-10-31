import { debug, info, warn } from "../util/logger.js";

/**
 * @typedef ShardClientOptions
 * @property {(code: number, reason: string) => void} [close]
 * @property {(payload: unknown, shard: ShardClient) => void} [payload]
 */

/** A single connection to the gateway. */
export class ShardClient {
  /** @type {number} */
  heartbeatInterval;
  id;
  lastHeartbeat = 0;
  /** @type {number} */
  latency;
  options;
  ready = false;
  /** @type {string | undefined} */
  resumeGatewayUrl;
  seq = 0;
  /** @type {string | undefined} */
  sessionId;
  /** @type {WebSocket | undefined} */
  socket;

  /**
   * @param {ShardClientOptions} [options]
   * @param {number} [id]
   */
  constructor(options, id) {
    this.id = id;
    this.options = options;
  }

  /**
   * Connect to the gateway.
   *
   * @param {string} url
   */
  connect(url) {
    debug(`[Shard ${this.id}]: Connecting to "${url}"`);
    const socket = this.socket = new WebSocket(url);
    socket.addEventListener("close", (event) => this.close(event));
    socket.addEventListener("message", (event) => this.message(event));
    return new Promise((resolve) => socket.addEventListener("open", resolve));
  }

  /**
   * Disconnect from the gateway.
   *
   * @param {number} [code]
   * @param {string} [reason]
   */
  disconnect(code = 3000, reason) {
    if (!this.socket) {
      return;
    }
    this.socket.close(code, reason);
    return new Promise((resolve) => this.socket.addEventListener("close", resolve));
  }

  sendPayload(op, d) {
    this.socket.send(JSON.stringify({ d, op }));
  }

  heartbeat() {
    this.lastHeartbeat = Date.now();
    this.sendPayload(1, this.seq);
  }

  identify(data) {
    debug(`[Shard ${this.id}]: Identifying...`);
    this.sendPayload(2, data);
  }

  /**
   * Update the shard's presence.
   *
   * ```js
   * shard.presenceUpdate({
   *   activities: [
   *     {
   *       name: "running on whirlybird",
   *       type: 0,
   *     },
   *   ],
   *   status: "online",
   * });
   * ```
   *
   * @param {unknown} data
   */
  presenceUpdate(data) {
    this.sendPayload(3, data);
  }

  /**
   * Update the shard's voice state.
   *
   * ```js
   * shard.voiceStateUpdate({
   *   guild_id: "1234567890",
   *   channel_id: "0987654321",
   *   self_mute: false,
   *   self_deaf: false,
   * });
   * ```
   *
   * @param {unknown} data
   */
  voiceStateUpdate(data) {
    this.sendPayload(4, data);
  }

  resume(token) {
    debug(`[Shard ${this.id}]: Resuming...`);
    this.sendPayload(6, {
      seq: this.seq,
      session_id: this.sessionId,
      token,
    });
  }

  /**
   * Request members from a guild.
   *
   * ```js
   * shard.requestGuildMembers({
   *   guild_id: "1234567890",
   *   query: "",
   *   limit: 0,
   * });
   * ```
   *
   * @param {unknown} data
   */
  requestGuildMembers(data) {
    this.sendPayload(8, data);
  }

  close({ code, reason }) {
    warn(`[Shard ${this.id}]: Closed code: ${code} reason: "${reason}"`);
    clearInterval(this.heartbeatInterval);
    this.ready = false;
    this.socket = undefined;
    this.options?.close?.(code, reason, this);
  }

  message(event) {
    const payload = JSON.parse(event.data);
    const { d, op, s, t } = payload;
    if (s > this.seq) {
      this.seq = s;
    }
    switch (op) {
      case 0: {
        switch (t) {
          case "READY": {
            this.resumeGatewayUrl = d.resume_gateway_url;
            this.sessionId = d.session_id;
          } /* falls through */

          case "RESUMED": {
            info(`[Shard ${this.id}]: Received session state "${payload.t}"`);
            this.ready = true;
            break;
          }
        }
        break;
      }

      case 9: {
        warn(`[Shard ${this.id}]: Encountered an invalid session resume: ${payload.d}`);
        this.ready = false;
        break;
      }

      case 10: {
        const delay = d.heartbeat_interval;
        this.heartbeatInterval = setInterval(() => this.heartbeat(), delay);
        break;
      }

      case 11: {
        this.latency = Date.now() - this.lastHeartbeat;
        break;
      }
    }
    this.options?.payload?.(payload, this);
  }
}
