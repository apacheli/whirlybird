export const createPresence = (data) => updatePresence({}, data);

export const updatePresence = (presence, data) => {
  presence.status = PresenceStatus[data.status];
  presence.activities = data.activities;
  presence.clientStatus = 0;
  if (data.client_status.desktop !== undefined) {
    presence.clientStatus |= PresenceClientStatusFlags.DESKTOP;
  }
  if (data.client_status.mobile !== undefined) {
    presence.clientStatus |= PresenceClientStatusFlags.MOBILE;
  }
  if (data.client_status.web !== undefined) {
    presence.clientStatus |= PresenceClientStatusFlags.WEB;
  }
  return presence;
};

export const PresenceStatus = {
  "online": 0,
  "idle": 1,
  "dnd": 2,
};

export const PresenceClientStatusFlags = {
  DESKTOP: 1 << 0,
  MOBILE: 1 << 1,
  WEB: 1 << 2,
};
