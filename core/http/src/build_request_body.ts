/** Build a request body for a HTTP request */
export const buildRequestBody = (body?: unknown, files?: File[]) => {
  if (files?.length) {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      formData.append(`files[${i}]`, file, file.name);
    }
    if (body) {
      formData.append("payload_json", JSON.stringify(body));
    }
    return formData;
  }
  return JSON.stringify(body);
};
