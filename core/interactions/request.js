import { verifyKey } from "./key.js";

export const isBadRequest = (signature, timestamp, request) =>
  !signature ||
  !timestamp ||
  request.method !== "POST" ||
  request.headers.get("Content-Type") !== "application/json";

export const handleRequest = async (request, cryptoKey, handle) => {
  const signature = request.headers.get("X-Signature-Ed25519");
  const timestamp = request.headers.get("X-Signature-Timestamp");

  if (isBadRequest(signature, timestamp, request)) {
    return new Response("400 Bad Request", { status: 400 });
  }

  const text = await request.text();

  if (!await verifyKey(cryptoKey, signature, timestamp, text)) {
    return new Response("401 Unauthorized", { status: 401 });
  }

  const json = JSON.parse(text);

  return new Response(
    json.type === 1 ? '{"type":1}' : JSON.stringify(await handle(json)),
    { headers: { "Content-Type": "application/json" } },
  );
};
