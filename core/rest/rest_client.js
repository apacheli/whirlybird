import { RestError } from "./rest_error.js";

export class RestClient {
  #token;

  options;

  constructor(token, options) {
    this.#token = token;

    this.options = options;
  }

  async request(method, url, { data, files, query, reason } = {}) {
    const headers = {
      "Authorization": this.#token,
      "User-Agent": "whirlybird/0.0.1",
    };
    if (reason !== undefined) {
      headers["X-Audit-Log-Reason"] = reason;
    }

    let body;
    if (files !== undefined) {
      body = new FormData();
      if (data !== undefined) {
        body.append("payload_json", typeof data === "string" ? data : JSON.stringify(data));
      }
      for (let i = 0, j = files.length; i < j; i++) {
        body.append(`files[${i}]`, files[i]);
      }
    } else if (data !== undefined) {
      headers["Content-Type"] = "application/json";
      body = typeof data === "string" ? data : JSON.stringify(data);
    }

    let s = `${this.options?.url ?? "https://discord.com/api/v10"}${url}`;
    if (query !== undefined) {
      let q = "";
      for (const key in query) {
        q += `&${key}=${encodeURIComponent(query[key])}`;
      }
      s += `?${q.substring(1)}`;
    }

    const response = await fetch(s, {
      body,
      headers,
      method,
    });
    if (response.ok) {
      if (response.body === null) {
        return;
      }
      return response.headers.get("Content-Type") === "application/json" ? response.json() : response.blob();
    }
    throw new RestError(await response.json());
  }

  addGroupDmUser(channelId, userId, options) {
    return this.request("PUT", `/channels/${channelId}/recipients/${userId}`, options);
  }

  addGuildMember(guildId, userId, options) {
    return this.request("PUT", `/guilds/${guildId}/members/${userId}`, options);
  }

  addGuildMemberRole(guildId, userId, roleId, options) {
    return this.request("PUT", `/guilds/${guildId}/members/${userId}/roles/${roleId}`, options);
  }

  addMyMessageReaction(channelId, messageId, emojiName, options) {
    return this.request("PUT", `/channels/${channelId}/messages/${messageId}/reactions/${emojiName}/@me`, options);
  }

  addThreadMember(channelId, userId, options) {
    return this.request("PUT", `/channels/${channelId}/thread-members/${userId}`, options);
  }

  banUserFromGuild(guildId, userId, options) {
    return this.request("PUT", `/guilds/${guildId}/bans/${userId}`, options);
  }

  bulkBanUsersFromGuild(guildId, options) {
    return this.request("POST", `/guilds/${guildId}/bulk-ban`, options);
  }

  bulkDeleteMessages(channelId, options) {
    return this.request("POST", `/channels/${channelId}/messages/bulk-delete`, options);
  }

  bulkSetApplicationCommands(applicationId, options) {
    return this.request("PUT", `/applications/${applicationId}/commands`, options);
  }

  bulkSetGuildApplicationCommands(applicationId, guildId, options) {
    return this.request("PUT", `/applications/${applicationId}/guilds/${guildId}/commands`, options);
  }

  bulkUpdateGuildChannels(guildId, options) {
    return this.request("PATCH", `/guilds/${guildId}/channels`, options);
  }

  bulkUpdateGuildRoles(guildId, options) {
    return this.request("PATCH", `/guilds/${guildId}/roles`, options);
  }

  consumeEntitlement(applicationId, entitlementId, options) {
    return this.request("POST", `/applications/${applicationId}/entitlements/${entitlementId}/consume`, options);
  }

  createApplicationCommand(applicationId, options) {
    return this.request("POST", `/applications/${applicationId}/commands`, options);
  }

  createAutoModerationRule(guildId, options) {
    return this.request("POST", `/guilds/${guildId}/auto-moderation/rules`, options);
  }

  createChannelInvite(channelId, options) {
    return this.request("POST", `/channels/${channelId}/invites`, options);
  }

