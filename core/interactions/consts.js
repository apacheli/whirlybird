/** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-type */
export const InteractionType = {
  PING: 1,
  APPLICATION_COMMAND: 2,
  MESSAGE_COMPONENT: 3,
  APPLICATION_COMMAND_COMPLETE: 4,
  MODAL_SUBMIT: 5,
};

/** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-context-types */
export const InteractionContextType = {
  GUILD: 0,
  BOT_DM: 1,
  PRIVATE_CHANNEL: 2,
};

/** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type */
export const InteractionCallbackType = {
  PONG: 1,
  MESSAGE: 4,
  DEFERRED_MESSAGE: 5,
  DEFERRED_UPDATE: 6,
  UPDATE_MESSAGE: 7,
  APPLICATION_COMMAND_AUTOCOMPLETE_RESULT: 8,
  MODAL: 9,
  PREMIUM_REQUIRED: 10,
};

/** https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types */
export const ApplicationCommandType = {
  CHAT_INPUT: 1,
  USER: 2,
  MESSAGE: 3,
};

/** https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type */
export const ApplicationCommandOptionType = {
  SUB_COMMAND: 1,
  SUB_COMMAND_GROUP: 2,
  STRING: 3,
  INTEGER: 4,
  BOOLEAN: 5,
  USER: 7,
  CHANNEL: 7,
  ROLE: 8,
  MENTIONABLE: 9,
  NUMBER: 10,
  ATTACHMENT: 11,
};

/** https://discord.com/developers/docs/interactions/application-commands#application-command-permissions-object-application-command-permission-type */
export const ApplicationCommandPermissionType = {
  ROLE: 1,
  USER: 2,
  CHANNEL: 3,
};

/** https://discord.com/developers/docs/interactions/message-components#component-object-component-types */
export const ComponentType = {
  ACTION_ROW: 1,
  BUTTON: 2,
  STRING_SELECT: 3,
  TEXT_INPUT: 4,
  USER_SELECT: 5,
  ROLE_SELECT: 6,
  MENTIONABLE_SELECT: 7,
  CHANNEL_SELECT: 8,
};

/** https://discord.com/developers/docs/interactions/message-components#button-object-button-styles */
export const ButtonStyle = {
  PRIMARY: 1,
  SECONDARY: 2,
  SUCCESS: 3,
  DANGER: 4,
  LINK: 5,
  PREMIUM: 6,
};

/** https://discord.com/developers/docs/interactions/message-components#text-input-object-text-input-styles */
export const TextInputStyle = {
  SHORT: 1,
  PARAGRAPH: 2,
};
