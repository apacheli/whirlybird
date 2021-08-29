import {
  InteractionCallbackType,
  InteractionType,
} from "../../types/src/interactions/receiving_and_responding.ts";
import type {
  Interaction,
  InteractionCallbackData,
} from "../../types/src/interactions/receiving_and_responding.ts";
import { hexDecode } from "../../util/src/hex_endec.ts";
import { utf8Encode } from "../../util/src/utf8_endec.ts";
import { verify } from "../deps.ts";

export type Callback = (
  type: InteractionCallbackType,
  data?: InteractionCallbackData,
) => Promise<void>;

/** Interactions client */
export class InteractionsClient {
  /**
   * @param publicKey Bot application public key
   * @param handler Interaction handler
   */
  constructor(
    public publicKey: string,
    public handler: (interaction: Interaction, callback: Callback) => void,
  ) {
  }

  /** Handle a request event */
  async handleRequestEvent({ request, respondWith }: Deno.RequestEvent) {
    const respond = (body: string, status: number, headers?: HeadersInit) =>
      respondWith(new Response(body, { headers, status }));

    const contentType = request.headers.get("Content-Type");
    const signature = request.headers.get("X-Signature-Ed25519");
    const timestamp = request.headers.get("X-Signature-Timestamp");

    if (
      !signature ||
      !timestamp ||
      contentType !== "application/json" ||
      request.method !== "POST"
    ) {
      return respond("Bad Request", 400);
    }

    const body = await request.text();

    if (!this.validateRequest(signature, timestamp, body)) {
      return respond("Unauthorized", 401);
    }

    const interaction: Interaction = JSON.parse(body);

    const callback = (
      type: InteractionCallbackType,
      data?: InteractionCallbackData,
    ) =>
      respond(JSON.stringify({ data, type }), 200, {
        "Content-Type": "application/json",
      });

    switch (interaction.type) {
      case InteractionType.Ping: {
        callback(InteractionCallbackType.Pong);
        break;
      }

      default: {
        this.handler(interaction, callback);
        break;
      }
    }
  }

  /**
   * Validate a request
   * @param signature The request header `X-Signature-Ed25519`
   * @param timestamp The request header `X-Signature-Timestamp`
   * @param body The request body
   */
  validateRequest(signature: string, timestamp: string, body: string) {
    return verify(
      hexDecode(this.publicKey),
      hexDecode(signature),
      utf8Encode(timestamp + body),
    );
  }
}
