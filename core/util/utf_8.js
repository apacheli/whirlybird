export const decodeUtf8 = TextDecoder.prototype.decode.bind(new TextDecoder());
export const encodeUtf8 = TextEncoder.prototype.encode.bind(new TextEncoder());
