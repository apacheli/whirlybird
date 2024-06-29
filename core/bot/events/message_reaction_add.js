export default (bot, event) => {
  if (
    event.user_id === bot.config.developerId &&
    event.message_author_id === bot.cache.application.id &&
    event.emoji.name === "\u274c"
  ) {
    bot.rest.deleteMessage(event.channel_id, event.message_id);
  }
};
