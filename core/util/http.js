export const encodeBody = (data, files, headers) => {
  if (files?.length) {
    const f = new FormData();
    if (data) {
      f.append("payload_json", JSON.stringify(data));
    }
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      f.append(`files[${i}]`, file, file.name);
    }
    return f;
  }
  headers["Content-Type"] = "application/json";
  return JSON.stringify(data);
};

export const encodeQuery = (query) => {
  let str = "";
  for (const key in query) {
    str += `&${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`;
  }
  return str.substring(1);
};
