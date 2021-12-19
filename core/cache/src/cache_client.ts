import {
  type DispatchPayload,
  GatewayEvents,
} from "../../types/src/topics/gateway.ts";
import { MESSAGE_LIMIT } from "./constants.ts";
import { DataMessage } from "./data_structures/data_message.ts";
import { DataUser } from "./data_structures/data_user.ts";
import { LimitMap } from "./limit_map.ts";

export interface CacheClientOptions {
  messages?: boolean;
  messageLimit?: number;
  users?: boolean;
}

export class CacheClient {
  messages = new Map<bigint, Map<bigint, DataMessage>>();
  users = new Map<bigint, DataUser>();

  constructor(public options?: CacheClientOptions) {
  }

  update(payload: DispatchPayload) {
    switch (payload.t) {
      case GatewayEvents.MessageCreate: {
        if (this.options?.messages === false) {
          return;
        }

        const message = new DataMessage(payload.d);
        let messages = this.messages.get(message.channelId);
        if (!messages) {
          messages = new LimitMap(this.options?.messageLimit ?? MESSAGE_LIMIT);
          this.messages.set(message.channelId, messages);
        }
        messages.set(message.id, message);

        if (this.options?.users !== false) {
          const user = this.users.get(message.authorId);
          user?.update(payload.d.author);
          if (!user) {
            this.users.set(message.authorId, new DataUser(payload.d.author));
          }
        }
        break;
      }

      case GatewayEvents.MessageUpdate: {
        if (this.options?.messages === false) {
          return;
        }

        const message = this.messages
          .get(BigInt(payload.d.channel_id))
          ?.get(BigInt(payload.d.id));
        message?.update(payload.d);

        if (this.options?.users !== false) {
          const authorId = message?.authorId ?? BigInt(payload.d.author.id);
          const user = this.users.get(authorId);
          user?.update(payload.d.author);
          if (!user) {
            this.users.set(authorId, new DataUser(payload.d.author));
          }
        }
        break;
      }

      case GatewayEvents.MessageDelete: {
        if (this.options?.messages === false) {
          return;
        }

        this.messages
          .get(BigInt(payload.d.channel_id))
          ?.delete(BigInt(payload.d.id));
        break;
      }

      case GatewayEvents.UserUpdate: {
        if (this.options?.users === false) {
          return;
        }

        if (!this.users.get(BigInt(payload.d.id))) {
          const user = new DataUser(payload.d);
          this.users.set(user.id, user);
        }
        break;
      }
    }
  }
}
