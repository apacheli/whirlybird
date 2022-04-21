// https://discord.dev/reference

/** https://discord.dev/reference#api-reference-base-url */
export const BaseUrl = "https://discord.com/api";

/** https://discord.dev/reference#api-versioning */
export type ApiVersions = 8 | 9;

/** https://discord.dev/reference#snowflakes */
export type Snowflake = `${bigint}`;

/** https://discord.dev/reference#image-formatting-image-base-url */
export const ImageBaseUrl = "https://cdn.discordapp.com";

/** https://discord.dev/reference#image-formatting-image-formats */
export type ImageSizes = 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096;

/** https://discord.dev/reference#image-formatting-image-formats */
export type ImageFormats = "jpeg" | "png" | "webp" | "gif" | "json";

/** https://discord.dev/reference#locales */
export type AcceptedLocales =
  | "en-US" // English (United States)
  | "en-GB" // English (Great Britain)
  | "bg" // Bulgarian
  | "zh-CN" // Chinese (China)
  | "zh-TW" // Chinese (Taiwan)
  | "hr" // Croatian
  | "cs" // Czech
  | "da" // Danish
  | "nl" // Dutch
  | "fi" // Finnish
  | "fr" // French
  | "de" // German
  | "el" // Greek
  | "hi" // Hindi
  | "hu" // Hungarian
  | "it" // Italian
  | "ja" // Japanese
  | "ko" // Korean
  | "lt" // Lithuanian
  | "no" // Norwegian
  | "pl" // Polish
  | "pt-BR" // Portuguese (Brazil)
  | "ro" // Romanian
  | "ru" // Russian
  | "es-ES" // Spanish (Spain)
  | "sv-SE" // Swedish
  | "th" // Thai
  | "tr" // Turkish
  | "uk" // Ukrainian
  | "vi"; // Vietnamese
