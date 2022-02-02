/** Build a HTTP request body */
export const requestData = (body?: unknown, files?: File[]) => {
  if (files?.length) {
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      data.append(`files[${i}]`, file, file.name);
    }
    if (body) {
      data.append("payload_json", JSON.stringify(body));
    }
    return { data };
  }
  return { data: JSON.stringify(body), contentType: "application/json" };
};
