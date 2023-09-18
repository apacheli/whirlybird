import { createKey, verify } from "./key.js";

export const startServer = async (port, publicKey, handle) => {
  const key = await createKey(publicKey);
  return Deno.serve({ port }, (request) => handleRequest(request, key, handle));
};

export const isBadRequest = (signature, timestamp, request) =>
  !signature ||
  !timestamp ||
  request.method !== "POST" ||
  request.headers.get("Content-Type") !== "application/json";

export const handleRequest = async (request, key, handle) => {
  const signature = request.headers.get("X-Signature-Ed25519");
  const timestamp = request.headers.get("X-Signature-Timestamp");

  if (isBadRequest(signature, timestamp, request)) {
    return new Response("Bad Request", { status: 400 });
  }

  const body = await request.text();

  if (!await verify(key, signature, timestamp, body)) {
    return new Response("Unauthorized", { status: 401 });
  }

  const data = JSON.parse(body);

  return Response.json(data.type === 1 ? { type: 1 } : await handle(data));
};
