import { decodeHex } from "./hex.js";
import { encodeText } from "./text.js";

export const createKey = (publicKey) =>
  crypto.subtle.importKey(
    "raw",
    decodeHex(publicKey),
    {
      name: "Ed25519",
      namedCurve: "Ed25519",
      public: true,
    },
    true,
    ["verify"],
  );

export const verifyKey = (cryptoKey, signature, timestamp, body) =>
  crypto.subtle.verify(
    "Ed25519",
    cryptoKey,
    decodeHex(signature),
    encodeText(timestamp + body),
  );
