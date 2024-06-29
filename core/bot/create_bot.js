import { CacheClient } from "../cache/cache_client.js";
import { GatewayClient } from "../gateway/gateway_client.js";
import { RestClient } from "../rest/rest_client.js";
import { EventDispatcher } from "../util/event_dispatcher.js";

import _args from "./commands/args.js";
import _date from "./commands/date.js";
import _error from "./commands/error.js";
import _events from "./commands/events.js";
import _help from "./commands/help.js";
import _info from "./commands/info.js";
import _js from "./commands/js.js";
import _ping from "./commands/ping.js";

import _messageCreate from "./events/message_create.js";
import _messageReactionAdd from "./events/message_reaction_add.js";

export const createBot = (token, options) => {
  const dispatcher = new EventDispatcher();
  dispatcher.listen("MESSAGE_CREATE", _messageCreate);
  dispatcher.listen("MESSAGE_REACTION_ADD", _messageReactionAdd);
  const bot = {
    cache: new CacheClient(options.cache),
    commands: new Map()
      .set("args", _args)
      .set("date", _date)
      .set("error", _error)
      .set("events", _events)
      .set("help", _help)
      .set("info", _info)
      .set("js", _js)
      .set("ping", _ping),
    config: options.config,
    dispatcher,
    receivedEvents: {},
    gateway: new GatewayClient(token, {
      handleEvent: (event, data, shard) => {
        bot.receivedEvents[event] = (bot.receivedEvents[event] ?? 0) + 1;
        bot.cache.handleEvent(event, data);
        bot.dispatcher.dispatch(event, bot, data, shard);
      },
      ...options.gateway,
    }),
    rest: new RestClient(token, options.rest),
  };
  return bot;
};
