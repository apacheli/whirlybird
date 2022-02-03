import { buildRequestBody } from "../../http/src/build_request_body.ts";
import {
  type Interaction,
  type InteractionCallbackData,
  InteractionCallbackType,
  InteractionType,
  SIGNATURE,
  TIMESTAMP,
} from "../../types/src/interactions/receiving_and_responding.ts";
import { HttpResponseCodes } from "../../types/src/topics/opcodes_and_status_codes.ts";
import { hexDecode } from "../../util/src/hex_endec.ts";
import { utf8Encode } from "../../util/src/utf8_endec.ts";
import { verify } from "../deps.ts";

export type Callback = (
  type: InteractionCallbackType,
  data?: InteractionCallbackData,
  files?: File[],
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

  const respond = (body: BodyInit, status: number, headers?: HeadersInit) =>
    respondWith(new Response(body, { headers, status }));

  if (
    !signature ||
    !timestamp ||
    request.headers.get("Content-Type") !== "application/json" ||
    request.method !== "POST"
  ) {
    return respond("Bad Request", HttpResponseCodes.BadRequest);
  }

  const body = await request.text();

  if (!validateRequest(publicKey, signature, timestamp, body)) {
    return respond("Unauthorized", HttpResponseCodes.Unauthorized);
  }

  const interaction: Interaction = JSON.parse(body);

  const callback: Callback = (type, data, files) =>
    respond(
      buildRequestBody({ data, type }, files),
      HttpResponseCodes.Ok,
      files?.length ? undefined : { "Content-Type": "application/json" },
    );

  switch (interaction.type) {
    case InteractionType.Ping: {
      await callback(InteractionCallbackType.Pong);
      break;
    }

    default: {
      handler(callback, interaction);
      break;
    }
  }
};

/** Check if a request is valid */
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