  createDm(options) {
    return this.request("POST", "/users/@me/channels", options);
  }

  createEntitlement(applicationId, options) {
    return this.request("POST", `/applications/${applicationId}/entitlements`, options);
  }

  createGuild(options) {
    return this.request("POST", "/guilds", options);
  }

  createGuildApplicationCommand(applicationId, guildId, options) {
    return this.request("POST", `/applications/${applicationId}/guilds/${guildId}/commands`, options);
  }

  createGuildChannel(guildId, options) {
    return this.request("POST", `/guilds/${guildId}/channels`, options);
  }

  createGuildEmoji(guildId, options) {
    return this.request("POST", `/guilds/${guildId}/emojis`, options);
  }

  createGuildFromTemplate(code, options) {
    return this.request("POST", `/guilds/templates/${code}`, options);
  }

  createGuildRole(guildId, options) {
    return this.request("POST", `/guilds/${guildId}/roles`, options);
  }

  createGuildScheduledEvent(guildId, options) {
    return this.request("POST", `/guilds/${guildId}/scheduled-events`, options);
  }

  createGuildSticker(guildId, options) {
    return this.request("POST", `/guilds/${guildId}/stickers`, options);
  }

  createGuildTemplate(guildId, options) {
    return this.request("POST", `/guilds/${guildId}/templates`, options);
  }

  createInteractionResponse(interactionId, interactionToken, options) {
    return this.request("POST", `/interactions/${interactionId}/${interactionToken}/callback`, options);
  }

  createMessage(channelId, options) {
    return this.request("POST", `/channels/${channelId}/messages`, options);
  }

  createStageInstance(options) {
    return this.request("POST", "/stage-instances", options);
  }

  createThread(channelId, options) {
    return this.request("POST", `/channels/${channelId}/threads`, options);
  }

  createThreadFromMessage(channelId, messageId, options) {
    return this.request("POST", `/channels/${channelId}/messages/${messageId}/threads`, options);
  }

  createWebhook(channelId, options) {
    return this.request("POST", `/channels/${channelId}/webhooks`, options);
  }

  crosspostMessage(channelId, messageId, options) {
    return this.request("POST", `/channels/${channelId}/messages/${messageId}/crosspost`, options);
  }

  deleteAllMessageReactions(channelId, messageId, options) {
    return this.request("DELETE", `/channels/${channelId}/messages/${messageId}/reactions`, options);
  }

  deleteAllMessageReactionsByEmoji(channelId, messageId, emojiName, options) {
    return this.request("DELETE", `/channels/${channelId}/messages/${messageId}/reactions/${emojiName}`, options);
  }

  deleteApplicationCommand(applicationId, commandId, options) {
    return this.request("DELETE", `/applications/${applicationId}/commands/${commandId}`, options);
  }

  deleteAutoModerationRule(guildId, ruleId, options) {
    return this.request("DELETE", `/guilds/${guildId}/auto-moderation/rules/${ruleId}`, options);
  }

  deleteChannel(channelId, options) {
    return this.request("DELETE", `/channels/${channelId}`, options);
  }

  deleteChannelPermissionOverwrite(channelId, overwriteId, options) {
    return this.request("DELETE", `/channels/${channelId}/permissions/${overwriteId}`, options);
  }

  deleteEntitlement(applicationId, entitlementId, options) {
    return this.request("DELETE", `/applications/${applicationId}/entitlements/${entitlementId}`, options);
  }

  deleteGroupDmUser(channelId, userId, options) {
    return this.request("DELETE", `/channels/${channelId}/recipients/${userId}`, options);
  }

  deleteGuild(guildId, options) {
    return this.request("DELETE", `/guilds/${guildId}`, options);
  }

  deleteGuildApplicationCommand(applicationId, guildId, commandId, options) {
    return this.request("DELETE", `/applications/${applicationId}/guilds/${guildId}/commands/${commandId}`, options);
  }

