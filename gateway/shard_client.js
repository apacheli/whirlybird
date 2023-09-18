import { debug, info, warn } from "../util/logger.js";

export class ShardClient {
  heartbeatInterval;
  id;
  options;
  resumeGatewayUrl;
  seq = 0;
  sessionId;
  socket;

  constructor(options, id) {
    this.id = id;
    this.options = options;
  }

  connect(url) {
    debug(`[Shard ${this.id}]: Connecting to "${url}"`);
    const socket = this.socket = new WebSocket(url);
    socket.addEventListener("close", (event) => this.close(event));
    socket.addEventListener("message", (event) => this.message(event));
    return new Promise((resolve) => socket.addEventListener("open", resolve));
  }

  disconnect(code = 3000, reason) {
    this.socket.close(code, reason);
    return new Promise((resolve) => this.socket.addEventListener("close", resolve));
  }

  sendPayload(op, d) {
    this.socket.send(JSON.stringify({ d, op }));
  }

  heartbeat() {
    this.sendPayload(1, this.seq);
  }

  identify(data) {
    debug(`[Shard ${this.id}]: Identifying...`);
    this.sendPayload(2, data);
  }

  presenceUpdate(data) {
    this.sendPayload(3, data);
  }

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

  requestGuildMembers(data) {
    this.sendPayload(8, data);
  }

  close({ code, reason }) {
    warn(`[Shard ${this.id}]: Closed code: ${code} reason: "${reason}"`);
    clearInterval(this.heartbeatInterval);
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
            info(`[Shard ${this.id}]: received "${payload.t}"`);
            break;
          }
        }
        break;
      }

      case 9: {
        debug(`[Shard ${this.id}]: Invalid session resume: ${payload.d}`);
        break;
      }

      case 10: {
        const delay = d.heartbeat_interval;
        this.heartbeatInterval = setInterval(() => this.heartbeat(), delay);
        break;
      }
    }
    this.options?.payload?.(payload, this);
  }
}
