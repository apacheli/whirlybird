export class ShardClient {
  heartbeatAt;
  heartbeatInterval;
  id;
  latency = 0;
  options;
  ready = false;
  resumeGatewayUrl;
  seq = 0;
  sessionId;
  ws;

  constructor(id, options) {
    this.id = id;
    this.options = options;
  }

  connect(url) {
    this.ws = new WebSocket(url);
    this.ws.onclose = (event) => this.options.close(event, this);
    this.ws.onmessage = (event) => this.options.message(event, this);
    this.ws.onopen = (event) => this.options.open(event, this);
  }

  disconnect(code = 3900, reason = "whirlybird disconnect") {
    this.ws.close(code, reason);
  }

  send(op, d) {
    this.ws.send(`{"d":${JSON.stringify(d)},"op":${op}}`);
  }

  heartbeat() {
    this.heartbeatAt = Date.now();
    this.send(1, this.seq);
  }

  identify(options) {
    this.send(2, options);
  }

  updatePresence(options) {
    this.send(3, options);
  }

  updateVoiceState(options) {
    this.send(4, options);
  }

  resume(token) {
    this.send(6, {
      seq: this.seq,
      session_id: this.sessionId,
      token,
    });
  }

  requestGuildMembers(options) {
    this.send(8, options);
  }
}
