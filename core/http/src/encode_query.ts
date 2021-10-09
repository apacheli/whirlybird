export type Query = Record<string, string | number | boolean>;

export const encodeQuery = (query: Query) => {
  let str = "";
  for (const key in query) {
    str += `&${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`;
  }
  return str.substring(1);
};