  deleteGuildEmoji(guildId, emojiId, options) {
    return this.request("DELETE", `/guilds/${guildId}/emojis/${emojiId}`, options);
  }

  deleteGuildIntegration(guildId, integrationId, options) {
    return this.request("DELETE", `/guilds/${guildId}/integrations/${integrationId}`, options);
  }

  deleteGuildMember(guildId, userId, options) {
    return this.request("DELETE", `/guilds/${guildId}/members/${userId}`, options);
  }

  deleteGuildMemberRole(guildId, userId, roleId, options) {
    return this.request("DELETE", `/guilds/${guildId}/members/${userId}/roles/${roleId}`, options);
  }

  deleteGuildRole(guildId, roleId, options) {
    return this.request("DELETE", `/guilds/${guildId}/roles/${roleId}`, options);
  }

  deleteGuildScheduledEvent(guildId, guildScheduledEventId, options) {
    return this.request("DELETE", `/guilds/${guildId}/scheduled-events/${guildScheduledEventId}`, options);
  }

  deleteGuildSticker(guildId, stickerId, options) {
    return this.request("DELETE", `/guilds/${guildId}/stickers/${stickerId}`, options);
  }

  deleteGuildTemplate(guildId, code, options) {
    return this.request("DELETE", `/guilds/${guildId}/templates/${code}`, options);
  }

  deleteMessage(channelId, messageId, options) {
    return this.request("DELETE", `/channels/${channelId}/messages/${messageId}`, options);
  }

  deleteMyMessageReaction(channelId, messageId, emojiName, options) {
    return this.request("DELETE", `/channels/${channelId}/messages/${messageId}/reactions/${emojiName}/@me`, options);
  }

  deleteOriginalWebhookMessage(webhookId, webhookToken, options) {
    return this.request("DELETE", `/webhooks/${webhookId}/${webhookToken}/messages/@original`, options);
  }

  deleteStageInstance(channelId, options) {
    return this.request("DELETE", `/stage-instances/${channelId}`, options);
  }

  deleteThreadMember(channelId, userId, options) {
    return this.request("DELETE", `/channels/${channelId}/thread-members/${userId}`, options);
  }

  deleteUserMessageReaction(channelId, messageId, emojiName, userId, options) {
    return this.request("DELETE", `/channels/${channelId}/messages/${messageId}/reactions/${emojiName}/${userId}`, options);
  }

  deleteWebhook(webhookId, options) {
    return this.request("DELETE", `/webhooks/${webhookId}`, options);
  }

  deleteWebhookByToken(webhookId, webhookToken, options) {
    return this.request("DELETE", `/webhooks/${webhookId}/${webhookToken}`, options);
  }

  deleteWebhookMessage(webhookId, webhookToken, messageId, options) {
    return this.request("DELETE", `/webhooks/${webhookId}/${webhookToken}/messages/${messageId}`, options);
  }

  executeGithubCompatibleWebhook(webhookId, webhookToken, options) {
    return this.request("POST", `/webhooks/${webhookId}/${webhookToken}/github`, options);
  }

  executeSlackCompatibleWebhook(webhookId, webhookToken, options) {
    return this.request("POST", `/webhooks/${webhookId}/${webhookToken}/slack`, options);
  }

  executeWebhook(webhookId, webhookToken, options) {
    return this.request("POST", `/webhooks/${webhookId}/${webhookToken}`, options);
  }

  followChannel(channelId, options) {
    return this.request("POST", `/channels/${channelId}/followers`, options);
  }

  getActiveGuildThreads(guildId, options) {
    return this.request("GET", `/guilds/${guildId}/threads/active`, options);
  }

  getApplication(applicationId, options) {
    return this.request("GET", `/applications/${applicationId}`, options);
  }

  getApplicationCommand(applicationId, commandId, options) {
    return this.request("GET", `/applications/${applicationId}/commands/${commandId}`, options);
  }

  getApplicationRoleConnectionsMetadata(applicationId, options) {
    return this.request("GET", `/applications/${applicationId}/role-connections/metadata`, options);
  }

