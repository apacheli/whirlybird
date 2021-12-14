import {
  InteractionCallbackType,
  InteractionType,
  SIGNATURE,
  TIMESTAMP,
} from "../../types/src/interactions/receiving_and_responding.ts";
import type {
  Interaction,
  InteractionCallbackData,
} from "../../types/src/interactions/receiving_and_responding.ts";
import { hexDecode, utf8Encode } from "../../util/mod.ts";
import { verify } from "../deps.ts";

export type Callback = (
  type: InteractionCallbackType,
  data?: InteractionCallbackData,
) => Promise<void>;

export type Handler = (callback: Callback, interaction: Interaction) => void;

/** Handle a request event */
export const handleRequestEvent = async (
  publicKey: string,
  { request, respondWith }: Deno.RequestEvent,
  handler: Handler,
) => {
  const signature = request.headers.get(SIGNATURE);
  const timestamp = request.headers.get(TIMESTAMP);

  const respond = (body: string, status: number, headers?: HeadersInit) =>
    respondWith(new Response(body, { headers, status }));

  if (
    !signature ||
    !timestamp ||
    request.headers.get("Content-Type") !== "application/json" ||
    request.method !== "POST"
  ) {
    return respond("Bad Request", 400);
  }

  const body = await request.text();

  if (!validateRequest(publicKey, signature, timestamp, body)) {
    return respond("Unauthorized", 401);
  }

  const interaction: Interaction = JSON.parse(body);

  const callback: Callback = (type, data) =>
    respond(JSON.stringify({ data, type }), 200, {
      "Content-Type": "application/json",
    });

  switch (interaction.type) {
    case InteractionType.Ping: {
      callback(InteractionCallbackType.Pong);
      break;
    }

    default: {
      handler(callback, interaction);
      break;
    }
  }
};

/** Check the validity of a request */
export const validateRequest = (
  publicKey: string,
  signature: string,
  timestamp: string,
  body: string,
) =>
  verify(
    hexDecode(publicKey),
    hexDecode(signature),
    utf8Encode(timestamp + body),
  );
