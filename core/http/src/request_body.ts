export const requestBody = (body?: unknown, files?: File[]) => {
  if (files?.length) {
    const formData = new FormData();
    if (body !== undefined) {
      formData.append("payload_json", JSON.stringify(body));
    }
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      formData.append(`files[${i}]`, file, file.name);
    }
    return formData;
  }
  if (body !== undefined) {
    return JSON.stringify(body);
  }
};