  getApplicationUserRoleConnection(applicationId, options) {
    return this.request("GET", `/users/@me/applications/${applicationId}/role-connection`, options);
  }

  getAutoModerationRule(guildId, ruleId, options) {
    return this.request("GET", `/guilds/${guildId}/auto-moderation/rules/${ruleId}`, options);
  }

  getBotGateway(options) {
    return this.request("GET", "/gateway/bot", options);
  }

  getChannel(channelId, options) {
    return this.request("GET", `/channels/${channelId}`, options);
  }

  getEntitlement(applicationId, entitlementId, options) {
    return this.request("GET", `/applications/${applicationId}/entitlements/${entitlementId}`, options);
  }

  getEntitlements(applicationId, options) {
    return this.request("GET", `/applications/${applicationId}/entitlements`, options);
  }

  getGateway(options) {
    return this.request("GET", "/gateway", options);
  }

  getGuild(guildId, options) {
    return this.request("GET", `/guilds/${guildId}`, options);
  }

  getGuildApplicationCommand(applicationId, guildId, commandId, options) {
    return this.request("GET", `/applications/${applicationId}/guilds/${guildId}/commands/${commandId}`, options);
  }

  getGuildApplicationCommandPermissions(applicationId, guildId, commandId, options) {
    return this.request("GET", `/applications/${applicationId}/guilds/${guildId}/commands/${commandId}/permissions`, options);
  }

  getGuildBan(guildId, userId, options) {
    return this.request("GET", `/guilds/${guildId}/bans/${userId}`, options);
  }

  getGuildEmoji(guildId, emojiId, options) {
    return this.request("GET", `/guilds/${guildId}/emojis/${emojiId}`, options);
  }

  getGuildMember(guildId, userId, options) {
    return this.request("GET", `/guilds/${guildId}/members/${userId}`, options);
  }

  getGuildNewMemberWelcome(guildId, options) {
    return this.request("GET", `/guilds/${guildId}/new-member-welcome`, options);
  }

  getGuildPreview(guildId, options) {
    return this.request("GET", `/guilds/${guildId}/preview`, options);
  }

  getGuildScheduledEvent(guildId, guildScheduledEventId, options) {
    return this.request("GET", `/guilds/${guildId}/scheduled-events/${guildScheduledEventId}`, options);
  }

  getGuildsOnboarding(guildId, options) {
    return this.request("GET", `/guilds/${guildId}/onboarding`, options);
  }

  getGuildSticker(guildId, stickerId, options) {
    return this.request("GET", `/guilds/${guildId}/stickers/${stickerId}`, options);
  }

  getGuildTemplate(code, options) {
    return this.request("GET", `/guilds/templates/${code}`, options);
  }

  getGuildVanityUrl(guildId, options) {
    return this.request("GET", `/guilds/${guildId}/vanity-url`, options);
  }

  getGuildWebhooks(guildId, options) {
    return this.request("GET", `/guilds/${guildId}/webhooks`, options);
  }

  getGuildWelcomeScreen(guildId, options) {
    return this.request("GET", `/guilds/${guildId}/welcome-screen`, options);
  }

  getGuildWidget(guildId, options) {
    return this.request("GET", `/guilds/${guildId}/widget.json`, options);
  }

  getGuildWidgetPng(guildId, options) {
    return this.request("GET", `/guilds/${guildId}/widget.png`, options);
  }

  getGuildWidgetSettings(guildId, options) {
    return this.request("GET", `/guilds/${guildId}/widget`, options);
  }

  getMessage(channelId, messageId, options) {
    return this.request("GET", `/channels/${channelId}/messages/${messageId}`, options);
  }

  getMyApplication(options) {
    return this.request("GET", "/applications/@me", options);
  }

  getMyGuildMember(guildId, options) {
    return this.request("GET", `/users/@me/guilds/${guildId}/member`, options);
  }

