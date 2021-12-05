/** An abstract socket client for gateway and voice */
export abstract class DiscordSocket {
  /** The socket */
  socket?: WebSocket;
  /** When the socket closes */
  abstract onSocketClose(event: CloseEvent): void;
  /** When the socket encounters an error */
  abstract onSocketError(event: Event | ErrorEvent): void;
  /** When the socket receives a message */
  abstract onSocketMessage(event: MessageEvent<string>): void;

  /** Open a socket connection */
  connect(url: string) {
    const socket = this.socket = new WebSocket(url);

    socket.addEventListener("close", (event) => this.onSocketClose(event));
    socket.addEventListener("error", (event) => this.onSocketError(event));
    socket.addEventListener("message", (event) => this.onSocketMessage(event));

    return new Promise((resolve) => socket.addEventListener("open", resolve));
  }

  disconnect(code?: number, reason?: string) {
    if (!this.socket) {
      throw new Error("No active socket connection.");
    }
    this.socket.close(code, reason);
  }

  /**
   * Send a payload
   * @param opcode Payload opcode
   * @param data Payload data
   */
  sendPayload(opcode: number, data: unknown) {
    if (!this.socket) {
      throw new Error("No active socket connection.");
    }
    const payload = {
      d: data,
      op: opcode,
    };
    this.socket.send(JSON.stringify(payload));
  }
}
