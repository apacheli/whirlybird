import { encodeBody } from "../util/http.js";
import { createKey, verify } from "./key.js";

/**
 * Start a server.
 *
 * @param {number} port
 * @param {string} publicKey
 * @param {(interaction: unknown) => unknown} handle
 */
export const startServer = async (port, publicKey, handle) => {
  const key = await createKey(publicKey);
  return Deno.serve({ port }, (request) => handleRequest(request, key, handle));
};

/**
 * Determine if a request is bad. Use before `verify()`.
 *
 * @param {string | null} signature
 * @param {string | null} timestamp
 * @param {Request} request
 */
export const isBadRequest = (signature, timestamp, request) =>
  !signature ||
  !timestamp ||
  request.method !== "POST" ||
  request.headers.get("Content-Type") !== "application/json";

/**
 * Handle a request.
 *
 * @param {Request} request
 * @param {CryptoKey} key
 * @param {(interaction: unknown) => unknown} handle
 */
export const handleRequest = async (request, key, handle) => {
  const signature = request.headers.get("X-Signature-Ed25519");
  const timestamp = request.headers.get("X-Signature-Timestamp");

  if (isBadRequest(signature, timestamp, request)) {
    return new Response("Bad Request", { status: 400 });
  }

  const text = await request.text();

  if (!await verify(key, signature, timestamp, text)) {
    return new Response("Unauthorized", { status: 401 });
  }

  const json = JSON.parse(text);

  if (json.type === 1) {
    return Response.json({ type: 1 });
  }

  const { data, files } = await handle(json);
  const headers = {};
  return new Response(encodeBody(data, files, headers), { headers });
};
