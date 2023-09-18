import { encodeQuery } from "../util/query.js";
import { RateLimit } from "../util/rate_limit.js";
import { HttpError } from "./http_error.js";

export class RestClient {
  buckets = new Map();
  rateLimits = new Map();
  token;

  constructor(token) {
    this.token = token;
  }

  resetRateLimits() {
    for (const rateLimits of this.rateLimits.values()) {
      for (const [rateLimitId, rateLimit] of rateLimits) {
        if (rateLimit.isOutdated()) {
          rateLimits.delete(rateLimitId);
        }
      }
    }
  }

  async request(method, pathname, bucketId, rateLimitId, { body, files, query, reason } = {}) {
    const headers = {
      "Authorization": this.token,
      "User-Agent": "whirlybird/0.0.1",
    };
    if (reason) {
      headers["X-Audit-Log-Reason"] = reason;
    }

    let b;
    if (files) {
      b = new FormData();
      if (body) {
        b.append("payload_json", JSON.stringify(body));
      }
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        b.append(`files[${i}]`, file, file.name);
      }
    } else if (body) {
      b = JSON.stringify(body);
      headers["Content-Type"] = "application/json";
    }

    let url = `https://discord.com/api/v10${pathname}`;
    if (query) {
      url += `?${encodeQuery(query)}`;
    }

    const bucket = this.buckets.get(bucketId);
    let rateLimit, rateLimits;
    if (bucket) {
      rateLimits = this.rateLimits.get(bucket);
      rateLimit = rateLimits.get(rateLimitId);
      await rateLimit?.lock();
    }

