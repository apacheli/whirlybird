import { VoiceState } from "../../types/src/resources/voice.ts";
import type { DispatchPayloadVoiceServerUpdateData } from "../../types/src/topics/gateway.ts";
import { VoiceOpcodes } from "../../types/src/topics/opcodes_and_status_codes.ts";
import type { VoicePayload } from "../../types/src/topics/voice_connections.ts";
import { DiscordSocket } from "../../util/src/discord_socket.ts";
import { utf8Decode } from "../../util/src/utf8_endec.ts";

const ENCRYPTION_MODE = "xsalsa20_poly1305";

export class VoiceSocket extends DiscordSocket {
  hostname?: string;
  port?: number;
  ssrc?: number;
  udp?: Deno.DatagramConn;

  heartbeatInterval?: number;
  secretKey = new Uint8Array(32);

  constructor(
    public voiceServer: DispatchPayloadVoiceServerUpdateData,
    public voiceState: VoiceState,
  ) {
    super();
  }

  connect() {
    return super.connect(`wss://${this.voiceServer.endpoint}?v=4`);
  }

  onSocketClose(event: CloseEvent) {
    console.log("CLOSE", event);
  }

  onSocketError(event: Event | ErrorEvent) {
    console.log("ERROR", event);
  }

  async onSocketMessage(event: MessageEvent<string>) {
    const payload: VoicePayload = JSON.parse(event.data);
    console.log("VOICE MESSAGE", payload);

    switch (payload.op) {
      case VoiceOpcodes.Ready: {
        this.hostname = payload.d.ip;
        // this.modes = payload.d.modes;
        this.port = payload.d.port;
        this.ssrc = payload.d.ssrc;

        const udp = this.udp = Deno.listenDatagram({
          hostname: "0.0.0.0",
          port: 1234,
          transport: "udp",
        });
        await this.ipDiscovery();
        const [message] = await udp.receive();
        this.handleSelectProtocol(message);
        break;
      }

      case VoiceOpcodes.SessionDescription: {
        // this.mode = payload.d.mode;
        this.secretKey.set(payload.d.secret_key);
        break;
      }

      case VoiceOpcodes.Speaking: {
        console.log("someone is speaking", payload);
        break;
      }

      case VoiceOpcodes.Hello: {
        const delay = payload.d.heartbeat_interval;
        this.heartbeatInterval = setInterval(() => this.heartbeat(), delay);
        this.identify();
        break;
      }

      case VoiceOpcodes.Resumed: {
        console.log("Successfully resumed", payload);
        break;
      }

      case VoiceOpcodes.ClientDisconnect: {
        console.log("client disconnect", payload);
        break;
      }
    }
  }

  identify() {
    this.sendPayload(VoiceOpcodes.Identify, {
      server_id: this.voiceState.guild_id,
      session_id: this.voiceState.session_id,
      token: this.voiceServer.token,
      user_id: this.voiceState.user_id,
    });
  }

  selectProtocol(address: string, mode: string, port: number) {
    this.sendPayload(VoiceOpcodes.SelectProtocol, {
      data: { address, mode, port },
      protocol: "udp",
    });
  }

  heartbeat() {
    this.sendPayload(VoiceOpcodes.Heartbeat, Date.now());
  }

  speaking(speaking: boolean) {
    this.sendPayload(VoiceOpcodes.Speaking, {
      delay: 0,
      speaking,
      ssrc: this.ssrc,
    });
  }

  resume() {
    this.sendPayload(VoiceOpcodes.Resume, {
      server_id: this.voiceState.guild_id,
      session_id: this.voiceState.session_id,
      token: this.voiceServer.token,
    });
  }

  handleSelectProtocol(message: Uint8Array) {
    this.selectProtocol(
      utf8Decode(message.subarray(4, 16)),
      ENCRYPTION_MODE,
      new DataView(message.buffer).getUint16(68, false),
    );
  }

  ipDiscovery() {
    if (!this.ssrc) {
      throw new Error("Missing ssrc");
    }
    const payload = new Uint8Array(70);
    new DataView(payload.buffer).setUint32(0, this.ssrc);
    return this.udpSend(payload);
  }

  udpSend(payload: Uint8Array) {
    if (!(this.udp && this.hostname && this.port)) {
      throw new Error("Missing UDP socket, hostname, or port");
    }
    return this.udp.send(payload, {
      hostname: this.hostname,
      port: this.port,
      transport: "udp",
    });
  }

  sendPayload(opcode: number, data: unknown) {
    console.log("SENDING VOICE", opcode, data);
    return super.sendPayload(opcode, data);
  }
}
