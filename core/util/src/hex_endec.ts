const symbols = "0123456789abcdef";

const decimal: Record<string, number> = {};
const hex = new Array<string>(0x100);

for (let i = 0; i < 0x100; i++) {
  decimal[hex[i] = `${symbols[i >> 4 & 0xF]}${symbols[i & 0xF]}`] = i;
}

export const hexDecode = (str: string) => {
  const arr = new Uint8Array(str.length >> 1);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = decimal[str[i * 2] + str[i * 2 + 1]];
  }
  return arr;
};

export const hexEncode = (arr: Uint8Array) => {
  let str = "";
  for (let i = 0; i < arr.length; i++) {
    str += hex[arr[i]];
  }
  return str;
};