    let attempts = 5, response;
    do {
      response = await fetch(url, { body: b, headers, method });
      const newBucket = response.headers.get("X-RateLimit-Bucket");
      if (newBucket) {
        this.buckets.set(bucketId, newBucket);
        if (!rateLimits) {
          rateLimits = new Map();
          this.rateLimits.set(newBucket, rateLimits);
        }
        if (!rateLimit) {
          rateLimit = new RateLimit();
          rateLimits.set(rateLimitId, rateLimit);
        }
        rateLimit.update(
          Date.parse(response.headers.get("Date")),
          +response.headers.get("X-RateLimit-Limit"),
          +response.headers.get("X-RateLimit-Remaining"),
          +response.headers.get("X-RateLimit-Reset-After") * 1e+3,
        );
        if (response.status === 429) {
          const retryAfter = +response.headers.get("Retry-After") * 1e+3;
          await new Promise((resolve) => setTimeout(resolve, retryAfter));
          continue;
        }
        rateLimit.unlock();
        break;
      }
    } while (--attempts);
    if (response.ok) {
      return response.headers.get("Content-Type") === "application/json" ? response.json() : response.text();
    }
    throw new HttpError(await response.json());
  }

  getMyOauth2Application() {
    return this.request("GET", "/oauth2/applications/@me", "getMyOauth2Application", "");
  }

  listMyConnections() {
    return this.request("GET", "/users/@me/connections", "listMyConnections", "");
  }

  createDm(options) {
    return this.request("POST", "/users/@me/channels", "createDm", "", options);
  }

  listMyGuilds(options) {
    return this.request("GET", "/users/@me/guilds", "listMyGuilds", "", options);
  }

  getMyApplication() {
    return this.request("GET", "/applications/@me", "getMyApplication", "");
  }

  updateMyApplication(options) {
    return this.request("PATCH", "/applications/@me", "updateMyApplication", "", options);
  }

  getBotGateway() {
    return this.request("GET", "/gateway/bot", "getBotGateway", "");
  }

  getMyOauth2Authorization() {
    return this.request("GET", "/oauth2/@me", "getMyOauth2Authorization", "");
  }

  listVoiceRegions() {
    return this.request("GET", "/voice/regions", "listVoiceRegions", "");
  }

  getMyUser() {
    return this.request("GET", "/users/@me", "getMyUser", "");
  }

  updateMyUser(options) {
    return this.request("PATCH", "/users/@me", "updateMyUser", "", options);
  }

  createStageInstance(options) {
    return this.request("POST", "/stage-instances", "createStageInstance", "", options);
  }

  listStickerPacks() {
    return this.request("GET", "/sticker-packs", "listStickerPacks", "");
  }

  getGateway() {
    return this.request("GET", "/gateway", "getGateway", "");
  }

  createGuild(options) {
    return this.request("POST", "/guilds", "createGuild", "", options);
  }

  listMyPrivateArchivedThreads(channelId, options) {
    return this.request("GET", `/channels/${channelId}/users/@me/threads/archived/private`, "listMyPrivateArchivedThreads", `${channelId}`, options);
  }

  listGuildApplicationCommandPermissions(applicationId, guildId) {
    return this.request("GET", `/applications/${applicationId}/guilds/${guildId}/commands/permissions`, "listGuildApplicationCommandPermissions", `${guildId}`);
  }

  getGuildApplicationCommandPermissions(applicationId, guildId, commandId) {
    return this.request("GET", `/applications/${applicationId}/guilds/${guildId}/commands/${commandId}/permissions`, "getGuildApplicationCommandPermissions", `${guildId}`);
  }

  setGuildApplicationCommandPermissions(applicationId, guildId, commandId, options) {
    return this.request("PUT", `/applications/${applicationId}/guilds/${guildId}/commands/${commandId}/permissions`, "setGuildApplicationCommandPermissions", `${guildId}`, options);
  }

  deleteMyMessageReaction(channelId, messageId, emojiName) {
    return this.request("DELETE", `/channels/${channelId}/messages/${messageId}/reactions/${emojiName}/@me`, "deleteMyMessageReaction", `${channelId}`);
  }

  addMyMessageReaction(channelId, messageId, emojiName) {
    return this.request("PUT", `/channels/${channelId}/messages/${messageId}/reactions/${emojiName}/@me`, "addMyMessageReaction", `${channelId}`);
  }

  listPrivateArchivedThreads(channelId, options) {
    return this.request("GET", `/channels/${channelId}/threads/archived/private`, "listPrivateArchivedThreads", `${channelId}`, options);
  }

  listPublicArchivedThreads(channelId, options) {
    return this.request("GET", `/channels/${channelId}/threads/archived/public`, "listPublicArchivedThreads", `${channelId}`, options);
  }

  getApplicationUserRoleConnection(applicationId) {
    return this.request("GET", `/users/@me/applications/${applicationId}/role-connection`, "getApplicationUserRoleConnection", "");
  }

  updateApplicationUserRoleConnection(applicationId, options) {
    return this.request("PUT", `/users/@me/applications/${applicationId}/role-connection`, "updateApplicationUserRoleConnection", "", options);
  }

  getMyGuildMember(guildId) {
    return this.request("GET", `/users/@me/guilds/${guildId}/member`, "getMyGuildMember", `${guildId}`);
  }

  getApplicationRoleConnectionsMetadata(applicationId) {
    return this.request("GET", `/applications/${applicationId}/role-connections/metadata`, "getApplicationRoleConnectionsMetadata", "");
  }

  updateApplicationRoleConnectionsMetadata(applicationId, options) {
    return this.request("PUT", `/applications/${applicationId}/role-connections/metadata`, "updateApplicationRoleConnectionsMetadata", "", options);
  }

  deleteGuildApplicationCommand(applicationId, guildId, commandId) {
    return this.request("DELETE", `/applications/${applicationId}/guilds/${guildId}/commands/${commandId}`, "deleteGuildApplicationCommand", `${guildId}`);
  }

  getGuildApplicationCommand(applicationId, guildId, commandId) {
    return this.request("GET", `/applications/${applicationId}/guilds/${guildId}/commands/${commandId}`, "getGuildApplicationCommand", `${guildId}`);
  }

  updateGuildApplicationCommand(applicationId, guildId, commandId, options) {
    return this.request("PATCH", `/applications/${applicationId}/guilds/${guildId}/commands/${commandId}`, "updateGuildApplicationCommand", `${guildId}`, options);
  }

  listGuildApplicationCommands(applicationId, guildId, options) {
    return this.request("GET", `/applications/${applicationId}/guilds/${guildId}/commands`, "listGuildApplicationCommands", `${guildId}`, options);
  }

  createGuildApplicationCommand(applicationId, guildId, options) {
    return this.request("POST", `/applications/${applicationId}/guilds/${guildId}/commands`, "createGuildApplicationCommand", `${guildId}`, options);
  }

  bulkSetGuildApplicationCommands(applicationId, guildId, options) {
    return this.request("PUT", `/applications/${applicationId}/guilds/${guildId}/commands`, "bulkSetGuildApplicationCommands", `${guildId}`, options);
  }

  leaveThread(channelId) {
    return this.request("DELETE", `/channels/${channelId}/thread-members/@me`, "leaveThread", `${channelId}`);
  }

  joinThread(channelId) {
    return this.request("PUT", `/channels/${channelId}/thread-members/@me`, "joinThread", `${channelId}`);
  }

  bulkDeleteMessages(channelId, options) {
    return this.request("POST", `/channels/${channelId}/messages/bulk-delete`, "bulkDeleteMessages", `${channelId}`, options);
  }

  deleteUserMessageReaction(channelId, messageId, emojiName, userId) {
    return this.request("DELETE", `/channels/${channelId}/messages/${messageId}/reactions/${emojiName}/${userId}`, "deleteUserMessageReaction", `${channelId}`);
  }

  deleteAllMessageReactionsByEmoji(channelId, messageId, emojiName) {
    return this.request("DELETE", `/channels/${channelId}/messages/${messageId}/reactions/${emojiName}`, "deleteAllMessageReactionsByEmoji", `${channelId}`);
  }

  listMessageReactionsByEmoji(channelId, messageId, emojiName, options) {
    return this.request("GET", `/channels/${channelId}/messages/${messageId}/reactions/${emojiName}`, "listMessageReactionsByEmoji", `${channelId}`, options);
  }

  deleteAllMessageReactions(channelId, messageId) {
    return this.request("DELETE", `/channels/${channelId}/messages/${messageId}/reactions`, "deleteAllMessageReactions", `${channelId}`);
  }

  crosspostMessage(channelId, messageId) {
    return this.request("POST", `/channels/${channelId}/messages/${messageId}/crosspost`, "crosspostMessage", `${channelId}`);
  }

  createThreadFromMessage(channelId, messageId, options) {
    return this.request("POST", `/channels/${channelId}/messages/${messageId}/threads`, "createThreadFromMessage", `${channelId}`, options);
  }

  deleteOriginalWebhookMessage(webhookId, webhookToken, options) {
    return this.request("DELETE", `/webhooks/${webhookId}/${webhookToken}/messages/@original`, "deleteOriginalWebhookMessage", `${webhookId}${webhookToken}`, options);
  }

  getOriginalWebhookMessage(webhookId, webhookToken, options) {
    return this.request("GET", `/webhooks/${webhookId}/${webhookToken}/messages/@original`, "getOriginalWebhookMessage", `${webhookId}${webhookToken}`, options);
  }

  updateOriginalWebhookMessage(webhookId, webhookToken, options) {
    return this.request("PATCH", `/webhooks/${webhookId}/${webhookToken}/messages/@original`, "updateOriginalWebhookMessage", `${webhookId}${webhookToken}`, options);
  }

  listGuildScheduledEventUsers(guildId, guildScheduledEventId, options) {
    return this.request("GET", `/guilds/${guildId}/scheduled-events/${guildScheduledEventId}/users`, "listGuildScheduledEventUsers", `${guildId}`, options);
  }

  deleteAutoModerationRule(guildId, ruleId) {
    return this.request("DELETE", `/guilds/${guildId}/auto-moderation/rules/${ruleId}`, "deleteAutoModerationRule", `${guildId}`);
  }

  getAutoModerationRule(guildId, ruleId) {
    return this.request("GET", `/guilds/${guildId}/auto-moderation/rules/${ruleId}`, "getAutoModerationRule", `${guildId}`);
  }

  updateAutoModerationRule(guildId, ruleId, options) {
    return this.request("PATCH", `/guilds/${guildId}/auto-moderation/rules/${ruleId}`, "updateAutoModerationRule", `${guildId}`, options);
  }

  listAutoModerationRules(guildId) {
    return this.request("GET", `/guilds/${guildId}/auto-moderation/rules`, "listAutoModerationRules", `${guildId}`);
  }

  createAutoModerationRule(guildId, options) {
    return this.request("POST", `/guilds/${guildId}/auto-moderation/rules`, "createAutoModerationRule", `${guildId}`, options);
  }

  updateSelfVoiceState(guildId, options) {
    return this.request("PATCH", `/guilds/${guildId}/voice-states/@me`, "updateSelfVoiceState", `${guildId}`, options);
  }

  searchGuildMembers(guildId, options) {
    return this.request("GET", `/guilds/${guildId}/members/search`, "searchGuildMembers", `${guildId}`, options);
  }

  getActiveGuildThreads(guildId) {
    return this.request("GET", `/guilds/${guildId}/threads/active`, "getActiveGuildThreads", `${guildId}`);
  }

  updateMyGuildMember(guildId, options) {
    return this.request("PATCH", `/guilds/${guildId}/members/@me`, "updateMyGuildMember", `${guildId}`, options);
  }

  deleteGuildMemberRole(guildId, userId, roleId) {
    return this.request("DELETE", `/guilds/${guildId}/members/${userId}/roles/${roleId}`, "deleteGuildMemberRole", `${guildId}`);
  }

  addGuildMemberRole(guildId, userId, roleId) {
    return this.request("PUT", `/guilds/${guildId}/members/${userId}/roles/${roleId}`, "addGuildMemberRole", `${guildId}`);
  }

  leaveGuild(guildId) {
    return this.request("DELETE", `/users/@me/guilds/${guildId}`, "leaveGuild", `${guildId}`);
  }

  deleteApplicationCommand(applicationId, commandId) {
    return this.request("DELETE", `/applications/${applicationId}/commands/${commandId}`, "deleteApplicationCommand", "");
  }

  getApplicationCommand(applicationId, commandId) {
    return this.request("GET", `/applications/${applicationId}/commands/${commandId}`, "getApplicationCommand", "");
  }

  updateApplicationCommand(applicationId, commandId, options) {
    return this.request("PATCH", `/applications/${applicationId}/commands/${commandId}`, "updateApplicationCommand", "", options);
  }

  listApplicationCommands(applicationId, options) {
    return this.request("GET", `/applications/${applicationId}/commands`, "listApplicationCommands", "", options);
  }

  createApplicationCommand(applicationId, options) {
    return this.request("POST", `/applications/${applicationId}/commands`, "createApplicationCommand", "", options);
  }

  bulkSetApplicationCommands(applicationId, options) {
    return this.request("PUT", `/applications/${applicationId}/commands`, "bulkSetApplicationCommands", "", options);
  }

  createInteractionResponse(interactionId, interactionToken, options) {
    return this.request("POST", `/interactions/${interactionId}/${interactionToken}/callback`, "createInteractionResponse", `${interactionId}${interactionToken}`, options);
  }

  deleteThreadMember(channelId, userId) {
    return this.request("DELETE", `/channels/${channelId}/thread-members/${userId}`, "deleteThreadMember", `${channelId}`);
  }

  getThreadMember(channelId, userId, options) {
    return this.request("GET", `/channels/${channelId}/thread-members/${userId}`, "getThreadMember", `${channelId}`, options);
  }

  addThreadMember(channelId, userId) {
    return this.request("PUT", `/channels/${channelId}/thread-members/${userId}`, "addThreadMember", `${channelId}`);
  }

  listThreadMembers(channelId, options) {
    return this.request("GET", `/channels/${channelId}/thread-members`, "listThreadMembers", `${channelId}`, options);
  }

  deleteChannelPermissionOverwrite(channelId, overwriteId) {
    return this.request("DELETE", `/channels/${channelId}/permissions/${overwriteId}`, "deleteChannelPermissionOverwrite", `${channelId}`);
  }

  setChannelPermissionOverwrite(channelId, overwriteId, options) {
    return this.request("PUT", `/channels/${channelId}/permissions/${overwriteId}`, "setChannelPermissionOverwrite", `${channelId}`, options);
  }

  deleteGroupDmUser(channelId, userId) {
    return this.request("DELETE", `/channels/${channelId}/recipients/${userId}`, "deleteGroupDmUser", `${channelId}`);
  }

  addGroupDmUser(channelId, userId, options) {
    return this.request("PUT", `/channels/${channelId}/recipients/${userId}`, "addGroupDmUser", `${channelId}`, options);
  }

  followChannel(channelId, options) {
    return this.request("POST", `/channels/${channelId}/followers`, "followChannel", `${channelId}`, options);
  }

  deleteMessage(channelId, messageId) {
    return this.request("DELETE", `/channels/${channelId}/messages/${messageId}`, "deleteMessage", `${channelId}`);
  }

  getMessage(channelId, messageId) {
    return this.request("GET", `/channels/${channelId}/messages/${messageId}`, "getMessage", `${channelId}`);
  }

  updateMessage(channelId, messageId, options) {
    return this.request("PATCH", `/channels/${channelId}/messages/${messageId}`, "updateMessage", `${channelId}`, options);
  }

  listMessages(channelId, options) {
    return this.request("GET", `/channels/${channelId}/messages`, "listMessages", `${channelId}`, options);
  }

  createMessage(channelId, options) {
    return this.request("POST", `/channels/${channelId}/messages`, "createMessage", `${channelId}`, options);
  }

  listChannelWebhooks(channelId) {
    return this.request("GET", `/channels/${channelId}/webhooks`, "listChannelWebhooks", `${channelId}`);
  }

  createWebhook(channelId, options) {
    return this.request("POST", `/channels/${channelId}/webhooks`, "createWebhook", `${channelId}`, options);
  }

  listChannelInvites(channelId) {
    return this.request("GET", `/channels/${channelId}/invites`, "listChannelInvites", `${channelId}`);
  }

  createChannelInvite(channelId, options) {
    return this.request("POST", `/channels/${channelId}/invites`, "createChannelInvite", `${channelId}`, options);
  }

  createThread(channelId, options) {
    return this.request("POST", `/channels/${channelId}/threads`, "createThread", `${channelId}`, options);
  }

  triggerTypingIndicator(channelId) {
    return this.request("POST", `/channels/${channelId}/typing`, "triggerTypingIndicator", `${channelId}`);
  }

  unpinMessage(channelId, messageId) {
    return this.request("DELETE", `/channels/${channelId}/pins/${messageId}`, "unpinMessage", `${channelId}`);
  }

  pinMessage(channelId, messageId) {
    return this.request("PUT", `/channels/${channelId}/pins/${messageId}`, "pinMessage", `${channelId}`);
  }

  listPinnedMessages(channelId) {
    return this.request("GET", `/channels/${channelId}/pins`, "listPinnedMessages", `${channelId}`);
  }

  deleteWebhookMessage(webhookId, webhookToken, messageId, options) {
    return this.request("DELETE", `/webhooks/${webhookId}/${webhookToken}/messages/${messageId}`, "deleteWebhookMessage", `${webhookId}${webhookToken}`, options);
  }

  getWebhookMessage(webhookId, webhookToken, messageId, options) {
    return this.request("GET", `/webhooks/${webhookId}/${webhookToken}/messages/${messageId}`, "getWebhookMessage", `${webhookId}${webhookToken}`, options);
  }

  updateWebhookMessage(webhookId, webhookToken, messageId, options) {
    return this.request("PATCH", `/webhooks/${webhookId}/${webhookToken}/messages/${messageId}`, "updateWebhookMessage", `${webhookId}${webhookToken}`, options);
  }

  executeGithubCompatibleWebhook(webhookId, webhookToken, options) {
    return this.request("POST", `/webhooks/${webhookId}/${webhookToken}/github`, "executeGithubCompatibleWebhook", `${webhookId}${webhookToken}`, options);
  }

  executeSlackCompatibleWebhook(webhookId, webhookToken, options) {
    return this.request("POST", `/webhooks/${webhookId}/${webhookToken}/slack`, "executeSlackCompatibleWebhook", `${webhookId}${webhookToken}`, options);
  }

  getGuildTemplate(code) {
    return this.request("GET", `/guilds/templates/${code}`, "getGuildTemplate", "");
  }

  createGuildFromTemplate(code, options) {
    return this.request("POST", `/guilds/templates/${code}`, "createGuildFromTemplate", "", options);
  }

  getGuildNewMemberWelcome(guildId) {
    return this.request("GET", `/guilds/${guildId}/new-member-welcome`, "getGuildNewMemberWelcome", `${guildId}`);
  }

  deleteGuildScheduledEvent(guildId, guildScheduledEventId) {
    return this.request("DELETE", `/guilds/${guildId}/scheduled-events/${guildScheduledEventId}`, "deleteGuildScheduledEvent", `${guildId}`);
  }

  getGuildScheduledEvent(guildId, guildScheduledEventId, options) {
    return this.request("GET", `/guilds/${guildId}/scheduled-events/${guildScheduledEventId}`, "getGuildScheduledEvent", `${guildId}`, options);
  }

  updateGuildScheduledEvent(guildId, guildScheduledEventId, options) {
    return this.request("PATCH", `/guilds/${guildId}/scheduled-events/${guildScheduledEventId}`, "updateGuildScheduledEvent", `${guildId}`, options);
  }

  listGuildScheduledEvents(guildId, options) {
    return this.request("GET", `/guilds/${guildId}/scheduled-events`, "listGuildScheduledEvents", `${guildId}`, options);
  }

  createGuildScheduledEvent(guildId, options) {
    return this.request("POST", `/guilds/${guildId}/scheduled-events`, "createGuildScheduledEvent", `${guildId}`, options);
  }

  getGuildWelcomeScreen(guildId) {
    return this.request("GET", `/guilds/${guildId}/welcome-screen`, "getGuildWelcomeScreen", `${guildId}`);
  }

  updateGuildWelcomeScreen(guildId, options) {
    return this.request("PATCH", `/guilds/${guildId}/welcome-screen`, "updateGuildWelcomeScreen", `${guildId}`, options);
  }

  updateVoiceState(guildId, userId, options) {
    return this.request("PATCH", `/guilds/${guildId}/voice-states/${userId}`, "updateVoiceState", `${guildId}`, options);
  }

  deleteGuildIntegration(guildId, integrationId) {
    return this.request("DELETE", `/guilds/${guildId}/integrations/${integrationId}`, "deleteGuildIntegration", `${guildId}`);
  }

  listGuildIntegrations(guildId) {
    return this.request("GET", `/guilds/${guildId}/integrations`, "listGuildIntegrations", `${guildId}`);
  }

  getGuildWidget(guildId) {
    return this.request("GET", `/guilds/${guildId}/widget.json`, "getGuildWidget", `${guildId}`);
  }

  getGuildsOnboarding(guildId) {
    return this.request("GET", `/guilds/${guildId}/onboarding`, "getGuildsOnboarding", `${guildId}`);
  }

  putGuildsOnboarding(guildId, options) {
    return this.request("PUT", `/guilds/${guildId}/onboarding`, "putGuildsOnboarding", `${guildId}`, options);
  }

  getGuildVanityUrl(guildId) {
    return this.request("GET", `/guilds/${guildId}/vanity-url`, "getGuildVanityUrl", `${guildId}`);
  }

  listGuildAuditLogEntries(guildId, options) {
    return this.request("GET", `/guilds/${guildId}/audit-logs`, "listGuildAuditLogEntries", `${guildId}`, options);
  }

  getGuildWidgetPng(guildId, options) {
    return this.request("GET", `/guilds/${guildId}/widget.png`, "getGuildWidgetPng", `${guildId}`, options);
  }

  deleteGuildTemplate(guildId, code) {
    return this.request("DELETE", `/guilds/${guildId}/templates/${code}`, "deleteGuildTemplate", `${guildId}`);
  }

  updateGuildTemplate(guildId, code, options) {
    return this.request("PATCH", `/guilds/${guildId}/templates/${code}`, "updateGuildTemplate", `${guildId}`, options);
  }

  syncGuildTemplate(guildId, code) {
    return this.request("PUT", `/guilds/${guildId}/templates/${code}`, "syncGuildTemplate", `${guildId}`);
  }

  listGuildTemplates(guildId) {
    return this.request("GET", `/guilds/${guildId}/templates`, "listGuildTemplates", `${guildId}`);
  }

  createGuildTemplate(guildId, options) {
    return this.request("POST", `/guilds/${guildId}/templates`, "createGuildTemplate", `${guildId}`, options);
  }

  deleteGuildSticker(guildId, stickerId) {
    return this.request("DELETE", `/guilds/${guildId}/stickers/${stickerId}`, "deleteGuildSticker", `${guildId}`);
  }

  getGuildSticker(guildId, stickerId) {
    return this.request("GET", `/guilds/${guildId}/stickers/${stickerId}`, "getGuildSticker", `${guildId}`);
  }

  updateGuildSticker(guildId, stickerId, options) {
    return this.request("PATCH", `/guilds/${guildId}/stickers/${stickerId}`, "updateGuildSticker", `${guildId}`, options);
  }

  listGuildChannels(guildId) {
    return this.request("GET", `/guilds/${guildId}/channels`, "listGuildChannels", `${guildId}`);
  }

  bulkUpdateGuildChannels(guildId, options) {
    return this.request("PATCH", `/guilds/${guildId}/channels`, "bulkUpdateGuildChannels", `${guildId}`, options);
  }

  createGuildChannel(guildId, options) {
    return this.request("POST", `/guilds/${guildId}/channels`, "createGuildChannel", `${guildId}`, options);
  }

  listGuildStickers(guildId) {
    return this.request("GET", `/guilds/${guildId}/stickers`, "listGuildStickers", `${guildId}`);
  }

  createGuildSticker(guildId, options) {
    return this.request("POST", `/guilds/${guildId}/stickers`, "createGuildSticker", `${guildId}`, options);
  }

  getGuildWebhooks(guildId) {
    return this.request("GET", `/guilds/${guildId}/webhooks`, "getGuildWebhooks", `${guildId}`);
  }

  deleteGuildMember(guildId, userId) {
    return this.request("DELETE", `/guilds/${guildId}/members/${userId}`, "deleteGuildMember", `${guildId}`);
  }

  getGuildMember(guildId, userId) {
    return this.request("GET", `/guilds/${guildId}/members/${userId}`, "getGuildMember", `${guildId}`);
  }

  updateGuildMember(guildId, userId, options) {
    return this.request("PATCH", `/guilds/${guildId}/members/${userId}`, "updateGuildMember", `${guildId}`, options);
  }

  addGuildMember(guildId, userId, options) {
    return this.request("PUT", `/guilds/${guildId}/members/${userId}`, "addGuildMember", `${guildId}`, options);
  }

  listGuildMembers(guildId, options) {
    return this.request("GET", `/guilds/${guildId}/members`, "listGuildMembers", `${guildId}`, options);
  }

  getGuildPreview(guildId) {
    return this.request("GET", `/guilds/${guildId}/preview`, "getGuildPreview", `${guildId}`);
  }

  listGuildInvites(guildId) {
    return this.request("GET", `/guilds/${guildId}/invites`, "listGuildInvites", `${guildId}`);
  }

  listGuildVoiceRegions(guildId) {
    return this.request("GET", `/guilds/${guildId}/regions`, "listGuildVoiceRegions", `${guildId}`);
  }

  deleteGuildEmoji(guildId, emojiId) {
    return this.request("DELETE", `/guilds/${guildId}/emojis/${emojiId}`, "deleteGuildEmoji", `${guildId}`);
  }

  getGuildEmoji(guildId, emojiId) {
    return this.request("GET", `/guilds/${guildId}/emojis/${emojiId}`, "getGuildEmoji", `${guildId}`);
  }

  updateGuildEmoji(guildId, emojiId, options) {
    return this.request("PATCH", `/guilds/${guildId}/emojis/${emojiId}`, "updateGuildEmoji", `${guildId}`, options);
  }

  listGuildEmojis(guildId) {
    return this.request("GET", `/guilds/${guildId}/emojis`, "listGuildEmojis", `${guildId}`);
  }

  createGuildEmoji(guildId, options) {
    return this.request("POST", `/guilds/${guildId}/emojis`, "createGuildEmoji", `${guildId}`, options);
  }

  getGuildWidgetSettings(guildId) {
    return this.request("GET", `/guilds/${guildId}/widget`, "getGuildWidgetSettings", `${guildId}`);
  }

  updateGuildWidgetSettings(guildId, options) {
    return this.request("PATCH", `/guilds/${guildId}/widget`, "updateGuildWidgetSettings", `${guildId}`, options);
  }

  deleteGuildRole(guildId, roleId) {
    return this.request("DELETE", `/guilds/${guildId}/roles/${roleId}`, "deleteGuildRole", `${guildId}`);
  }

  updateGuildRole(guildId, roleId, options) {
    return this.request("PATCH", `/guilds/${guildId}/roles/${roleId}`, "updateGuildRole", `${guildId}`, options);
  }

  listGuildRoles(guildId) {
    return this.request("GET", `/guilds/${guildId}/roles`, "listGuildRoles", `${guildId}`);
  }

  bulkUpdateGuildRoles(guildId, options) {
    return this.request("PATCH", `/guilds/${guildId}/roles`, "bulkUpdateGuildRoles", `${guildId}`, options);
  }

  createGuildRole(guildId, options) {
    return this.request("POST", `/guilds/${guildId}/roles`, "createGuildRole", `${guildId}`, options);
  }

  previewPruneGuild(guildId, options) {
    return this.request("GET", `/guilds/${guildId}/prune`, "previewPruneGuild", `${guildId}`, options);
  }

  pruneGuild(guildId, options) {
    return this.request("POST", `/guilds/${guildId}/prune`, "pruneGuild", `${guildId}`, options);
  }

  unbanUserFromGuild(guildId, userId) {
    return this.request("DELETE", `/guilds/${guildId}/bans/${userId}`, "unbanUserFromGuild", `${guildId}`);
  }

  getGuildBan(guildId, userId) {
    return this.request("GET", `/guilds/${guildId}/bans/${userId}`, "getGuildBan", `${guildId}`);
  }

  banUserFromGuild(guildId, userId, options) {
    return this.request("PUT", `/guilds/${guildId}/bans/${userId}`, "banUserFromGuild", `${guildId}`, options);
  }

  listGuildBans(guildId, options) {
    return this.request("GET", `/guilds/${guildId}/bans`, "listGuildBans", `${guildId}`, options);
  }

  setGuildMfaLevel(guildId, options) {
    return this.request("POST", `/guilds/${guildId}/mfa`, "setGuildMfaLevel", `${guildId}`, options);
  }

  deleteStageInstance(channelId) {
    return this.request("DELETE", `/stage-instances/${channelId}`, "deleteStageInstance", `${channelId}`);
  }

  getStageInstance(channelId) {
    return this.request("GET", `/stage-instances/${channelId}`, "getStageInstance", `${channelId}`);
  }

  updateStageInstance(channelId, options) {
    return this.request("PATCH", `/stage-instances/${channelId}`, "updateStageInstance", `${channelId}`, options);
  }

  getApplication(applicationId) {
    return this.request("GET", `/applications/${applicationId}`, "getApplication", "");
  }

  updateApplication(applicationId, options) {
    return this.request("PATCH", `/applications/${applicationId}`, "updateApplication", "", options);
  }

  deleteWebhookByToken(webhookId, webhookToken) {
    return this.request("DELETE", `/webhooks/${webhookId}/${webhookToken}`, "deleteWebhookByToken", `${webhookId}${webhookToken}`);
  }

  getWebhookByToken(webhookId, webhookToken) {
    return this.request("GET", `/webhooks/${webhookId}/${webhookToken}`, "getWebhookByToken", `${webhookId}${webhookToken}`);
  }

  updateWebhookByToken(webhookId, webhookToken, options) {
    return this.request("PATCH", `/webhooks/${webhookId}/${webhookToken}`, "updateWebhookByToken", `${webhookId}${webhookToken}`, options);
  }

  executeWebhook(webhookId, webhookToken, options) {
    return this.request("POST", `/webhooks/${webhookId}/${webhookToken}`, "executeWebhook", `${webhookId}${webhookToken}`, options);
  }

  deleteChannel(channelId) {
    return this.request("DELETE", `/channels/${channelId}`, "deleteChannel", `${channelId}`);
  }

  getChannel(channelId) {
    return this.request("GET", `/channels/${channelId}`, "getChannel", `${channelId}`);
  }

  updateChannel(channelId, options) {
    return this.request("PATCH", `/channels/${channelId}`, "updateChannel", `${channelId}`, options);
  }

  getSticker(stickerId) {
    return this.request("GET", `/stickers/${stickerId}`, "getSticker", "");
  }

  deleteWebhook(webhookId) {
    return this.request("DELETE", `/webhooks/${webhookId}`, "deleteWebhook", `${webhookId}`);
  }

  getWebhook(webhookId) {
    return this.request("GET", `/webhooks/${webhookId}`, "getWebhook", `${webhookId}`);
  }

  updateWebhook(webhookId, options) {
    return this.request("PATCH", `/webhooks/${webhookId}`, "updateWebhook", `${webhookId}`, options);
  }

  inviteRevoke(code) {
    return this.request("DELETE", `/invites/${code}`, "inviteRevoke", "");
  }

  inviteResolve(code, options) {
    return this.request("GET", `/invites/${code}`, "inviteResolve", "", options);
  }

  deleteGuild(guildId) {
    return this.request("DELETE", `/guilds/${guildId}`, "deleteGuild", `${guildId}`);
  }

  getGuild(guildId, options) {
    return this.request("GET", `/guilds/${guildId}`, "getGuild", `${guildId}`, options);
  }

  updateGuild(guildId, options) {
    return this.request("PATCH", `/guilds/${guildId}`, "updateGuild", `${guildId}`, options);
  }

  getUser(userId) {
    return this.request("GET", `/users/${userId}`, "getUser", "");
  }
}