  getMyOauth2Application(options) {
    return this.request("GET", "/oauth2/applications/@me", options);
  }

  getMyOauth2Authorization(options) {
    return this.request("GET", "/oauth2/@me", options);
  }

  getMyUser(options) {
    return this.request("GET", "/users/@me", options);
  }

  getOriginalWebhookMessage(webhookId, webhookToken, options) {
    return this.request("GET", `/webhooks/${webhookId}/${webhookToken}/messages/@original`, options);
  }

  getPublicKeys(options) {
    return this.request("GET", "/oauth2/keys", options);
  }

  getStageInstance(channelId, options) {
    return this.request("GET", `/stage-instances/${channelId}`, options);
  }

  getSticker(stickerId, options) {
    return this.request("GET", `/stickers/${stickerId}`, options);
  }

  getThreadMember(channelId, userId, options) {
    return this.request("GET", `/channels/${channelId}/thread-members/${userId}`, options);
  }

  getUser(userId, options) {
    return this.request("GET", `/users/${userId}`, options);
  }

  getWebhook(webhookId, options) {
    return this.request("GET", `/webhooks/${webhookId}`, options);
  }

  getWebhookByToken(webhookId, webhookToken, options) {
    return this.request("GET", `/webhooks/${webhookId}/${webhookToken}`, options);
  }

  getWebhookMessage(webhookId, webhookToken, messageId, options) {
    return this.request("GET", `/webhooks/${webhookId}/${webhookToken}/messages/${messageId}`, options);
  }

  inviteResolve(code, options) {
    return this.request("GET", `/invites/${code}`, options);
  }

  inviteRevoke(code, options) {
    return this.request("DELETE", `/invites/${code}`, options);
  }

  joinThread(channelId, options) {
    return this.request("PUT", `/channels/${channelId}/thread-members/@me`, options);
  }

  leaveGuild(guildId, options) {
    return this.request("DELETE", `/users/@me/guilds/${guildId}`, options);
  }

  leaveThread(channelId, options) {
    return this.request("DELETE", `/channels/${channelId}/thread-members/@me`, options);
  }

  listApplicationCommands(applicationId, options) {
    return this.request("GET", `/applications/${applicationId}/commands`, options);
  }

  listAutoModerationRules(guildId, options) {
    return this.request("GET", `/guilds/${guildId}/auto-moderation/rules`, options);
  }

  listChannelInvites(channelId, options) {
    return this.request("GET", `/channels/${channelId}/invites`, options);
  }

  listChannelWebhooks(channelId, options) {
    return this.request("GET", `/channels/${channelId}/webhooks`, options);
  }

  listGuildApplicationCommandPermissions(applicationId, guildId, options) {
    return this.request("GET", `/applications/${applicationId}/guilds/${guildId}/commands/permissions`, options);
  }

  listGuildApplicationCommands(applicationId, guildId, options) {
    return this.request("GET", `/applications/${applicationId}/guilds/${guildId}/commands`, options);
  }

  listGuildAuditLogEntries(guildId, options) {
    return this.request("GET", `/guilds/${guildId}/audit-logs`, options);
  }

  listGuildBans(guildId, options) {
    return this.request("GET", `/guilds/${guildId}/bans`, options);
  }

  listGuildChannels(guildId, options) {
    return this.request("GET", `/guilds/${guildId}/channels`, options);
  }

  listGuildEmojis(guildId, options) {
    return this.request("GET", `/guilds/${guildId}/emojis`, options);
  }

  listGuildIntegrations(guildId, options) {
    return this.request("GET", `/guilds/${guildId}/integrations`, options);
  }

  listGuildInvites(guildId, options) {
    return this.request("GET", `/guilds/${guildId}/invites`, options);
  }

  listGuildMembers(guildId, options) {
    return this.request("GET", `/guilds/${guildId}/members`, options);
  }

  listGuildRoles(guildId, options) {
    return this.request("GET", `/guilds/${guildId}/roles`, options);
  }

