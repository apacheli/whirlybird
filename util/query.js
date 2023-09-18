export const encodeQuery = (query) => {
  let str = "";
  for (const key in query) {
    str += `&${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`;
  }
  return str.substring(1);
};
