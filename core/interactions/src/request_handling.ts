import { requestBody } from "../../http/src/request_body.ts";
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
import type { Awaitable } from "../../util/src/types.ts";
import { utf8Encode } from "../../util/src/utf8_endec.ts";
import { verify } from "../deps.ts";

export type Callback = (
  type: InteractionCallbackType,
  data?: InteractionCallbackData,
  files?: File[],
) => Promise<void>;

export type Handler = (
  callback: Callback,
  interaction: Interaction,
) => Awaitable<void>;

/** Handle a request event. */
export const handleRequestEvent = async (
  publicKey: string,
  { request, respondWith }: Deno.RequestEvent,
  handler: Handler,
) => {
  const signature = request.headers.get(SIGNATURE);
  const timestamp = request.headers.get(TIMESTAMP);

  const respond = (status: number, body?: BodyInit, headers?: HeadersInit) =>
    respondWith(new Response(body, { headers, status }));

  if (
    !signature ||
    !timestamp ||
    request.headers.get("Content-Type") !== "application/json" ||
    request.method !== "POST"
  ) {
    return respond(HttpResponseCodes.BadRequest, "400 Bad Request");
  }

  const body = await request.text();

  if (!verifyRequest(publicKey, signature, timestamp, body)) {
    return respond(HttpResponseCodes.Unauthorized, "401 Unauthorized");
  }

  const interaction: Interaction = JSON.parse(body);

  const callback: Callback = (type, data, files) =>
    respond(
      HttpResponseCodes.Ok,
      requestBody({ data, type }, files),
      files?.length ? undefined : { "Content-Type": "application/json" },
    );

  if (interaction.type === InteractionType.Ping) {
    await callback(InteractionCallbackType.Pong);
  } else {
    await handler(callback, interaction);
  }
};

/** Run a request through a verification test. */
export const verifyRequest = (
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