  listGuildScheduledEvents(guildId, options) {
    return this.request("GET", `/guilds/${guildId}/scheduled-events`, options);
  }

  listGuildScheduledEventUsers(guildId, guildScheduledEventId, options) {
    return this.request("GET", `/guilds/${guildId}/scheduled-events/${guildScheduledEventId}/users`, options);
  }

  listGuildStickers(guildId, options) {
    return this.request("GET", `/guilds/${guildId}/stickers`, options);
  }

  listGuildTemplates(guildId, options) {
    return this.request("GET", `/guilds/${guildId}/templates`, options);
  }

  listGuildVoiceRegions(guildId, options) {
    return this.request("GET", `/guilds/${guildId}/regions`, options);
  }

  listMessageReactionsByEmoji(channelId, messageId, emojiName, options) {
    return this.request("GET", `/channels/${channelId}/messages/${messageId}/reactions/${emojiName}`, options);
  }

  listMessages(channelId, options) {
    return this.request("GET", `/channels/${channelId}/messages`, options);
  }

  listMyConnections(options) {
    return this.request("GET", "/users/@me/connections", options);
  }

  listMyGuilds(options) {
    return this.request("GET", "/users/@me/guilds", options);
  }

  listMyPrivateArchivedThreads(channelId, options) {
    return this.request("GET", `/channels/${channelId}/users/@me/threads/archived/private`, options);
  }

  listPinnedMessages(channelId, options) {
    return this.request("GET", `/channels/${channelId}/pins`, options);
  }

  listPrivateArchivedThreads(channelId, options) {
    return this.request("GET", `/channels/${channelId}/threads/archived/private`, options);
  }

  listPublicArchivedThreads(channelId, options) {
    return this.request("GET", `/channels/${channelId}/threads/archived/public`, options);
  }

  listStickerPacks(options) {
    return this.request("GET", "/sticker-packs", options);
  }

  listThreadMembers(channelId, options) {
    return this.request("GET", `/channels/${channelId}/thread-members`, options);
  }

  listVoiceRegions(options) {
    return this.request("GET", "/voice/regions", options);
  }

  pinMessage(channelId, messageId, options) {
    return this.request("PUT", `/channels/${channelId}/pins/${messageId}`, options);
  }

  previewPruneGuild(guildId, options) {
    return this.request("GET", `/guilds/${guildId}/prune`, options);
  }

  pruneGuild(guildId, options) {
    return this.request("POST", `/guilds/${guildId}/prune`, options);
  }

  putGuildsOnboarding(guildId, options) {
    return this.request("PUT", `/guilds/${guildId}/onboarding`, options);
  }

  searchGuildMembers(guildId, options) {
    return this.request("GET", `/guilds/${guildId}/members/search`, options);
  }

  setChannelPermissionOverwrite(channelId, overwriteId, options) {
    return this.request("PUT", `/channels/${channelId}/permissions/${overwriteId}`, options);
  }

  setGuildApplicationCommandPermissions(applicationId, guildId, commandId, options) {
    return this.request("PUT", `/applications/${applicationId}/guilds/${guildId}/commands/${commandId}/permissions`, options);
  }

  setGuildMfaLevel(guildId, options) {
    return this.request("POST", `/guilds/${guildId}/mfa`, options);
  }

  syncGuildTemplate(guildId, code, options) {
    return this.request("PUT", `/guilds/${guildId}/templates/${code}`, options);
  }

  triggerTypingIndicator(channelId, options) {
    return this.request("POST", `/channels/${channelId}/typing`, options);
  }

  unbanUserFromGuild(guildId, userId, options) {
    return this.request("DELETE", `/guilds/${guildId}/bans/${userId}`, options);
  }

  unpinMessage(channelId, messageId, options) {
    return this.request("DELETE", `/channels/${channelId}/pins/${messageId}`, options);
  }

  updateApplication(applicationId, options) {
    return this.request("PATCH", `/applications/${applicationId}`, options);
  }

