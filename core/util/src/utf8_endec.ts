export const utf8Decode =
  ((decoder) => (input: BufferSource) => decoder.decode(input))(
    new TextDecoder(),
  );

export const utf8Encode =
  ((encoder) => (input: string) => encoder.encode(input))(new TextEncoder());
