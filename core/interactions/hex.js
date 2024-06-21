const s = "0123456789abcdef";
const b10 = {};
const b16 = new Array(0x100);
for (let i = 0; i < 0x100; i++) {
  b10[b16[i] = `${s[i >> 4 & 0xf]}${s[i & 0xf]}`] = i;
}

export const decodeHex = (str) => {
  const len = str.length / 2;
  const arr = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    arr[i] = b10[str[i * 2] + str[i * 2 + 1]];
  }
  return arr;
};

export const encodeHex = (arr) => {
  let str = "";
  for (let i = 0, j = arr.length; i < j; i++) {
    str += b16[arr[i]];
  }
  return str;
};
