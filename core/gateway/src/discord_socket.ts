export abstract class DiscordSocket {
  socket?: WebSocket;

  constructor(public url: string) {
  }

  protected abstract handlePayload(payload: unknown): void;
  protected abstract handleSocketClose(event: CloseEvent): void;

  connect() {
    const socket = this.socket = new WebSocket(this.url);

    socket.addEventListener("close", (event) => this.handleSocketClose(event));
    socket.addEventListener(
      "message",
      (event) => this.handlePayload(JSON.parse(event.data)),
    );

    return new Promise((resolve) => socket.addEventListener("open", resolve));
  }

  disconnect(code?: number, reason?: string) {
    this.socket?.close(code, reason);
  }

  sendPayload(opcode: number, data?: unknown) {
    const payload = {
      d: data,
      op: opcode,
    };
    this.socket?.send(JSON.stringify(payload));
  }
}
