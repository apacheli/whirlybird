import { decodeHex } from "../util/hex.js";
import { encodeUtf8 } from "../util/utf_8.js";

/**
 * Create a key. `publicKey` is your application's public key.
 *
 * @param {string} publicKey
 */
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

/**
 * Verify a key.
 *
 * @param {Cryptokey} cryptoKey
 * @param {string} signature
 * @param {string} timestamp
 * @param {string} body
 */
export const verify = (cryptoKey, signature, timestamp, body) =>
  crypto.subtle.verify(
    "Ed25519",
    cryptoKey,
    decodeHex(signature),
    encodeUtf8(timestamp + body),
  );
