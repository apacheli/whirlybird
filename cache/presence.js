export const createPresence = (id, data) => updatePresence({ id }, data);

export const updatePresence = (presence, data) => {
  presence.status = data.status;
  presence.activities = data.activities;
  presence.clientStatus = data.client_status;
  return presence;
};
