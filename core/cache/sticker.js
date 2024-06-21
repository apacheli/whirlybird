export const createSticker = (data) =>
  updateSticker({
    id: BigInt(data.id),
  }, data);

export const updateSticker = (sticker, data) => {
  if (data.pack_id !== undefined) {
    sticker.packId = BigInt(data.pack_id);
  }
  sticker.name = data.name;
  sticker.description = data.description;
  sticker.tags = data.tags;
  sticker.type = data.type;
  sticker.formatType = data.format_type;
  if (data.available !== undefined) {
    sticker.available = data.available;
  }
  if (data.sort_value !== undefined) {
    sticker.sortValue = data.sort_value;
  }
  return sticker;
};

export const StickerType = {
  STANDARD: 1,
  GUILD: 2,
};

export const StickerFormatType = {
  PING: 1,
  APNG: 2,
  LOTTIE: 3,
  GIF: 4,
};
