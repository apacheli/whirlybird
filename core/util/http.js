export const encodeBody = (body, files, headers) => {
  if (files?.length) {
    const f = new FormData();
    if (body) {
      f.append("payload_json", JSON.stringify(body));
    }
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      f.append(`files[${i}]`, file, file.name);
    }
    return f;
  }
  headers["Content-Type"] = "application/json";
  return JSON.stringify(body);
};

export const encodeQuery = (query) => {
  let str = "";
  for (const key in query) {
    str += `&${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`;
  }
  return str.substring(1);
};
