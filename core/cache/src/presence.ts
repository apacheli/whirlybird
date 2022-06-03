import type {
  Activity,
  DispatchPayloadPresenceUpdateData,
} from "../../types/src/topics/gateway.ts";

enum CacheClientStatus {
  Desktop = 1 << 0,
  Mobile = 1 << 1,
  Web = 1 << 2,
}

const cacheStatusTypes = {
  online: 0,
  dnd: 1,
  idle: 2,
  invisible: 3,
  offline: 4,
};

export class CachePresence {
  id;

  activities!: Activity[];
  clientStatus!: number;
  since!: number | null;
  status!: number;

  constructor(data: DispatchPayloadPresenceUpdateData) {
    this.id = BigInt(data.user.id);

    this.__update__(data);
  }

  __update__(data: Partial<DispatchPayloadPresenceUpdateData>) {
    if (data.activities !== undefined) {
      this.activities = data.activities;
    }
    if (data.client_status !== undefined) {
      this.clientStatus = 0;
      if (data.client_status.desktop) {
        this.clientStatus |= CacheClientStatus.Desktop;
      }
      if (data.client_status.mobile) {
        this.clientStatus |= CacheClientStatus.Mobile;
      }
      if (data.client_status.web) {
        this.clientStatus |= CacheClientStatus.Web;
      }
    }
    if (data.since !== undefined) {
      this.since = data.since;
    }
    if (data.status !== undefined) {
      this.status = cacheStatusTypes[data.status];
    }
  }
}