  updateApplicationCommand(applicationId, commandId, options) {
    return this.request("PATCH", `/applications/${applicationId}/commands/${commandId}`, options);
  }

  updateApplicationRoleConnectionsMetadata(applicationId, options) {
    return this.request("PUT", `/applications/${applicationId}/role-connections/metadata`, options);
  }

  updateApplicationUserRoleConnection(applicationId, options) {
    return this.request("PUT", `/users/@me/applications/${applicationId}/role-connection`, options);
  }

  updateAutoModerationRule(guildId, ruleId, options) {
    return this.request("PATCH", `/guilds/${guildId}/auto-moderation/rules/${ruleId}`, options);
  }

  updateChannel(channelId, options) {
    return this.request("PATCH", `/channels/${channelId}`, options);
  }

  updateGuild(guildId, options) {
    return this.request("PATCH", `/guilds/${guildId}`, options);
  }

  updateGuildApplicationCommand(applicationId, guildId, commandId, options) {
    return this.request("PATCH", `/applications/${applicationId}/guilds/${guildId}/commands/${commandId}`, options);
  }

  updateGuildEmoji(guildId, emojiId, options) {
    return this.request("PATCH", `/guilds/${guildId}/emojis/${emojiId}`, options);
  }

  updateGuildMember(guildId, userId, options) {
    return this.request("PATCH", `/guilds/${guildId}/members/${userId}`, options);
  }

  updateGuildRole(guildId, roleId, options) {
    return this.request("PATCH", `/guilds/${guildId}/roles/${roleId}`, options);
  }

  updateGuildScheduledEvent(guildId, guildScheduledEventId, options) {
    return this.request("PATCH", `/guilds/${guildId}/scheduled-events/${guildScheduledEventId}`, options);
  }

  updateGuildSticker(guildId, stickerId, options) {
    return this.request("PATCH", `/guilds/${guildId}/stickers/${stickerId}`, options);
  }

  updateGuildTemplate(guildId, code, options) {
    return this.request("PATCH", `/guilds/${guildId}/templates/${code}`, options);
  }

  updateGuildWelcomeScreen(guildId, options) {
    return this.request("PATCH", `/guilds/${guildId}/welcome-screen`, options);
  }

  updateGuildWidgetSettings(guildId, options) {
    return this.request("PATCH", `/guilds/${guildId}/widget`, options);
  }

  updateMessage(channelId, messageId, options) {
    return this.request("PATCH", `/channels/${channelId}/messages/${messageId}`, options);
  }

  updateMyApplication(options) {
    return this.request("PATCH", "/applications/@me", options);
  }

  updateMyGuildMember(guildId, options) {
    return this.request("PATCH", `/guilds/${guildId}/members/@me`, options);
  }

  updateMyUser(options) {
    return this.request("PATCH", "/users/@me", options);
  }

  updateOriginalWebhookMessage(webhookId, webhookToken, options) {
    return this.request("PATCH", `/webhooks/${webhookId}/${webhookToken}/messages/@original`, options);
  }

  updateSelfVoiceState(guildId, options) {
    return this.request("PATCH", `/guilds/${guildId}/voice-states/@me`, options);
  }

  updateStageInstance(channelId, options) {
    return this.request("PATCH", `/stage-instances/${channelId}`, options);
  }

  updateVoiceState(guildId, userId, options) {
    return this.request("PATCH", `/guilds/${guildId}/voice-states/${userId}`, options);
  }

  updateWebhook(webhookId, options) {
    return this.request("PATCH", `/webhooks/${webhookId}`, options);
  }

  updateWebhookByToken(webhookId, webhookToken, options) {
    return this.request("PATCH", `/webhooks/${webhookId}/${webhookToken}`, options);
  }

  updateWebhookMessage(webhookId, webhookToken, messageId, options) {
    return this.request("PATCH", `/webhooks/${webhookId}/${webhookToken}/messages/${messageId}`, options);
  }
}
