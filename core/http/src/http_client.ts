// deno-fmt-ignore-file

import type { Snowflake, AddGuildMemberData, AddGuildMemberBody, AddGuildMemberRoleBody, AddThreadMemberBody, BatchEditApplicationCommandPermissionsData, BatchEditApplicationCommandPermissionsBody, BeginGuildPruneData, BeginGuildPruneBody, BulkDeleteMessagesData, BulkDeleteMessagesBody, BulkOverwriteGlobalApplicationCommandsData, BulkOverwriteGlobalApplicationCommandsBody, BulkOverwriteGuildApplicationCommandsData, BulkOverwriteGuildApplicationCommandsBody, ConsumeSKUBody, CreateAchievementData, CreateAchievementBody, CreateChannelInviteData, CreateChannelInviteBody, CreateDMData, CreateDMBody, CreateFollowupMessageData, CreateFollowupMessageBody, CreateGlobalApplicationCommandData, CreateGlobalApplicationCommandBody, CreateGroupDMData, CreateGroupDMBody, CreateGuildData, CreateGuildBody, CreateGuildApplicationCommandData, CreateGuildApplicationCommandBody, CreateGuildBanData, CreateGuildBanBody, CreateGuildChannelData, CreateGuildChannelBody, CreateGuildEmojiData, CreateGuildEmojiBody, CreateGuildFromGuildTemplateData, CreateGuildFromGuildTemplateBody, CreateGuildRoleData, CreateGuildRoleBody, CreateGuildScheduledEventData, CreateGuildScheduledEventBody, CreateGuildStickerBody, CreateGuildTemplateData, CreateGuildTemplateBody, CreateInteractionResponseData, CreateInteractionResponseBody, CreateLobbyData, CreateLobbyBody, CreateLobbySearchData, CreateLobbySearchBody, CreateMessageData, CreateMessageBody, CreatePurchaseDiscountData, CreatePurchaseDiscountBody, CreateReactionBody, CreateStageInstanceData, CreateStageInstanceBody, CreateWebhookData, CreateWebhookBody, CrosspostMessageBody, DeleteAchievementBody, DeleteAllReactionsBody, DeleteAllReactionsForEmojiBody, DeleteChannelBody, DeleteChannelPermissionBody, DeleteFollowupMessageBody, DeleteGlobalApplicationCommandBody, DeleteGuildBody, DeleteGuildApplicationCommandBody, DeleteGuildEmojiBody, DeleteGuildIntegrationBody, DeleteGuildRoleBody, DeleteGuildScheduledEventBody, DeleteGuildStickerBody, DeleteGuildTemplateBody, DeleteInviteBody, DeleteLobbyBody, DeleteMessageBody, DeleteOriginalInteractionResponseBody, DeleteOwnReactionBody, DeletePurchaseDiscountBody, DeleteStageInstanceBody, DeleteTestEntitlementBody, DeleteUserReactionBody, DeleteWebhookBody, DeleteWebhookMessageQuery, DeleteWebhookMessageBody, DeleteWebhookWithTokenBody, EditApplicationCommandPermissionsData, EditApplicationCommandPermissionsBody, EditChannelPermissionsData, EditChannelPermissionsBody, EditFollowupMessageData, EditFollowupMessageBody, EditGlobalApplicationCommandData, EditGlobalApplicationCommandBody, EditGuildApplicationCommandData, EditGuildApplicationCommandBody, EditMessageData, EditMessageBody, EditOriginalInteractionResponseData, EditOriginalInteractionResponseBody, EditWebhookMessageData, EditWebhookMessageQuery, EditWebhookMessageBody, ExecuteGitHubCompatibleWebhookQuery, ExecuteGitHubCompatibleWebhookBody, ExecuteSlackCompatibleWebhookQuery, ExecuteSlackCompatibleWebhookBody, ExecuteWebhookData, ExecuteWebhookQuery, ExecuteWebhookBody, FollowNewsChannelData, FollowNewsChannelBody, GetAchievementBody, GetAchievementsBody, GetApplicationCommandPermissionsBody, GetChannelBody, GetChannelInvitesBody, GetChannelMessageBody, GetChannelMessagesQuery, GetChannelMessagesBody, GetChannelWebhooksBody, GetCurrentAuthorizationInformationBody, GetCurrentBotApplicationInformationBody, GetCurrentUserBody, GetCurrentUserGuildMemberBody, GetCurrentUserGuildsQuery, GetCurrentUserGuildsBody, GetEntitlementQuery, GetEntitlementBody, GetEntitlementsQuery, GetEntitlementsBody, GetFollowupMessageBody, GetGatewayBody, GetGatewayBotBody, GetGlobalApplicationCommandBody, GetGlobalApplicationCommandsQuery, GetGlobalApplicationCommandsBody, GetGuildQuery, GetGuildBody, GetGuildApplicationCommandBody, GetGuildApplicationCommandPermissionsBody, GetGuildApplicationCommandsQuery, GetGuildApplicationCommandsBody, GetGuildAuditLogQuery, GetGuildAuditLogBody, GetGuildBanBody, GetGuildBansQuery, GetGuildBansBody, GetGuildChannelsBody, GetGuildEmojiBody, GetGuildIntegrationsBody, GetGuildInvitesBody, GetGuildMemberBody, GetGuildPreviewBody, GetGuildPruneCountQuery, GetGuildPruneCountBody, GetGuildRolesBody, GetGuildScheduledEventQuery, GetGuildScheduledEventBody, GetGuildScheduledEventUsersData, GetGuildScheduledEventUsersBody, GetGuildStickerBody, GetGuildTemplateBody, GetGuildTemplatesBody, GetGuildVanityURLBody, GetGuildVoiceRegionsBody, GetGuildWebhooksBody, GetGuildWelcomeScreenBody, GetGuildWidgetBody, GetGuildWidgetImageQuery, GetGuildWidgetImageBody, GetGuildWidgetSettingsBody, GetInviteQuery, GetInviteBody, GetOriginalInteractionResponseBody, GetPinnedMessagesBody, GetReactionsQuery, GetReactionsBody, GetSKUsBody, GetStageInstanceBody, GetStickerBody, GetThreadMemberBody, GetUserBody, GetUserAchievementsBody, GetUserConnectionsBody, GetWebhookBody, GetWebhookMessageQuery, GetWebhookMessageBody, GetWebhookWithTokenBody, GroupDMAddRecipientData, GroupDMAddRecipientBody, GroupDMRemoveRecipientBody, JoinThreadBody, LeaveGuildBody, LeaveThreadBody, ListGuildEmojisBody, ListGuildMembersQuery, ListGuildMembersBody, ListGuildStickersBody, ListJoinedPrivateArchivedThreadsQuery, ListJoinedPrivateArchivedThreadsBody, ListNitroStickerPacksBody, ListPrivateArchivedThreadsQuery, ListPrivateArchivedThreadsBody, ListPublicArchivedThreadsQuery, ListPublicArchivedThreadsBody, ListScheduledEventsForGuildQuery, ListScheduledEventsForGuildBody, ListThreadMembersBody, ListVoiceRegionsBody, ModifyChannelData, ModifyChannelBody, ModifyCurrentMemberData, ModifyCurrentMemberBody, ModifyCurrentUserData, ModifyCurrentUserBody, ModifyCurrentUserNickData, ModifyCurrentUserNickBody, ModifyCurrentUserVoiceStateData, ModifyCurrentUserVoiceStateBody, ModifyGuildData, ModifyGuildBody, ModifyGuildChannelPositionsData, ModifyGuildChannelPositionsBody, ModifyGuildEmojiData, ModifyGuildEmojiBody, ModifyGuildMemberData, ModifyGuildMemberBody, ModifyGuildRoleData, ModifyGuildRoleBody, ModifyGuildRolePositionsData, ModifyGuildRolePositionsBody, ModifyGuildScheduledEventData, ModifyGuildScheduledEventBody, ModifyGuildStickerData, ModifyGuildStickerBody, ModifyGuildTemplateData, ModifyGuildTemplateBody, ModifyGuildWelcomeScreenData, ModifyGuildWelcomeScreenBody, ModifyGuildWidgetData, ModifyGuildWidgetBody, ModifyStageInstanceData, ModifyStageInstanceBody, ModifyUserVoiceStateData, ModifyUserVoiceStateBody, ModifyWebhookData, ModifyWebhookBody, ModifyWebhookWithTokenData, ModifyWebhookWithTokenBody, PinMessageBody, RemoveGuildBanBody, RemoveGuildMemberBody, RemoveGuildMemberRoleBody, RemoveThreadMemberBody, SearchGuildMembersQuery, SearchGuildMembersBody, SendLobbyDataData, SendLobbyDataBody, StartThreadFromMessageData, StartThreadFromMessageBody, StartThreadInForumChannelData, StartThreadInForumChannelBody, StartThreadWithoutMessageData, StartThreadWithoutMessageBody, SyncGuildTemplateBody, TriggerTypingIndicatorBody, UnpinMessageBody, UpdateAchievementData, UpdateAchievementBody, UpdateLobbyData, UpdateLobbyBody, UpdateLobbyMemberData, UpdateLobbyMemberBody, UpdateUserAchievementData, UpdateUserAchievementBody, ListActiveGuildThreadsBody } from "../../types/mod.ts";
import * as logger from "../../util/src/logger.ts";
import { sleep } from "../../util/src/sleep.ts";
import { BASE_URL, DELAY, RETRIES, USER_AGENT, VERSION } from "./constants.ts";
import { HttpError } from "./http_error.ts";
import { GUILD_MEMBER, GUILD_MEMBER_ROLE, CHANNEL_THREAD_MEMBER, APPLICATION_GUILD_COMMANDS_PERMISSIONS, GUILD_PRUNE, CHANNEL_MESSAGES_BULK_DELETE, APPLICATION_COMMANDS, APPLICATION_GUILD_COMMANDS, APPLICATION_ENTITLEMENT_CONSUME, APPLICATION_ACHIEVEMENTS, CHANNEL_INVITES, USER_ME_CHANNELS, WEBHOOK_TOKEN, GUILDS, GUILD_BAN, GUILD_CHANNELS, GUILD_EMOJIS, GUILDS_TEMPLATE, GUILD_ROLES, GUILD_SCHEDULED_EVENTS, GUILD_STICKERS, GUILD_TEMPLATES, INTERACTION_TOKEN_CALLBACK, LOBBIES, LOBBIES_SEARCH, CHANNEL_MESSAGES, STORE_SKU_DISCOUNT, CHANNEL_MESSAGE_REACTION_ME, STAGE_INSTANCES, CHANNEL_WEBHOOKS, CHANNEL_MESSAGE_CROSSPOST, APPLICATION_ACHIEVEMENT, CHANNEL_MESSAGE_REACTIONS, CHANNEL_MESSAGE_REACTION, CHANNEL, CHANNEL_PERMISSION, WEBHOOK_TOKEN_MESSAGE, APPLICATION_COMMAND, GUILD, APPLICATION_GUILD_COMMAND, GUILD_EMOJI, GUILD_INTEGRATION, GUILD_ROLE, GUILD_SCHEDULED_EVENT, GUILD_STICKER, GUILD_TEMPLATE, INVITE, LOBBY, CHANNEL_MESSAGE, WEBHOOK_TOKEN_MESSAGE_ORIGINAL, STAGE_INSTANCE, APPLICATION_ENTITLEMENT, CHANNEL_MESSAGE_REACTION_USER, WEBHOOK, APPLICATION_GUILD_COMMAND_PERMISSIONS, WEBHOOK_TOKEN_GITHUB, WEBHOOK_TOKEN_SLACK, CHANNEL_FOLLOWERS, OAUTH2_ME, OAUTH2_APPLICATION_ME, USER_ME, USER_ME_GUILD_MEMBER, USER_ME_GUILDS, APPLICATION_ENTITLEMENTS, GATEWAY, GATEWAY_BOT, GUILD_AUDIT_LOGS, GUILD_BANS, GUILD_INTEGRATIONS, GUILD_INVITES, GUILD_PREVIEW, GUILD_SCHEDULED_EVENT_USERS, GUILD_VANITY_URL, GUILD_REGIONS, GUILD_WEBHOOKS, GUILD_WELCOME_SCREEN, GUILD_WIDGET_JSON, GUILD_WIDGET_PNG, GUILD_WIDGET, CHANNEL_PINS, APPLICATION_SKUS, STICKER, USER, USER_ME_APPLICATION_ACHIEVEMENTS, USER_ME_CONNECTIONS, CHANNEL_RECIPIENT, CHANNEL_THREAD_MEMBER_ME, USER_ME_GUILD, GUILD_THREADS_ACTIVE, GUILD_MEMBERS, CHANNEL_USER_ME_THREADS_ARCHIVED_PRIVATE, STICKER_PACKS, CHANNEL_THREADS_ARCHIVED_PRIVATE, CHANNEL_THREADS_ARCHIVED_PUBLIC, CHANNEL_THREAD_MEMBERS, VOICE_REGIONS, GUILD_MEMBER_ME, GUILD_MEMBER_ME_NICK, GUILD_VOICE_STATE_ME, GUILD_VOICE_STATE, CHANNEL_PIN, GUILD_MEMBERS_SEARCH, LOBBY_SEND, CHANNEL_MESSAGE_THREADS, CHANNEL_THREADS, CHANNEL_TYPING, LOBBY_MEMBER } from "./http_routes.ts";
import { RateLimit } from "./rate_limit.ts";
import { requestBody } from "./request_body.ts";

/** HTTP Client options. */
export interface HttpClientOptions {
  /** The base URL to request to. Default is `https://discord.com/`. */
  baseUrl?: string;
  /** How to wait in milliseconds before aborting a request. */
  delay?: number;
  /** The number of attempts to retry a request that was rate limited. */
  retries?: number;
  /** `User-Agent` HTTP header. */
  userAgent?: string;
  /** The version of the Discord HTTP API to use. */
  version?: string;
}

/** HTTP client request options. */
export interface RequestOptions {
  /** If the request needs to be authenticate. `true` by default. */
  authorization?: boolean;
  /** Request body. */
  data?: unknown;
  /** Files to send (or attachments as they call it). */
  files?: File[];
  /** URL query. */
  // deno-lint-ignore no-explicit-any
  query?: any;
  /** The reason for the action. This will show up in the audit log. */
  reason?: string;
}

/** Makes request to the Discord API. */
export class HttpClient {
  /** Map of known buckets. */
  buckets = new Map<string, string>();
  /** Global rate limit. */
  globalRateLimit = new RateLimit();
  /** Map of known rate limits. */
  rateLimits = new Map<string, RateLimit>();

  /**
   * @param token Bot authentication token.
   * @param options HTTP client options.
   */
  constructor(public token: string, public options?: HttpClientOptions) {
  }

  /**
   * Make a request.
   *
   * @param method HTTP method.
   * @param path The path in relation to the base URL.
   * @param bucketId Bucket ID used for rate limit checking.
   * @param options HTTP client request options.
   */
  async request(
    method: string,
    path: string,
    bucketId: string,
    options?: RequestOptions,
  ) {
    const headers: HeadersInit = {
      "Accept": "application/json; charset=utf-8",
      "User-Agent": this.options?.userAgent ?? USER_AGENT,
    };
    if (options?.authorization !== false) {
      headers["Authorization"] = this.token;
    }
    if (options?.reason) {
      headers["X-Audit-Log-Reason"] = options.reason;
    }

    const body = requestBody(options?.data, options?.files);
    if (options?.data !== undefined && !options.files?.length) {
      headers["Content-Type"] = "application/json; charset=utf-8";
    }

    const baseUrl = this.options?.baseUrl ?? BASE_URL;
    const version = this.options?.version ?? VERSION;
    let url = `${baseUrl}api/v${version}${path}`;
    if (options?.query) {
      let str = "?";
      for (const key in options.query) {
        const value = options.query[key];
        str += `${encodeURIComponent(key)}=${encodeURIComponent(value)}&`;
      }
      url += str.slice(0, -1);
    }

    const params = bucketId.substring(bucketId.lastIndexOf(" "));
    const bucket = this.buckets.get(bucketId);
    let rateLimit = bucket ? this.rateLimits.get(bucket + params) : undefined;

    if (this.globalRateLimit.rateLimited) {
      await this.globalRateLimit.sleep();
    }
    if (rateLimit?.rateLimited) {
      await rateLimit.sleep();
    }

    const delay = this.options?.delay ?? DELAY;
    const retries = this.options?.retries ?? RETRIES;

    for (let i = 1; i <= retries; i++) {
      const response = await fetch(url, {
        body,
        headers,
        method,
        signal: AbortSignal.timeout(delay),
      });

      const data = response.headers.get("Content-Type") === "application/json"
        ? await response.json()
        : await response.text();

      const newBucket = response.headers.get("X-RateLimit-Bucket");
      if (newBucket !== null) {
        if (bucket && newBucket !== bucket) {
          logger.debug(
            `Encountered a new rate limit bucket for "${bucketId}" - Old:`,
            `"${bucket}" | New: "${newBucket}"`,
          );
        }
        this.buckets.set(bucketId, newBucket);

        if (!rateLimit) {
          const rateLimitId = newBucket + params;
          rateLimit = new RateLimit(bucketId, rateLimitId);
          this.rateLimits.set(rateLimitId, rateLimit);
        }
        rateLimit.buckets.add(newBucket);
        rateLimit.update(
          parseInt(response.headers.get("X-RateLimit-Remaining")!),
          parseInt(response.headers.get("X-RateLimit-Limit")!),
          parseFloat(response.headers.get("X-RateLimit-Reset-After")!) * 1e+3,
        );
      }

      if (response.status === 429) {
        const retryAfter = data.retry_after * 1e+3;
        const scope = response.headers.get("X-RateLimit-Scope");

        logger.debug(
          `Rate limited. Bucket ID: "${bucketId}" Scope: "${scope}" Retrying`,
          `${i}/${retries} in ${retryAfter} milliseconds`,
        );

        if (scope === "global") {
          await this.globalRateLimit.sleep(retryAfter);
        } else if (rateLimit) {
          await rateLimit.sleep(retryAfter);
        } else {
          await sleep(retryAfter);
        }
        continue;
      }

      this.globalRateLimit.next();
      rateLimit?.next();

      if (response.ok) {
        return data;
      }
      throw new HttpError(response, data);
    }
  }

  //#region endpoints
  /**
   * https://discord.dev/resources/guild#add-guild-member
   *
   * Adds a user to the guild, provided you have a valid oauth2 access token for the user with the `guilds.join` scope. Returns a 201 Created with the [guild member](https://discord.dev/resources/guild#guild-member-object) as the body, or 204 No Content if the user is already a member of the guild. Fires a [Guild Member Add](https://discord.dev/topics/gateway#guild-member-add) Gateway event.
   * 
   * For guilds with [Membership Screening](https://discord.dev/resources/guild#membership-screening-object) enabled, this endpoint will default to adding new members as `pending` in the [guild member object](https://discord.dev/resources/guild#guild-member-object). Members that are `pending` will have to complete membership screening before they become full members that can talk.
   * 
   * > info
   * > All parameters to this endpoint except for `access_token` are optional.
   * 
   * > info
   * > The Authorization header must be a Bot token (belonging to the same application used for authorization), and the bot must be a member of the guild with `CREATE_INSTANT_INVITE` permission.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   * @param userId https://discord.dev/resources/user#user-object
   */
   addGuildMember(guildId: Snowflake, userId: Snowflake, data: AddGuildMemberData): Promise<AddGuildMemberBody> {
    return this.request("PUT", GUILD_MEMBER(guildId, userId), `AddGuildMember ${guildId}`, {
      data,
    });
  }

  /**
   * https://discord.dev/resources/guild#add-guild-member-role
   *
   * Adds a role to a [guild member](https://discord.dev/resources/guild#guild-member-object). Requires the `MANAGE_ROLES` permission. Returns a 204 empty response on success. Fires a [Guild Member Update](https://discord.dev/topics/gateway#guild-member-update) Gateway event.
   * 
   * > info
   * > This endpoint supports the `X-Audit-Log-Reason` header.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   * @param userId https://discord.dev/resources/user#user-object
   * @param roleId https://discord.dev/topics/permissions#role-object
   */
  addGuildMemberRole(guildId: Snowflake, userId: Snowflake, roleId: Snowflake, reason?: string): Promise<AddGuildMemberRoleBody> {
    return this.request("PUT", GUILD_MEMBER_ROLE(guildId, userId, roleId), `AddGuildMemberRole ${guildId}`, {
      reason,
    });
  }

  /**
   * https://discord.dev/resources/channel#add-thread-member
   *
   * Adds another member to a thread. Requires the ability to send messages in the thread. Also requires the thread is not archived. Returns a 204 empty response if the member is successfully added or was already a member of the thread. Fires a [Thread Members Update](https://discord.dev/topics/gateway#thread-members-update) Gateway event.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   * @param userId https://discord.dev/resources/user#user-object
   */
  addThreadMember(channelId: Snowflake, userId: Snowflake): Promise<AddThreadMemberBody> {
    return this.request("PUT", CHANNEL_THREAD_MEMBER(channelId, userId), `AddThreadMember ${channelId}`);
  }

  /**
   * https://discord.dev/interactions/application-commands#batch-edit-application-command-permissions
   *
   * > danger
   * > This endpoint has been disabled with [updates to command permissions (Permissions v2)](https://discord.dev/change/log#updated-command-permissions). Instead, you can [edit each application command permissions](https://discord.dev/interactions/application/commands#edit-application-command-permissions) (though you should be careful to handle any potential [rate limits](https://discord.dev/topics/rate/limits)).
   * 
   *
   * @param applicationId https://discord.dev/resources/application#application-object
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  batchEditApplicationCommandPermissions(applicationId: Snowflake, guildId: Snowflake, data: BatchEditApplicationCommandPermissionsData): Promise<BatchEditApplicationCommandPermissionsBody> {
    return this.request("PUT", APPLICATION_GUILD_COMMANDS_PERMISSIONS(applicationId, guildId), `BatchEditApplicationCommandPermissions ${guildId}`, {
      data,
    });
  }

  /**
   * https://discord.dev/resources/guild#begin-guild-prune
   *
   * Begin a prune operation. Requires the `KICK_MEMBERS` permission. Returns an object with one `pruned` key indicating the number of members that were removed in the prune operation. For large guilds it's recommended to set the `compute_prune_count` option to `false`, forcing `pruned` to `null`. Fires multiple [Guild Member Remove](https://discord.dev/topics/gateway#guild-member-remove) Gateway events.
   * 
   * By default, prune will not remove users with roles. You can optionally include specific roles in your prune by providing the `include_roles` parameter. Any inactive user that has a subset of the provided role(s) will be included in the prune and users with additional roles will not.
   * 
   * > info
   * > This endpoint supports the `X-Audit-Log-Reason` header.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  beginGuildPrune(guildId: Snowflake, data: BeginGuildPruneData, reason?: string): Promise<BeginGuildPruneBody> {
    return this.request("POST", GUILD_PRUNE(guildId), `BeginGuildPrune ${guildId}`, {
      data,
      reason,
    });
  }

  /**
   * https://discord.dev/resources/channel#bulk-delete-messages
   *
   * Delete multiple messages in a single request. This endpoint can only be used on guild channels and requires the `MANAGE_MESSAGES` permission. Returns a 204 empty response on success. Fires a [Message Delete Bulk](https://discord.dev/topics/gateway#message-delete-bulk) Gateway event.
   * 
   * Any message IDs given that do not exist or are invalid will count towards the minimum and maximum message count (currently 2 and 100 respectively).
   * 
   * > warn
   * > This endpoint will not delete messages older than 2 weeks, and will fail with a 400 BAD REQUEST if any message provided is older than that or if any duplicate message IDs are provided.
   * 
   * > info
   * > This endpoint supports the `X-Audit-Log-Reason` header.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   */
  bulkDeleteMessages(channelId: Snowflake, data: BulkDeleteMessagesData, reason?: string): Promise<BulkDeleteMessagesBody> {
    return this.request("POST", CHANNEL_MESSAGES_BULK_DELETE(channelId), `BulkDeleteMessages ${channelId}`, {
      data,
      reason,
    });
  }

  /**
   * https://discord.dev/interactions/application-commands#bulk-overwrite-global-application-commands
   *
   * Takes a list of application commands, overwriting the existing global command list for this application. Returns `200` and a list of [application command](https://discord.dev/interactions/application/commands#application-command-object) objects. Commands that do not already exist will count toward daily application command create limits.
   * 
   * > danger
   * > This will overwrite **all** types of application commands: slash commands, user commands, and message commands.
   *
   * @param applicationId https://discord.dev/resources/application#application-object
   */
  bulkOverwriteGlobalApplicationCommands(applicationId: Snowflake, data: BulkOverwriteGlobalApplicationCommandsData): Promise<BulkOverwriteGlobalApplicationCommandsBody> {
    return this.request("PUT", APPLICATION_COMMANDS(applicationId), "BulkOverwriteGlobalApplicationCommands", {
      data,
    });
  }

  /**
   * https://discord.dev/interactions/application-commands#bulk-overwrite-guild-application-commands
   *
   * Takes a list of application commands, overwriting the existing command list for this application for the targeted guild. Returns `200` and a list of [application command](https://discord.dev/interactions/application/commands#application-command-object) objects.
   * 
   * > danger
   * > This will overwrite **all** types of application commands: slash commands, user commands, and message commands.
   *
   * @param applicationId https://discord.dev/resources/application#application-object
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  bulkOverwriteGuildApplicationCommands(applicationId: Snowflake, guildId: Snowflake, data: BulkOverwriteGuildApplicationCommandsData): Promise<BulkOverwriteGuildApplicationCommandsBody> {
    return this.request("PUT", APPLICATION_GUILD_COMMANDS(applicationId, guildId), `BulkOverwriteGuildApplicationCommands ${guildId}`, {
      data,
    });
  }

  /**
   * https://discord.dev/game-sdk/store#consume-sku
   *
   * Marks a given entitlement for the user as consumed, meaning it will no longer be returned in an entitlements check. **Ensure the user was granted whatever items the entitlement was for before consuming it!**
   *
   * @param applicationId https://discord.dev/game-sdk/sdk-starter-guide#get-set-up
   * @param entitlementId https://discord.dev/game-sdk/store#data-models-entitlement-struct
   */
  consumeSKU(applicationId: Snowflake, entitlementId: Snowflake): Promise<ConsumeSKUBody> {
    return this.request("POST", APPLICATION_ENTITLEMENT_CONSUME(applicationId, entitlementId), "ConsumeSKU");
  }

  /**
   * https://discord.dev/game-sdk/achievements#create-achievement
   *
   * Creates a new achievement for your application. Applications can have a maximum of 1000 achievements. This endpoint has a rate limit of 5 requests per 5 seconds per application.
   *
   * @param applicationId https://discord.dev/game-sdk/sdk-starter-guide#get-set-up
   */
  createAchievement(applicationId: Snowflake, data: CreateAchievementData): Promise<CreateAchievementBody> {
    return this.request("POST", APPLICATION_ACHIEVEMENTS(applicationId), "CreateAchievement", {
      data,
    });
  }

  /**
   * https://discord.dev/resources/channel#create-channel-invite
   *
   * Create a new [invite](https://discord.dev/resources/invite#invite-object) object for the channel. Only usable for guild channels. Requires the `CREATE_INSTANT_INVITE` permission. All JSON parameters for this route are optional, however the request body is not. If you are not sending any fields, you still have to send an empty JSON object (`{}`). Returns an [invite](https://discord.dev/resources/invite#invite-object) object. Fires an [Invite Create](https://discord.dev/topics/gateway#invite-create) Gateway event.
   * 
   * > info
   * > This endpoint supports the `X-Audit-Log-Reason` header.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   */
  createChannelInvite(channelId: Snowflake, data: CreateChannelInviteData, reason?: string): Promise<CreateChannelInviteBody> {
    return this.request("POST", CHANNEL_INVITES(channelId), `CreateChannelInvite ${channelId}`, {
      data,
      reason,
    });
  }

  /**
   * https://discord.dev/resources/user#create-dm
   *
   * Create a new DM channel with a user. Returns a [DM channel](https://discord.dev/resources/channel#channel-object) object.
   * 
   * > warn
   * > You should not use this endpoint to DM everyone in a server about something. DMs should generally be initiated by a user action. If you open a significant amount of DMs too quickly, your bot may be rate limited or blocked from opening new ones.
   */
  createDM(data: CreateDMData): Promise<CreateDMBody> {
    return this.request("POST", USER_ME_CHANNELS, "CreateDM", {
      data,
    });
  }

  /**
   * https://discord.dev/interactions/receiving-and-responding#create-followup-message
   *
   * Create a followup message for an Interaction. Functions the same as [Execute Webhook](https://discord.dev/resources/webhook#execute-webhook), but `wait` is always true. The `thread_id`, `avatar_url`, and `username` parameters are not supported when using this endpoint for interaction followups.
   * 
   * `flags` can be set to `64` to mark the message as ephemeral, except when it is the first followup message to a deferred Interactions Response. In that case, the `flags` field will be ignored, and the ephemerality of the message will be determined by the `flags` value in your original ACK.
   *
   * @param applicationId https://discord.dev/resources/application#application-object
   * @param interactionToken https://discord.dev/interactions/receiving-and-responding#interaction-object
   */
  createFollowupMessage(applicationId: Snowflake, interactionToken: string, data: CreateFollowupMessageData, files?: File[]): Promise<CreateFollowupMessageBody> {
    return this.request("POST", WEBHOOK_TOKEN(applicationId, interactionToken), `CreateFollowupMessage ${interactionToken}`, {
      data,
      files,
    });
  }

  /**
   * https://discord.dev/interactions/application-commands#create-global-application-command
   *
   * > danger
   * > Creating a command with the same name as an existing command for your application will overwrite the old command.
   * 
   * Create a new global command. Returns `201` and an [application command](https://discord.dev/interactions/application/commands#application-command-object) object.
   *
   * @param applicationId https://discord.dev/resources/application#application-object
   */
  createGlobalApplicationCommand(applicationId: Snowflake, data: CreateGlobalApplicationCommandData): Promise<CreateGlobalApplicationCommandBody> {
    return this.request("POST", APPLICATION_COMMANDS(applicationId), "CreateGlobalApplicationCommand", {
      data,
    });
  }

  /**
   * https://discord.dev/resources/user#create-group-dm
   *
   * Create a new group DM channel with multiple users. Returns a [DM channel](https://discord.dev/resources/channel#channel-object) object. This endpoint was intended to be used with the now-deprecated GameBridge SDK. DMs created with this endpoint will not be shown in the Discord client
   * 
   * > warn
   * > This endpoint is limited to 10 active group DMs.
   */
  createGroupDM(data: CreateGroupDMData): Promise<CreateGroupDMBody> {
    return this.request("POST", USER_ME_CHANNELS, "CreateGroupDM", {
      data,
    });
  }

  /**
   * https://discord.dev/resources/guild#create-guild
   *
   * Create a new guild. Returns a [guild](https://discord.dev/resources/guild#guild-object) object on success. Fires a [Guild Create](https://discord.dev/topics/gateway#guild-create) Gateway event.
   * 
   * > warn
   * > This endpoint can be used only by bots in less than 10 guilds.
   */
  createGuild(data: CreateGuildData): Promise<CreateGuildBody> {
    return this.request("POST", GUILDS, "CreateGuild", {
      data,
    });
  }

  /**
   * https://discord.dev/interactions/application-commands#create-guild-application-command
   *
   * > danger
   * > Creating a command with the same name as an existing command for your application will overwrite the old command.
   * 
   * Create a new guild command. New guild commands will be available in the guild immediately. Returns `201` and an [application command](https://discord.dev/interactions/application/commands#application-command-object) object. If the command did not already exist, it will count toward daily application command create limits.
   *
   * @param applicationId https://discord.dev/resources/application#application-object
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  createGuildApplicationCommand(applicationId: Snowflake, guildId: Snowflake, data: CreateGuildApplicationCommandData): Promise<CreateGuildApplicationCommandBody> {
    return this.request("POST", APPLICATION_GUILD_COMMANDS(applicationId, guildId), `CreateGuildApplicationCommand ${guildId}`, {
      data,
    });
  }

  /**
   * https://discord.dev/resources/guild#create-guild-ban
   *
   * Create a guild ban, and optionally delete previous messages sent by the banned user. Requires the `BAN_MEMBERS` permission. Returns a 204 empty response on success. Fires a [Guild Ban Add](https://discord.dev/topics/gateway#guild-ban-add) Gateway event.
   * 
   * > info
   * > This endpoint supports the `X-Audit-Log-Reason` header.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   * @param userId https://discord.dev/resources/user#user-object
   */
  createGuildBan(guildId: Snowflake, userId: Snowflake, data: CreateGuildBanData, reason?: string): Promise<CreateGuildBanBody> {
    return this.request("PUT", GUILD_BAN(guildId, userId), `CreateGuildBan ${guildId}`, {
      data,
      reason,
    });
  }

  /**
   * https://discord.dev/resources/guild#create-guild-channel
   *
   * Create a new [channel](https://discord.dev/resources/channel#channel-object) object for the guild. Requires the `MANAGE_CHANNELS` permission. If setting permission overwrites, only permissions your bot has in the guild can be allowed/denied. Setting `MANAGE_ROLES` permission in channels is only possible for guild administrators. Returns the new [channel](https://discord.dev/resources/channel#channel-object) object on success. Fires a [Channel Create](https://discord.dev/topics/gateway#channel-create) Gateway event.
   * 
   * > info
   * > All parameters to this endpoint are optional excluding `name`
   * 
   * > info
   * > This endpoint supports the `X-Audit-Log-Reason` header.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  createGuildChannel(guildId: Snowflake, data: CreateGuildChannelData, reason?: string): Promise<CreateGuildChannelBody> {
    return this.request("POST", GUILD_CHANNELS(guildId), `CreateGuildChannel ${guildId}`, {
      data,
      reason,
    });
  }

  /**
   * https://discord.dev/resources/emoji#create-guild-emoji
   *
   * Create a new emoji for the guild. Requires the `MANAGE_EMOJIS_AND_STICKERS` permission. Returns the new [emoji](https://discord.dev/resources/emoji#emoji-object) object on success. Fires a [Guild Emojis Update](https://discord.dev/topics/gateway#guild-emojis-update) Gateway event.
   * 
   * > warn
   * > Emojis and animated emojis have a maximum file size of 256kb. Attempting to upload an emoji larger than this limit will fail and return 400 Bad Request and an error message, but not a [JSON status code](https://discord.dev/topics/opcodes/and/status/codes#json).
   * 
   * > info
   * > This endpoint supports the `X-Audit-Log-Reason` header.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  createGuildEmoji(guildId: Snowflake, data: CreateGuildEmojiData, reason?: string): Promise<CreateGuildEmojiBody> {
    return this.request("POST", GUILD_EMOJIS(guildId), `CreateGuildEmoji ${guildId}`, {
      data,
      reason,
    });
  }

  /**
   * https://discord.dev/resources/guild-template#create-guild-from-guild-template
   *
   * Create a new guild based on a template. Returns a [guild](https://discord.dev/resources/guild#guild-object) object on success. Fires a [Guild Create](https://discord.dev/topics/gateway#guild-create) Gateway event.
   * 
   * > warn
   * > This endpoint can be used only by bots in less than 10 guilds.
   *
   * @param templateCode https://discord.dev/resources/guild-template#guild-template-object
   */
  createGuildFromGuildTemplate(templateCode: string, data: CreateGuildFromGuildTemplateData): Promise<CreateGuildFromGuildTemplateBody> {
    return this.request("POST", GUILDS_TEMPLATE(templateCode), "CreateGuildFromGuildTemplate", {
      data,
    });
  }

  /**
   * https://discord.dev/resources/guild#create-guild-role
   *
   * Create a new [role](https://discord.dev/topics/permissions#role-object) for the guild. Requires the `MANAGE_ROLES` permission. Returns the new [role](https://discord.dev/topics/permissions#role-object) object on success. Fires a [Guild Role Create](https://discord.dev/topics/gateway#guild-role-create) Gateway event. All JSON params are optional.
   * 
   * > info
   * > This endpoint supports the `X-Audit-Log-Reason` header.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  createGuildRole(guildId: Snowflake, data: CreateGuildRoleData, reason?: string): Promise<CreateGuildRoleBody> {
    return this.request("POST", GUILD_ROLES(guildId), `CreateGuildRole ${guildId}`, {
      data,
      reason,
    });
  }

  /**
   * https://discord.dev/resources/guild-scheduled-event#create-guild-scheduled-event
   *
   * Create a guild scheduled event in the guild. Returns a [guild scheduled event](https://discord.dev/resources/guild-scheduled-event#guild-scheduled-event-object) object on success.
   * 
   * > info
   * > A guild can have a maximum of 100 events with `SCHEDULED` or `ACTIVE` status at any time.
   * 
   * > info
   * > This endpoint supports the `X-Audit-Log-Reason` header.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  createGuildScheduledEvent(guildId: Snowflake, data: CreateGuildScheduledEventData, reason?: string): Promise<CreateGuildScheduledEventBody> {
    return this.request("POST", GUILD_SCHEDULED_EVENTS(guildId), `CreateGuildScheduledEvent ${guildId}`, {
      data,
      reason,
    });
  }

  /**
   * https://discord.dev/resources/sticker#create-guild-sticker
   *
   * Create a new sticker for the guild. Send a `multipart/form-data` body. Requires the `MANAGE_EMOJIS_AND_STICKERS` permission. Returns the new [sticker](https://discord.dev/resources/sticker#sticker-object) object on success.
   * 
   * > info
   * > This endpoint supports the `X-Audit-Log-Reason` header.
   * 
   * > warn
   * > Lottie stickers can only be uploaded on guilds that have either the `VERIFIED` and/or the `PARTNERED` [guild feature](https://discord.dev/resources/guild#guild-object-guild-features).
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  createGuildSticker(guildId: Snowflake, files?: File[], reason?: string): Promise<CreateGuildStickerBody> {
    return this.request("POST", GUILD_STICKERS(guildId), `CreateGuildSticker ${guildId}`, {
      files,
      reason,
    });
  }

  /**
   * https://discord.dev/resources/guild-template#create-guild-template
   *
   * Creates a template for the guild. Requires the `MANAGE_GUILD` permission. Returns the created [guild template](https://discord.dev/resources/guild-template#guild-template-object) object on success.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  createGuildTemplate(guildId: Snowflake, data: CreateGuildTemplateData): Promise<CreateGuildTemplateBody> {
    return this.request("POST", GUILD_TEMPLATES(guildId), `CreateGuildTemplate ${guildId}`, {
      data,
    });
  }

  /**
   * https://discord.dev/interactions/receiving-and-responding#create-interaction-response
   *
   * Create a response to an Interaction from the gateway. Body is an [interaction response](https://discord.dev/interactions/receiving-and-responding#interaction-response-object). Returns `204 No Content`.
   * 
   * This endpoint also supports file attachments similar to the webhook endpoints. Refer to [Uploading Files](https://discord.dev/reference#uploading-files) for details on uploading files and `multipart/form-data` requests.
   *
   * @param interactionId https://discord.dev/interactions/receiving-and-responding#interaction
   * @param interactionToken https://discord.dev/interactions/receiving-and-responding#interaction-object
   */
  createInteractionResponse(interactionId: Snowflake, interactionToken: string, data: CreateInteractionResponseData, files?: File[]): Promise<CreateInteractionResponseBody> {
    return this.request("POST", INTERACTION_TOKEN_CALLBACK(interactionId, interactionToken), `CreateInteractionResponse ${interactionToken}`, {
      data,
      files,
    });
  }

  /**
   * https://discord.dev/game-sdk/lobbies#create-lobby
   *
   * Creates a new lobby. Returns an object similar to the SDK `Lobby` struct, documented below.
   * 
   * To get a list of valid regions, call the [List Voice Regions](https://discord.com/developers/docs/resources/voice#list-voice-regions) endpoint.
   */
  createLobby(data: CreateLobbyData): Promise<CreateLobbyBody> {
    return this.request("POST", LOBBIES, "CreateLobby", {
      data,
    });
  }

  /**
   * https://discord.dev/game-sdk/lobbies#create-lobby-search
   *
   * Creates a lobby search for matchmaking around given criteria.
   */
  createLobbySearch(data: CreateLobbySearchData): Promise<CreateLobbySearchBody> {
    return this.request("POST", LOBBIES_SEARCH, "CreateLobbySearch", {
      data,
    });
  }

  /**
   * https://discord.dev/resources/channel#create-message
   *
   * > warn
   * > Discord may strip certain characters from message content, like invalid unicode characters or characters which cause unexpected message formatting. If you are passing user-generated strings into message content, consider sanitizing the data to prevent unexpected behavior and utilizing `allowed_mentions` to prevent unexpected mentions.
   * 
   * Post a message to a guild text or DM channel. Returns a [message](https://discord.dev/resources/channel#message-object) object. Fires a [Message Create](https://discord.dev/topics/gateway#message-create) Gateway event. See [message formatting](https://discord.dev/reference#message-formatting) for more information on how to properly format messages.
   * 
   * To create a message as a reply to another message, apps can include a [`message_reference`](https://discord.dev/resources/channel#message-reference-object-message-reference-structure) with a `message_id`. The `channel_id` and `guild_id` in the `message_reference` are optional, but will be validated if provided.
   * 
   * Files must be attached using a `multipart/form-data` body as described in [Uploading Files](https://discord.dev/reference#uploading-files).
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   */
  createMessage(channelId: Snowflake, data: CreateMessageData, files?: File[]): Promise<CreateMessageBody> {
    return this.request("POST", CHANNEL_MESSAGES(channelId), `CreateMessage ${channelId}`, {
      data,
      files,
    });
  }

  /**
   * https://discord.dev/game-sdk/store#create-purchase-discount
   *
   * Creates a discount for the given user on their next purchase of the given SKU. You should call this endpoint from your backend server just before calling [StartPurchase](https://discord.dev/game-sdk/store#startpurchase) for the SKU you wish to discount. The user will then see a discounted price for that SKU at time of payment. The discount is automatically consumed after successful purchase or if the TTL expires.
   *
   * @param skuId https://discord.dev/game-sdk/store#data-models-sku-struct
   * @param userId https://discord.dev/resources/user#user-object
   */
  createPurchaseDiscount(skuId: Snowflake, userId: Snowflake, data: CreatePurchaseDiscountData): Promise<CreatePurchaseDiscountBody> {
    return this.request("PUT", STORE_SKU_DISCOUNT(skuId, userId), "CreatePurchaseDiscount", {
      data,
    });
  }

  /**
   * https://discord.dev/resources/channel#create-reaction
   *
   * Create a reaction for the message. This endpoint requires the `READ_MESSAGE_HISTORY` permission to be present on the current user. Additionally, if nobody else has reacted to the message using this emoji, this endpoint requires the `ADD_REACTIONS` permission to be present on the current user. Returns a 204 empty response on success.
   * The `emoji` must be [URL Encoded](https://en.wikipedia.org/wiki/Percent-encoding) or the request will fail with `10014: Unknown Emoji`. To use custom emoji, you must encode it in the format `name:id` with the emoji name and emoji id.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   * @param messageId https://discord.dev/resources/channel#message-object
   * @param emoji https://discord.dev/resources/emoji#emoji-object
   */
  createReaction(channelId: Snowflake, messageId: Snowflake, emoji: string): Promise<CreateReactionBody> {
    return this.request("PUT", CHANNEL_MESSAGE_REACTION_ME(channelId, messageId, emoji), `CreateReaction ${channelId}`);
  }

  /**
   * https://discord.dev/resources/stage-instance#create-stage-instance
   *
   * Creates a new Stage instance associated to a Stage channel. Returns that [Stage instance](https://discord.dev/resources/stage/instance#stage-instance-object-stage-instance-structure).
   * 
   * Requires the user to be a moderator of the Stage channel.
   * 
   * > info
   * > This endpoint supports the `X-Audit-Log-Reason` header.
   */
  createStageInstance(data: CreateStageInstanceData, reason?: string): Promise<CreateStageInstanceBody> {
    return this.request("POST", STAGE_INSTANCES, "CreateStageInstance", {
      data,
      reason,
    });
  }

  /**
   * https://discord.dev/resources/webhook#create-webhook
   *
   * Creates a new webhook and returns a [webhook](https://discord.dev/resources/webhook#webhook-object) object on success. Requires the `MANAGE_WEBHOOKS` permission.
   * 
   * An error will be returned if a webhook name (`name`) is not valid. A webhook name is valid if:
   * - It does not contain the substring '**clyde**' (case-insensitive)
   * - It follows the nickname guidelines in the [Usernames and Nicknames](https://discord.dev/resources/user#usernames-and-nicknames) documentation, with an exception that webhook names can be up to 80 characters
   * 
   * > info
   * > This endpoint supports the `X-Audit-Log-Reason` header.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   */
  createWebhook(channelId: Snowflake, data: CreateWebhookData, reason?: string): Promise<CreateWebhookBody> {
    return this.request("POST", CHANNEL_WEBHOOKS(channelId), `CreateWebhook ${channelId}`, {
      data,
      reason,
    });
  }

  /**
   * https://discord.dev/resources/channel#crosspost-message
   *
   * Crosspost a message in a News Channel to following channels. This endpoint requires the `SEND_MESSAGES` permission, if the current user sent the message, or additionally the `MANAGE_MESSAGES` permission, for all other messages, to be present for the current user.
   * 
   * Returns a [message](https://discord.dev/resources/channel#message-object) object.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   * @param messageId https://discord.dev/resources/channel#message-object
   */
  crosspostMessage(channelId: Snowflake, messageId: Snowflake): Promise<CrosspostMessageBody> {
    return this.request("POST", CHANNEL_MESSAGE_CROSSPOST(channelId, messageId), `CrosspostMessage ${channelId}`);
  }

  /**
   * https://discord.dev/game-sdk/achievements#delete-achievement
   *
   * Deletes the given achievement from your application. This endpoint has a rate limit of 5 requests per 5 seconds per application.
   *
   * @param applicationId https://discord.dev/game-sdk/sdk-starter-guide#get-set-up
   * @param achievementId https://discord.dev/game-sdk/achievements#data-models-achievement-struct
   */
  deleteAchievement(applicationId: Snowflake, achievementId: Snowflake): Promise<DeleteAchievementBody> {
    return this.request("DELETE", APPLICATION_ACHIEVEMENT(applicationId, achievementId), "DeleteAchievement");
  }

  /**
   * https://discord.dev/resources/channel#delete-all-reactions
   *
   * Deletes all reactions on a message. This endpoint requires the `MANAGE_MESSAGES` permission to be present on the current user. Fires a [Message Reaction Remove All](https://discord.dev/topics/gateway#message-reaction-remove-all) Gateway event.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   * @param messageId https://discord.dev/resources/channel#message-object
   */
  deleteAllReactions(channelId: Snowflake, messageId: Snowflake): Promise<DeleteAllReactionsBody> {
    return this.request("DELETE", CHANNEL_MESSAGE_REACTIONS(channelId, messageId), `DeleteAllReactions ${channelId}`);
  }

  /**
   * https://discord.dev/resources/channel#delete-all-reactions-for-emoji
   *
   * Deletes all the reactions for a given emoji on a message. This endpoint requires the `MANAGE_MESSAGES` permission to be present on the current user. Fires a [Message Reaction Remove Emoji](https://discord.dev/topics/gateway#message-reaction-remove-emoji) Gateway event.
   * The `emoji` must be [URL Encoded](https://en.wikipedia.org/wiki/Percent-encoding) or the request will fail with `10014: Unknown Emoji`. To use custom emoji, you must encode it in the format `name:id` with the emoji name and emoji id.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   * @param messageId https://discord.dev/resources/channel#message-object
   * @param emoji https://discord.dev/resources/emoji#emoji-object
   */
  deleteAllReactionsForEmoji(channelId: Snowflake, messageId: Snowflake, emoji: string): Promise<DeleteAllReactionsForEmojiBody> {
    return this.request("DELETE", CHANNEL_MESSAGE_REACTION(channelId, messageId, emoji), `DeleteAllReactionsForEmoji ${channelId}`);
  }

  /**
   * https://discord.dev/resources/channel#delete-channel
   *
   * Delete a channel, or close a private message. Requires the `MANAGE_CHANNELS` permission for the guild, or `MANAGE_THREADS` if the channel is a thread. Deleting a category does not delete its child channels; they will have their `parent_id` removed and a [Channel Update](https://discord.dev/topics/gateway#channel-update) Gateway event will fire for each of them. Returns a [channel](https://discord.dev/resources/channel#channel-object) object on success. Fires a [Channel Delete](https://discord.dev/topics/gateway#channel-delete) Gateway event (or [Thread Delete](https://discord.dev/topics/gateway#thread-delete) if the channel was a thread).
   * 
   * > warn
   * > Deleting a guild channel cannot be undone. Use this with caution, as it is impossible to undo this action when performed on a guild channel. In contrast, when used with a private message, it is possible to undo the action by opening a private message with the recipient again.
   * 
   * > info
   * > For Community guilds, the Rules or Guidelines channel and the Community Updates channel cannot be deleted.
   * 
   * > info
   * > This endpoint supports the `X-Audit-Log-Reason` header.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   */
  deleteChannel(channelId: Snowflake, reason?: string): Promise<DeleteChannelBody> {
    return this.request("DELETE", CHANNEL(channelId), `DeleteChannel ${channelId}`, {
      reason,
    });
  }

  /**
   * https://discord.dev/resources/channel#delete-channel-permission
   *
   * Delete a channel permission overwrite for a user or role in a channel. Only usable for guild channels. Requires the `MANAGE_ROLES` permission. Returns a 204 empty response on success. For more information about permissions, see [permissions](https://discord.dev/topics/permissions#permissions)
   * 
   * > info
   * > This endpoint supports the `X-Audit-Log-Reason` header.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   * @param overwriteId https://discord.dev/resources/channel#overwrite-object
   */
  deleteChannelPermission(channelId: Snowflake, overwriteId: Snowflake, reason?: string): Promise<DeleteChannelPermissionBody> {
    return this.request("DELETE", CHANNEL_PERMISSION(channelId, overwriteId), `DeleteChannelPermission ${channelId}`, {
      reason,
    });
  }

  /**
   * https://discord.dev/interactions/receiving-and-responding#delete-followup-message
   *
   * Deletes a followup message for an Interaction. Returns `204 No Content` on success. Does not support ephemeral followups.
   * 
   *
   * @param applicationId https://discord.dev/resources/application#application-object
   * @param interactionToken https://discord.dev/interactions/receiving-and-responding#interaction-object
   * @param messageId https://discord.dev/resources/channel#message-object
   */
  deleteFollowupMessage(applicationId: Snowflake, interactionToken: string, messageId: Snowflake): Promise<DeleteFollowupMessageBody> {
    return this.request("DELETE", WEBHOOK_TOKEN_MESSAGE(applicationId, interactionToken, messageId), `DeleteFollowupMessage ${interactionToken}`);
  }

  /**
   * https://discord.dev/interactions/application-commands#delete-global-application-command
   *
   * Deletes a global command. Returns `204 No Content` on success.
   *
   * @param applicationId https://discord.dev/resources/application#application-object
   * @param commandId https://discord.dev/interactions/application/commands#application-command-object
   */
  deleteGlobalApplicationCommand(applicationId: Snowflake, commandId: Snowflake): Promise<DeleteGlobalApplicationCommandBody> {
    return this.request("DELETE", APPLICATION_COMMAND(applicationId, commandId), "DeleteGlobalApplicationCommand");
  }

  /**
   * https://discord.dev/resources/guild#delete-guild
   *
   * Delete a guild permanently. User must be owner. Returns `204 No Content` on success. Fires a [Guild Delete](https://discord.dev/topics/gateway#guild-delete) Gateway event.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  deleteGuild(guildId: Snowflake): Promise<DeleteGuildBody> {
    return this.request("DELETE", GUILD(guildId), `DeleteGuild ${guildId}`);
  }

  /**
   * https://discord.dev/interactions/application-commands#delete-guild-application-command
   *
   * Delete a guild command. Returns `204 No Content` on success.
   *
   * @param applicationId https://discord.dev/resources/application#application-object
   * @param guildId https://discord.dev/resources/guild#guild-object
   * @param commandId https://discord.dev/interactions/application/commands#application-command-object
   */
  deleteGuildApplicationCommand(applicationId: Snowflake, guildId: Snowflake, commandId: Snowflake): Promise<DeleteGuildApplicationCommandBody> {
    return this.request("DELETE", APPLICATION_GUILD_COMMAND(applicationId, guildId, commandId), `DeleteGuildApplicationCommand ${guildId}`);
  }

  /**
   * https://discord.dev/resources/emoji#delete-guild-emoji
   *
   * Delete the given emoji. Requires the `MANAGE_EMOJIS_AND_STICKERS` permission. Returns `204 No Content` on success. Fires a [Guild Emojis Update](https://discord.dev/topics/gateway#guild-emojis-update) Gateway event.
   * 
   * > info
   * > This endpoint supports the `X-Audit-Log-Reason` header.
   * 
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   * @param emojiId https://discord.dev/resources/emoji#emoji-object
   */
  deleteGuildEmoji(guildId: Snowflake, emojiId: Snowflake, reason?: string): Promise<DeleteGuildEmojiBody> {
    return this.request("DELETE", GUILD_EMOJI(guildId, emojiId), `DeleteGuildEmoji ${guildId}`, {
      reason,
    });
  }

  /**
   * https://discord.dev/resources/guild#delete-guild-integration
   *
   * Delete the attached [integration](https://discord.dev/resources/guild#integration-object) object for the guild. Deletes any associated webhooks and kicks the associated bot if there is one. Requires the `MANAGE_GUILD` permission. Returns a 204 empty response on success. Fires a [Guild Integrations Update](https://discord.dev/topics/gateway#guild-integrations-update) Gateway event.
   * 
   * > info
   * > This endpoint supports the `X-Audit-Log-Reason` header.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   * @param integrationId https://discord.dev/resources/guild#integration-object
   */
  deleteGuildIntegration(guildId: Snowflake, integrationId: Snowflake, reason?: string): Promise<DeleteGuildIntegrationBody> {
    return this.request("DELETE", GUILD_INTEGRATION(guildId, integrationId), `DeleteGuildIntegration ${guildId}`, {
      reason,
    });
  }

  /**
   * https://discord.dev/resources/guild#delete-guild-role
   *
   * Delete a guild role. Requires the `MANAGE_ROLES` permission. Returns a 204 empty response on success. Fires a [Guild Role Delete](https://discord.dev/topics/gateway#guild-role-delete) Gateway event.
   * 
   * > info
   * > This endpoint supports the `X-Audit-Log-Reason` header.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   * @param roleId https://discord.dev/topics/permissions#role-object
   */
  deleteGuildRole(guildId: Snowflake, roleId: Snowflake, reason?: string): Promise<DeleteGuildRoleBody> {
    return this.request("DELETE", GUILD_ROLE(guildId, roleId), `DeleteGuildRole ${guildId}`, {
      reason,
    });
  }

  /**
   * https://discord.dev/resources/guild-scheduled-event#delete-guild-scheduled-event
   *
   * Delete a guild scheduled event. Returns a `204` on success.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   * @param guildScheduledEventId https://discord.dev/resources/guild-scheduled-event#guild-scheduled-event-object
   */
  deleteGuildScheduledEvent(guildId: Snowflake, guildScheduledEventId: Snowflake): Promise<DeleteGuildScheduledEventBody> {
    return this.request("DELETE", GUILD_SCHEDULED_EVENT(guildId, guildScheduledEventId), `DeleteGuildScheduledEvent ${guildId}`);
  }

  /**
   * https://discord.dev/resources/sticker#delete-guild-sticker
   *
   * Delete the given sticker. Requires the `MANAGE_EMOJIS_AND_STICKERS` permission. Returns `204 No Content` on success.
   * 
   * > info
   * > This endpoint supports the `X-Audit-Log-Reason` header.
   * 
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   * @param stickerId https://discord.dev/resources/sticker#sticker-object
   */
  deleteGuildSticker(guildId: Snowflake, stickerId: Snowflake, reason?: string): Promise<DeleteGuildStickerBody> {
    return this.request("DELETE", GUILD_STICKER(guildId, stickerId), `DeleteGuildSticker ${guildId}`, {
      reason,
    });
  }

  /**
   * https://discord.dev/resources/guild-template#delete-guild-template
   *
   * Deletes the template. Requires the `MANAGE_GUILD` permission. Returns the deleted [guild template](https://discord.dev/resources/guild-template#guild-template-object) object on success.
   * 
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   * @param templateCode https://discord.dev/resources/guild-template#guild-template-object
   */
  deleteGuildTemplate(guildId: Snowflake, templateCode: string): Promise<DeleteGuildTemplateBody> {
    return this.request("DELETE", GUILD_TEMPLATE(guildId, templateCode), `DeleteGuildTemplate ${guildId}`);
  }

  /**
   * https://discord.dev/resources/invite#delete-invite
   *
   * Delete an invite. Requires the `MANAGE_CHANNELS` permission on the channel this invite belongs to, or `MANAGE_GUILD` to remove any invite across the guild. Returns an [invite](https://discord.dev/resources/invite#invite-object) object on success. Fires a [Invite Delete](https://discord.dev/topics/gateway#invite-delete) Gateway event.
   * 
   * > info
   * > This endpoint supports the `X-Audit-Log-Reason` header.
   * 
   *
   * @param inviteCode https://discord.dev/resources/invite#invite-object
   */
  deleteInvite(inviteCode: string, reason?: string): Promise<DeleteInviteBody> {
    return this.request("DELETE", INVITE(inviteCode), "DeleteInvite", {
      reason,
    });
  }

  /**
   * https://discord.dev/game-sdk/lobbies#delete-lobby
   *
   * Deletes a lobby.
   *
   * @param lobbyId https://discord.dev/game-sdk/lobbies#data-models-lobby-struct
   */
  deleteLobby(lobbyId: Snowflake): Promise<DeleteLobbyBody> {
    return this.request("DELETE", LOBBY(lobbyId), "DeleteLobby");
  }

  /**
   * https://discord.dev/resources/channel#delete-message
   *
   * Delete a message. If operating on a guild channel and trying to delete a message that was not sent by the current user, this endpoint requires the `MANAGE_MESSAGES` permission. Returns a 204 empty response on success. Fires a [Message Delete](https://discord.dev/topics/gateway#message-delete) Gateway event.
   * 
   * > info
   * > This endpoint supports the `X-Audit-Log-Reason` header.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   * @param messageId https://discord.dev/resources/channel#message-object
   */
  deleteMessage(channelId: Snowflake, messageId: Snowflake, reason?: string): Promise<DeleteMessageBody> {
    return this.request("DELETE", CHANNEL_MESSAGE(channelId, messageId), `DeleteMessage ${channelId}`, {
      reason,
    });
  }

  /**
   * https://discord.dev/interactions/receiving-and-responding#delete-original-interaction-response
   *
   * Deletes the initial Interaction response. Returns `204 No Content` on success. Does not support ephemeral followups.
   *
   * @param applicationId https://discord.dev/resources/application#application-object
   * @param interactionToken https://discord.dev/interactions/receiving-and-responding#interaction-object
   */
  deleteOriginalInteractionResponse(applicationId: Snowflake, interactionToken: string): Promise<DeleteOriginalInteractionResponseBody> {
    return this.request("DELETE", WEBHOOK_TOKEN_MESSAGE_ORIGINAL(applicationId, interactionToken), `DeleteOriginalInteractionResponse ${interactionToken}`);
  }

  /**
   * https://discord.dev/resources/channel#delete-own-reaction
   *
   * Delete a reaction the current user has made for the message. Returns a 204 empty response on success.
   * The `emoji` must be [URL Encoded](https://en.wikipedia.org/wiki/Percent-encoding) or the request will fail with `10014: Unknown Emoji`. To use custom emoji, you must encode it in the format `name:id` with the emoji name and emoji id.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   * @param messageId https://discord.dev/resources/channel#message-object
   * @param emoji https://discord.dev/resources/emoji#emoji-object
   */
  deleteOwnReaction(channelId: Snowflake, messageId: Snowflake, emoji: string): Promise<DeleteOwnReactionBody> {
    return this.request("DELETE", CHANNEL_MESSAGE_REACTION_ME(channelId, messageId, emoji), `DeleteOwnReaction ${channelId}`);
  }

  /**
   * https://discord.dev/game-sdk/store#delete-purchase-discount
   *
   * Deletes the currently active discount on the given SKU for the given user. You **do not need** to call this after a user has made a discounted purchase; successful discounted purchases will automatically remove the discount for that user for subsequent purchases.
   *
   * @param skuId https://discord.dev/game-sdk/store#data-models-sku-struct
   * @param userId https://discord.dev/resources/user#user-object
   */
  deletePurchaseDiscount(skuId: Snowflake, userId: Snowflake): Promise<DeletePurchaseDiscountBody> {
    return this.request("DELETE", STORE_SKU_DISCOUNT(skuId, userId), "DeletePurchaseDiscount");
  }

  /**
   * https://discord.dev/resources/stage-instance#delete-stage-instance
   *
   * Deletes the Stage instance. Returns `204 No Content`.
   * 
   * Requires the user to be a moderator of the Stage channel.
   * 
   * > info
   * > This endpoint supports the `X-Audit-Log-Reason` header.
   * 
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   */
  deleteStageInstance(channelId: Snowflake, reason?: string): Promise<DeleteStageInstanceBody> {
    return this.request("DELETE", STAGE_INSTANCE(channelId), `DeleteStageInstance ${channelId}`, {
      reason,
    });
  }

  /**
   * https://discord.dev/game-sdk/store#delete-test-entitlement
   *
   * Deletes a test entitlement for an application. You can only delete entitlements that were "purchased" in developer test mode; these are entitlements of `type == TestModePurchase`. You cannot use this route to delete arbitrary entitlements that users actually purchased.
   *
   * @param applicationId https://discord.dev/game-sdk/sdk-starter-guide#get-set-up
   * @param entitlementId https://discord.dev/game-sdk/store#data-models-entitlement-struct
   */
  deleteTestEntitlement(applicationId: Snowflake, entitlementId: Snowflake): Promise<DeleteTestEntitlementBody> {
    return this.request("DELETE", APPLICATION_ENTITLEMENT(applicationId, entitlementId), "DeleteTestEntitlement");
  }

  /**
   * https://discord.dev/resources/channel#delete-user-reaction
   *
   * Deletes another user's reaction. This endpoint requires the `MANAGE_MESSAGES` permission to be present on the current user. Returns a 204 empty response on success.
   * The `emoji` must be [URL Encoded](https://en.wikipedia.org/wiki/Percent-encoding) or the request will fail with `10014: Unknown Emoji`. To use custom emoji, you must encode it in the format `name:id` with the emoji name and emoji id.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   * @param messageId https://discord.dev/resources/channel#message-object
   * @param emoji https://discord.dev/resources/emoji#emoji-object
   * @param userId https://discord.dev/resources/user#user-object
   */
  deleteUserReaction(channelId: Snowflake, messageId: Snowflake, emoji: string, userId: Snowflake): Promise<DeleteUserReactionBody> {
    return this.request("DELETE", CHANNEL_MESSAGE_REACTION_USER(channelId, messageId, emoji, userId), `DeleteUserReaction ${channelId}`);
  }

  /**
   * https://discord.dev/resources/webhook#delete-webhook
   *
   * Delete a webhook permanently. Requires the `MANAGE_WEBHOOKS` permission. Returns a `204 No Content` response on success.
   * 
   * > info
   * > This endpoint supports the `X-Audit-Log-Reason` header.
   *
   * @param webhookId https://discord.dev/resources/webhook#webhook-object
   */
  deleteWebhook(webhookId: Snowflake, reason?: string): Promise<DeleteWebhookBody> {
    return this.request("DELETE", WEBHOOK(webhookId), `DeleteWebhook ${webhookId}`, {
      reason,
    });
  }

  /**
   * https://discord.dev/resources/webhook#delete-webhook-message
   *
   * Deletes a message that was created by the webhook. Returns a `204 No Content` response on success.
   *
   * @param webhookId https://discord.dev/resources/webhook#webhook-object
   * @param webhookToken https://discord.dev/resources/webhook#webhook-object
   * @param messageId https://discord.dev/resources/channel#message-object
   */
  deleteWebhookMessage(webhookId: Snowflake, webhookToken: string, messageId: Snowflake, query: DeleteWebhookMessageQuery): Promise<DeleteWebhookMessageBody> {
    return this.request("DELETE", WEBHOOK_TOKEN_MESSAGE(webhookId, webhookToken, messageId), `DeleteWebhookMessage ${webhookId},${webhookToken}`, {
      query,
    });
  }

  /**
   * https://discord.dev/resources/webhook#delete-webhook-with-token
   *
   * Same as above, except this call does not require authentication.
   *
   * @param webhookId https://discord.dev/resources/webhook#webhook-object
   * @param webhookToken https://discord.dev/resources/webhook#webhook-object
   */
  deleteWebhookWithToken(webhookId: Snowflake, webhookToken: string): Promise<DeleteWebhookWithTokenBody> {
    return this.request("DELETE", WEBHOOK_TOKEN(webhookId, webhookToken), `DeleteWebhookWithToken ${webhookId},${webhookToken}`, {
      authorization: false,
    });
  }

  /**
   * https://discord.dev/interactions/application-commands#edit-application-command-permissions
   *
   * > warn
   * > This endpoint will overwrite existing permissions for the command in that guild
   * 
   * Edits command permissions for a specific command for your application in a guild and returns a [guild application command permissions](https://discord.dev/interactions/application/commands#application-command-permissions-object-guild-application-command-permissions-structure) object.
   * 
   * You can add up to 100 permission overwrites for a command.
   * 
   * > info
   * > This endpoint requires authentication with a Bearer token that has permission to manage the guild and its roles. For more information, read above about [application command permissions](https://discord.dev/interactions/application/commands#permissions).
   * 
   * > warn
   * > Deleting or renaming a command will permanently delete all permissions for the command
   *
   * @param applicationId https://discord.dev/resources/application#application-object
   * @param guildId https://discord.dev/resources/guild#guild-object
   * @param commandId https://discord.dev/interactions/application/commands#application-command-object
   */
  editApplicationCommandPermissions(applicationId: Snowflake, guildId: Snowflake, commandId: Snowflake, data: EditApplicationCommandPermissionsData): Promise<EditApplicationCommandPermissionsBody> {
    return this.request("PUT", APPLICATION_GUILD_COMMAND_PERMISSIONS(applicationId, guildId, commandId), `EditApplicationCommandPermissions ${guildId}`, {
      data,
    });
  }

  /**
   * https://discord.dev/resources/channel#edit-channel-permissions
   *
   * Edit the channel permission overwrites for a user or role in a channel. Only usable for guild channels. Requires the `MANAGE_ROLES` permission. Only permissions your bot has in the guild or parent channel (if applicable) can be allowed/denied (unless your bot has a `MANAGE_ROLES` overwrite in the channel). Returns a 204 empty response on success. For more information about permissions, see [permissions](https://discord.dev/topics/permissions#permissions).
   * 
   * > info
   * > This endpoint supports the `X-Audit-Log-Reason` header.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   * @param overwriteId https://discord.dev/resources/channel#overwrite-object
   */
  editChannelPermissions(channelId: Snowflake, overwriteId: Snowflake, data: EditChannelPermissionsData, reason?: string): Promise<EditChannelPermissionsBody> {
    return this.request("PUT", CHANNEL_PERMISSION(channelId, overwriteId), `EditChannelPermissions ${channelId}`, {
      data,
      reason,
    });
  }

  /**
   * https://discord.dev/interactions/receiving-and-responding#edit-followup-message
   *
   * Edits a followup message for an Interaction. Functions the same as [Edit Webhook Message](https://discord.dev/resources/webhook#edit-webhook-message).
   *
   * @param applicationId https://discord.dev/resources/application#application-object
   * @param interactionToken https://discord.dev/interactions/receiving-and-responding#interaction-object
   * @param messageId https://discord.dev/resources/channel#message-object
   */
  editFollowupMessage(applicationId: Snowflake, interactionToken: string, messageId: Snowflake, data: EditFollowupMessageData, files?: File[]): Promise<EditFollowupMessageBody> {
    return this.request("PATCH", WEBHOOK_TOKEN_MESSAGE(applicationId, interactionToken, messageId), `EditFollowupMessage ${interactionToken}`, {
      data,
      files,
    });
  }

  /**
   * https://discord.dev/interactions/application-commands#edit-global-application-command
   *
   * > info
   * > All parameters for this endpoint are optional.
   * 
   * Edit a global command. Returns `200` and an [application command](https://discord.dev/interactions/application/commands#application-command-object) object. All fields are optional, but any fields provided will entirely overwrite the existing values of those fields.
   *
   * @param applicationId https://discord.dev/resources/application#application-object
   * @param commandId https://discord.dev/interactions/application/commands#application-command-object
   */
  editGlobalApplicationCommand(applicationId: Snowflake, commandId: Snowflake, data: EditGlobalApplicationCommandData): Promise<EditGlobalApplicationCommandBody> {
    return this.request("PATCH", APPLICATION_COMMAND(applicationId, commandId), "EditGlobalApplicationCommand", {
      data,
    });
  }

  /**
   * https://discord.dev/interactions/application-commands#edit-guild-application-command
   *
   * > info
   * > All parameters for this endpoint are optional.
   * 
   * Edit a guild command. Updates for guild commands will be available immediately. Returns `200` and an [application command](https://discord.dev/interactions/application/commands#application-command-object) object. All fields are optional, but any fields provided will entirely overwrite the existing values of those fields.
   *
   * @param applicationId https://discord.dev/resources/application#application-object
   * @param guildId https://discord.dev/resources/guild#guild-object
   * @param commandId https://discord.dev/interactions/application/commands#application-command-object
   */
  editGuildApplicationCommand(applicationId: Snowflake, guildId: Snowflake, commandId: Snowflake, data: EditGuildApplicationCommandData): Promise<EditGuildApplicationCommandBody> {
    return this.request("PATCH", APPLICATION_GUILD_COMMAND(applicationId, guildId, commandId), `EditGuildApplicationCommand ${guildId}`, {
      data,
    });
  }

  /**
   * https://discord.dev/resources/channel#edit-message
   *
   * Edit a previously sent message. The fields `content`, `embeds`, and `flags` can be edited by the original message author. Other users can only edit `flags` and only if they have the `MANAGE_MESSAGES` permission in the corresponding channel. When specifying flags, ensure to include all previously set flags/bits in addition to ones that you are modifying. Only `flags` documented in the table below may be modified by users (unsupported flag changes are currently ignored without error).
   * 
   * When the `content` field is edited, the `mentions` array in the message object will be reconstructed from scratch based on the new content. The `allowed_mentions` field of the edit request controls how this happens. If there is no explicit `allowed_mentions` in the edit request, the content will be parsed with _default_ allowances, that is, without regard to whether or not an `allowed_mentions` was present in the request that originally created the message.
   * 
   * Returns a [message](https://discord.dev/resources/channel#message-object) object. Fires a [Message Update](https://discord.dev/topics/gateway#message-update) Gateway event.
   * 
   * Refer to [Uploading Files](https://discord.dev/reference#uploading-files) for details on attachments and `multipart/form-data` requests.
   * Any provided files will be **appended** to the message. To remove or replace files you will have to supply the `attachments` field which specifies the files to retain on the message after edit.
   * 
   * > warn
   * > Starting with API v10, the `attachments` array must contain all attachments that should be present after edit, including **retained and new** attachments provided in the request body.
   * 
   * > info
   * > All parameters to this endpoint are optional and nullable.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   * @param messageId https://discord.dev/resources/channel#message-object
   */
  editMessage(channelId: Snowflake, messageId: Snowflake, data: EditMessageData, files?: File[]): Promise<EditMessageBody> {
    return this.request("PATCH", CHANNEL_MESSAGE(channelId, messageId), `EditMessage ${channelId}`, {
      data,
      files,
    });
  }

  /**
   * https://discord.dev/interactions/receiving-and-responding#edit-original-interaction-response
   *
   * Edits the initial Interaction response. Functions the same as [Edit Webhook Message](https://discord.dev/resources/webhook#edit-webhook-message).
   *
   * @param applicationId https://discord.dev/resources/application#application-object
   * @param interactionToken https://discord.dev/interactions/receiving-and-responding#interaction-object
   */
  editOriginalInteractionResponse(applicationId: Snowflake, interactionToken: string, data: EditOriginalInteractionResponseData, files?: File[]): Promise<EditOriginalInteractionResponseBody> {
    return this.request("PATCH", WEBHOOK_TOKEN_MESSAGE_ORIGINAL(applicationId, interactionToken), `EditOriginalInteractionResponse ${interactionToken}`, {
      data,
      files,
    });
  }

  /**
   * https://discord.dev/resources/webhook#edit-webhook-message
   *
   * Edits a previously-sent webhook message from the same token. Returns a [message](https://discord.dev/resources/channel#message-object) object on success.
   * 
   * When the `content` field is edited, the `mentions` array in the message object will be reconstructed from scratch based on the new content. The `allowed_mentions` field of the edit request controls how this happens. If there is no explicit `allowed_mentions` in the edit request, the content will be parsed with _default_ allowances, that is, without regard to whether or not an `allowed_mentions` was present in the request that originally created the message.
   * 
   * Refer to [Uploading Files](https://discord.dev/reference#uploading-files) for details on attachments and `multipart/form-data` requests.
   * Any provided files will be **appended** to the message. To remove or replace files you will have to supply the `attachments` field which specifies the files to retain on the message after edit.
   * 
   * > warn
   * > Starting with API v10, the `attachments` array must contain all attachments that should be present after edit, including **retained and new** attachments provided in the request body.
   * 
   * > info
   * > All parameters to this endpoint are optional and nullable.
   *
   * @param webhookId https://discord.dev/resources/webhook#webhook-object
   * @param webhookToken https://discord.dev/resources/webhook#webhook-object
   * @param messageId https://discord.dev/resources/channel#message-object
   */
  editWebhookMessage(webhookId: Snowflake, webhookToken: string, messageId: Snowflake, data: EditWebhookMessageData, query: EditWebhookMessageQuery, files?: File[]): Promise<EditWebhookMessageBody> {
    return this.request("PATCH", WEBHOOK_TOKEN_MESSAGE(webhookId, webhookToken, messageId), `EditWebhookMessage ${webhookId},${webhookToken}`, {
      data,
      query,
      files,
    });
  }

  /**
   * https://discord.dev/resources/webhook#execute-github-compatible-webhook
   *
   * Add a new webhook to your GitHub repo (in the repo's settings), and use this endpoint as the "Payload URL." You can choose what events your Discord channel receives by choosing the "Let me select individual events" option and selecting individual events for the new webhook you're configuring.
   *
   * @param webhookId https://discord.dev/resources/webhook#webhook-object
   * @param webhookToken https://discord.dev/resources/webhook#webhook-object
   */
  executeGitHubCompatibleWebhook(webhookId: Snowflake, webhookToken: string, query: ExecuteGitHubCompatibleWebhookQuery): Promise<ExecuteGitHubCompatibleWebhookBody> {
    return this.request("POST", WEBHOOK_TOKEN_GITHUB(webhookId, webhookToken), `ExecuteGitHubCompatibleWebhook ${webhookId},${webhookToken}`, {
      query,
    });
  }

  /**
   * https://discord.dev/resources/webhook#execute-slack-compatible-webhook
   *
   * Refer to [Slack's documentation](https://api.slack.com/incoming-webhooks) for more information. We do not support Slack's `channel`, `icon_emoji`, `mrkdwn`, or `mrkdwn_in` properties.
   *
   * @param webhookId https://discord.dev/resources/webhook#webhook-object
   * @param webhookToken https://discord.dev/resources/webhook#webhook-object
   */
  executeSlackCompatibleWebhook(webhookId: Snowflake, webhookToken: string, query: ExecuteSlackCompatibleWebhookQuery): Promise<ExecuteSlackCompatibleWebhookBody> {
    return this.request("POST", WEBHOOK_TOKEN_SLACK(webhookId, webhookToken), `ExecuteSlackCompatibleWebhook ${webhookId},${webhookToken}`, {
      query,
    });
  }

  /**
   * https://discord.dev/resources/webhook#execute-webhook
   *
   * Refer to [Uploading Files](https://discord.dev/reference#uploading-files) for details on attachments and `multipart/form-data` requests. Returns a message or `204 No Content` depending on the `wait` query parameter.
   * 
   * > info
   * > Note that when sending a message, you must provide a value for at **least one of** `content`, `embeds`, or `file`.
   *
   * @param webhookId https://discord.dev/resources/webhook#webhook-object
   * @param webhookToken https://discord.dev/resources/webhook#webhook-object
   */
  executeWebhook(webhookId: Snowflake, webhookToken: string, data: ExecuteWebhookData, query: ExecuteWebhookQuery, files?: File[]): Promise<ExecuteWebhookBody> {
    return this.request("POST", WEBHOOK_TOKEN(webhookId, webhookToken), `ExecuteWebhook ${webhookId},${webhookToken}`, {
      authorization: false,
      data,
      query,
      files,
    });
  }

  /**
   * https://discord.dev/resources/channel#follow-news-channel
   *
   * Follow a News Channel to send messages to a target channel. Requires the `MANAGE_WEBHOOKS` permission in the target channel. Returns a [followed channel](https://discord.dev/resources/channel#followed-channel-object) object.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   */
  followNewsChannel(channelId: Snowflake, data: FollowNewsChannelData): Promise<FollowNewsChannelBody> {
    return this.request("POST", CHANNEL_FOLLOWERS(channelId), `FollowNewsChannel ${channelId}`, {
      data,
    });
  }

  /**
   * https://discord.dev/game-sdk/achievements#get-achievement
   *
   * Returns the given achievement for the given application. This endpoint has a rate limit of 5 requests per 5 seconds per application.
   *
   * @param applicationId https://discord.dev/game-sdk/sdk-starter-guide#get-set-up
   * @param achievementId https://discord.dev/game-sdk/achievements#data-models-achievement-struct
   */
  getAchievement(applicationId: Snowflake, achievementId: Snowflake): Promise<GetAchievementBody> {
    return this.request("GET", APPLICATION_ACHIEVEMENT(applicationId, achievementId), "GetAchievement");
  }

  /**
   * https://discord.dev/game-sdk/achievements#get-achievements
   *
   * Returns all achievements for the given application. This endpoint has a rate limit of 5 requests per 5 seconds per application.
   *
   * @param applicationId https://discord.dev/game-sdk/sdk-starter-guide#get-set-up
   */
  getAchievements(applicationId: Snowflake): Promise<GetAchievementsBody> {
    return this.request("GET", APPLICATION_ACHIEVEMENTS(applicationId), "GetAchievements");
  }

  /**
   * https://discord.dev/interactions/application-commands#get-application-command-permissions
   *
   * Fetches permissions for a specific command for your application in a guild. Returns a [guild application command permissions](https://discord.dev/interactions/application/commands#application-command-permissions-object-guild-application-command-permissions-structure) object.
   *
   * @param applicationId https://discord.dev/resources/application#application-object
   * @param guildId https://discord.dev/resources/guild#guild-object
   * @param commandId https://discord.dev/interactions/application/commands#application-command-object
   */
  getApplicationCommandPermissions(applicationId: Snowflake, guildId: Snowflake, commandId: Snowflake): Promise<GetApplicationCommandPermissionsBody> {
    return this.request("GET", APPLICATION_GUILD_COMMAND_PERMISSIONS(applicationId, guildId, commandId), `GetApplicationCommandPermissions ${guildId}`);
  }

  /**
   * https://discord.dev/resources/channel#get-channel
   *
   * Get a channel by ID. Returns a [channel](https://discord.dev/resources/channel#channel-object) object.  If the channel is a thread, a [thread member](https://discord.dev/resources/channel#thread-member-object) object is included in the returned result.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   */
  getChannel(channelId: Snowflake): Promise<GetChannelBody> {
    return this.request("GET", CHANNEL(channelId), `GetChannel ${channelId}`);
  }

  /**
   * https://discord.dev/resources/channel#get-channel-invites
   *
   * Returns a list of [invite](https://discord.dev/resources/invite#invite-object) objects (with [invite metadata](https://discord.dev/resources/invite#invite-metadata-object)) for the channel. Only usable for guild channels. Requires the `MANAGE_CHANNELS` permission.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   */
  getChannelInvites(channelId: Snowflake): Promise<GetChannelInvitesBody> {
    return this.request("GET", CHANNEL_INVITES(channelId), `GetChannelInvites ${channelId}`);
  }

  /**
   * https://discord.dev/resources/channel#get-channel-message
   *
   * Returns a specific message in the channel. If operating on a guild channel, this endpoint requires the `READ_MESSAGE_HISTORY` permission to be present on the current user. Returns a [message](https://discord.dev/resources/channel#message-object) object on success.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   * @param messageId https://discord.dev/resources/channel#message-object
   */
  getChannelMessage(channelId: Snowflake, messageId: Snowflake): Promise<GetChannelMessageBody> {
    return this.request("GET", CHANNEL_MESSAGE(channelId, messageId), `GetChannelMessage ${channelId}`);
  }

  /**
   * https://discord.dev/resources/channel#get-channel-messages
   *
   * Returns the messages for a channel. If operating on a guild channel, this endpoint requires the `VIEW_CHANNEL` permission to be present on the current user. If the current user is missing the `READ_MESSAGE_HISTORY` permission in the channel then this will return no messages (since they cannot read the message history). Returns an array of [message](https://discord.dev/resources/channel#message-object) objects on success.
   * 
   * > info
   * > The `before`, `after`, and `around` parameters are mutually exclusive, only one may be passed at a time.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   */
  getChannelMessages(channelId: Snowflake, query: GetChannelMessagesQuery): Promise<GetChannelMessagesBody> {
    return this.request("GET", CHANNEL_MESSAGES(channelId), `GetChannelMessages ${channelId}`, {
      query,
    });
  }

  /**
   * https://discord.dev/resources/webhook#get-channel-webhooks
   *
   * Returns a list of channel [webhook](https://discord.dev/resources/webhook#webhook-object) objects. Requires the `MANAGE_WEBHOOKS` permission.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   */
  getChannelWebhooks(channelId: Snowflake): Promise<GetChannelWebhooksBody> {
    return this.request("GET", CHANNEL_WEBHOOKS(channelId), `GetChannelWebhooks ${channelId}`);
  }

  /**
   * https://discord.dev/topics/oauth2#get-current-authorization-information
   *
   * Returns info about the current authorization. Requires authentication with a bearer token.
   */
  getCurrentAuthorizationInformation(): Promise<GetCurrentAuthorizationInformationBody> {
    return this.request("GET", OAUTH2_ME, "GetCurrentAuthorizationInformation");
  }

  /**
   * https://discord.dev/topics/oauth2#get-current-bot-application-information
   *
   * Returns the bot's [application](https://discord.dev/resources/application#application-object) object.
   */
  getCurrentBotApplicationInformation(): Promise<GetCurrentBotApplicationInformationBody> {
    return this.request("GET", OAUTH2_APPLICATION_ME, "GetCurrentBotApplicationInformation");
  }

  /**
   * https://discord.dev/resources/user#get-current-user
   *
   * Returns the [user](https://discord.dev/resources/user#user-object) object of the requester's account. For OAuth2, this requires the `identify` scope, which will return the object _without_ an email, and optionally the `email` scope, which returns the object _with_ an email.
   */
  getCurrentUser(): Promise<GetCurrentUserBody> {
    return this.request("GET", USER_ME, "GetCurrentUser");
  }

  /**
   * https://discord.dev/resources/user#get-current-user-guild-member
   *
   * Returns a [guild member](https://discord.dev/resources/guild#guild-member-object) object for the current user. Requires the `guilds.members.read` OAuth2 scope.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  getCurrentUserGuildMember(guildId: Snowflake): Promise<GetCurrentUserGuildMemberBody> {
    return this.request("GET", USER_ME_GUILD_MEMBER(guildId), `GetCurrentUserGuildMember ${guildId}`);
  }

  /**
   * https://discord.dev/resources/user#get-current-user-guilds
   *
   * Returns a list of partial [guild](https://discord.dev/resources/guild#guild-object) objects the current user is a member of. Requires the `guilds` OAuth2 scope.
   */
  getCurrentUserGuilds(query: GetCurrentUserGuildsQuery): Promise<GetCurrentUserGuildsBody> {
    return this.request("GET", USER_ME_GUILDS, "GetCurrentUserGuilds", {
      query,
    });
  }

  /**
   * https://discord.dev/game-sdk/store#get-entitlement
   *
   * Fetch an entitlement by its ID. This may be useful in confirming that a user has a given entitlement that another call or the SDK says they do.
   *
   * @param applicationId https://discord.dev/game-sdk/sdk-starter-guide#get-set-up
   * @param entitlementId https://discord.dev/game-sdk/store#data-models-entitlement-struct
   */
  getEntitlement(applicationId: Snowflake, entitlementId: Snowflake, query: GetEntitlementQuery): Promise<GetEntitlementBody> {
    return this.request("GET", APPLICATION_ENTITLEMENT(applicationId, entitlementId), "GetEntitlement", {
      query,
    });
  }

  /**
   * https://discord.dev/game-sdk/store#get-entitlements
   *
   * Gets entitlements for a given user. You can use this on your game backend to check entitlements of an arbitrary user, or perhaps in an administrative panel for your support team.
   *
   * @param applicationId https://discord.dev/game-sdk/sdk-starter-guide#get-set-up
   */
  getEntitlements(applicationId: Snowflake, query: GetEntitlementsQuery): Promise<GetEntitlementsBody> {
    return this.request("GET", APPLICATION_ENTITLEMENTS(applicationId), "GetEntitlements", {
      query,
    });
  }

  /**
   * https://discord.dev/interactions/receiving-and-responding#get-followup-message
   *
   * Returns a followup message for an Interaction. Functions the same as [Get Webhook Message](https://discord.dev/resources/webhook#get-webhook-message).
   *
   * @param applicationId https://discord.dev/resources/application#application-object
   * @param interactionToken https://discord.dev/interactions/receiving-and-responding#interaction-object
   * @param messageId https://discord.dev/resources/channel#message-object
   */
  getFollowupMessage(applicationId: Snowflake, interactionToken: string, messageId: Snowflake): Promise<GetFollowupMessageBody> {
    return this.request("GET", WEBHOOK_TOKEN_MESSAGE(applicationId, interactionToken, messageId), `GetFollowupMessage ${interactionToken}`);
  }

  /**
   * https://discord.dev/topics/gateway#get-gateway
   *
   * > info
   * > This endpoint does not require authentication.
   * 
   * Returns an object with a single valid WSS URL, which the client can use for [Connecting](https://discord.dev/topics/gateway#connecting). Clients **should** cache this value and only call this endpoint to retrieve a new URL if they are unable to properly establish a connection using the cached version of the URL.
   */
  getGateway(): Promise<GetGatewayBody> {
    return this.request("GET", GATEWAY, "GetGateway", {
      authorization: false,
    });
  }

  /**
   * https://discord.dev/topics/gateway#get-gateway-bot
   *
   * > warn
   * > This endpoint requires authentication using a valid bot token.
   * 
   * Returns an object based on the information in [Get Gateway](https://discord.dev/topics/gateway#get-gateway), plus additional metadata that can help during the operation of large or [sharded](https://discord.dev/topics/gateway#sharding) bots. Unlike the [Get Gateway](https://discord.dev/topics/gateway#get-gateway), this route should not be cached for extended periods of time as the value is not guaranteed to be the same per-call, and changes as the bot joins/leaves guilds.
   */
  getGatewayBot(): Promise<GetGatewayBotBody> {
    return this.request("GET", GATEWAY_BOT, "GetGatewayBot");
  }

  /**
   * https://discord.dev/interactions/application-commands#get-global-application-command
   *
   * Fetch a global command for your application. Returns an [application command](https://discord.dev/interactions/application/commands#application-command-object) object.
   *
   * @param applicationId https://discord.dev/resources/application#application-object
   * @param commandId https://discord.dev/interactions/application/commands#application-command-object
   */
  getGlobalApplicationCommand(applicationId: Snowflake, commandId: Snowflake): Promise<GetGlobalApplicationCommandBody> {
    return this.request("GET", APPLICATION_COMMAND(applicationId, commandId), "GetGlobalApplicationCommand");
  }

  /**
   * https://discord.dev/interactions/application-commands#get-global-application-commands
   *
   * > warn
   * > The objects returned by this endpoint may be augmented with [additional fields if localization is active](https://discord.dev/interactions/application/commands#retrieving-localized-commands).
   * 
   * Fetch all of the global commands for your application. Returns an array of [application command](https://discord.dev/interactions/application/commands#application-command-object) objects.
   *
   * @param applicationId https://discord.dev/resources/application#application-object
   */
  getGlobalApplicationCommands(applicationId: Snowflake, query: GetGlobalApplicationCommandsQuery): Promise<GetGlobalApplicationCommandsBody> {
    return this.request("GET", APPLICATION_COMMANDS(applicationId), "GetGlobalApplicationCommands", {
      query,
    });
  }

  /**
   * https://discord.dev/resources/guild#get-guild
   *
   * Returns the [guild](https://discord.dev/resources/guild#guild-object) object for the given id. If `with_counts` is set to `true`, this endpoint will also return `approximate_member_count` and `approximate_presence_count` for the guild.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  getGuild(guildId: Snowflake, query: GetGuildQuery): Promise<GetGuildBody> {
    return this.request("GET", GUILD(guildId), `GetGuild ${guildId}`, {
      query,
    });
  }

  /**
   * https://discord.dev/interactions/application-commands#get-guild-application-command
   *
   * Fetch a guild command for your application. Returns an [application command](https://discord.dev/interactions/application/commands#application-command-object) object.
   *
   * @param applicationId https://discord.dev/resources/application#application-object
   * @param guildId https://discord.dev/resources/guild#guild-object
   * @param commandId https://discord.dev/interactions/application/commands#application-command-object
   */
  getGuildApplicationCommand(applicationId: Snowflake, guildId: Snowflake, commandId: Snowflake): Promise<GetGuildApplicationCommandBody> {
    return this.request("GET", APPLICATION_GUILD_COMMAND(applicationId, guildId, commandId), `GetGuildApplicationCommand ${guildId}`);
  }

  /**
   * https://discord.dev/interactions/application-commands#get-guild-application-command-permissions
   *
   * Fetches permissions for all commands for your application in a guild. Returns an array of [guild application command permissions](https://discord.dev/interactions/application/commands#application-command-permissions-object-guild-application-command-permissions-structure) objects.
   *
   * @param applicationId https://discord.dev/resources/application#application-object
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  getGuildApplicationCommandPermissions(applicationId: Snowflake, guildId: Snowflake): Promise<GetGuildApplicationCommandPermissionsBody> {
    return this.request("GET", APPLICATION_GUILD_COMMANDS_PERMISSIONS(applicationId, guildId), `GetGuildApplicationCommandPermissions ${guildId}`);
  }

  /**
   * https://discord.dev/interactions/application-commands#get-guild-application-commands
   *
   * > warn
   * > The objects returned by this endpoint may be augmented with [additional fields if localization is active](https://discord.dev/interactions/application/commands#retrieving-localized-commands).
   * 
   * Fetch all of the guild commands for your application for a specific guild. Returns an array of [application command](https://discord.dev/interactions/application/commands#application-command-object) objects.
   *
   * @param applicationId https://discord.dev/resources/application#application-object
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  getGuildApplicationCommands(applicationId: Snowflake, guildId: Snowflake, query: GetGuildApplicationCommandsQuery): Promise<GetGuildApplicationCommandsBody> {
    return this.request("GET", APPLICATION_GUILD_COMMANDS(applicationId, guildId), `GetGuildApplicationCommands ${guildId}`, {
      query,
    });
  }

  /**
   * https://discord.dev/resources/audit-log#get-guild-audit-log
   *
   * Returns an [audit log](https://discord.dev/resources/audit/log#audit-log-object) object for the guild. Requires the [`VIEW_AUDIT_LOG`](https://discord.dev/topics/permissions#permissions-bitwise-permission-flags) permission.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  getGuildAuditLog(guildId: Snowflake, query: GetGuildAuditLogQuery): Promise<GetGuildAuditLogBody> {
    return this.request("GET", GUILD_AUDIT_LOGS(guildId), `GetGuildAuditLog ${guildId}`, {
      query,
    });
  }

  /**
   * https://discord.dev/resources/guild#get-guild-ban
   *
   * Returns a [ban](https://discord.dev/resources/guild#ban-object) object for the given user or a 404 not found if the ban cannot be found. Requires the `BAN_MEMBERS` permission.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   * @param userId https://discord.dev/resources/user#user-object
   */
  getGuildBan(guildId: Snowflake, userId: Snowflake): Promise<GetGuildBanBody> {
    return this.request("GET", GUILD_BAN(guildId, userId), `GetGuildBan ${guildId}`);
  }

  /**
   * https://discord.dev/resources/guild#get-guild-bans
   *
   * Returns a list of [ban](https://discord.dev/resources/guild#ban-object) objects for the users banned from this guild. Requires the `BAN_MEMBERS` permission.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  getGuildBans(guildId: Snowflake, query: GetGuildBansQuery): Promise<GetGuildBansBody> {
    return this.request("GET", GUILD_BANS(guildId), `GetGuildBans ${guildId}`, {
      query,
    });
  }

  /**
   * https://discord.dev/resources/guild#get-guild-channels
   *
   * Returns a list of guild [channel](https://discord.dev/resources/channel#channel-object) objects. Does not include threads.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  getGuildChannels(guildId: Snowflake): Promise<GetGuildChannelsBody> {
    return this.request("GET", GUILD_CHANNELS(guildId), `GetGuildChannels ${guildId}`);
  }

  /**
   * https://discord.dev/resources/emoji#get-guild-emoji
   *
   * Returns an [emoji](https://discord.dev/resources/emoji#emoji-object) object for the given guild and emoji IDs.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   * @param emojiId https://discord.dev/resources/emoji#emoji-object
   */
  getGuildEmoji(guildId: Snowflake, emojiId: Snowflake): Promise<GetGuildEmojiBody> {
    return this.request("GET", GUILD_EMOJI(guildId, emojiId), `GetGuildEmoji ${guildId}`);
  }

  /**
   * https://discord.dev/resources/guild#get-guild-integrations
   *
   * Returns a list of [integration](https://discord.dev/resources/guild#integration-object) objects for the guild. Requires the `MANAGE_GUILD` permission.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  getGuildIntegrations(guildId: Snowflake): Promise<GetGuildIntegrationsBody> {
    return this.request("GET", GUILD_INTEGRATIONS(guildId), `GetGuildIntegrations ${guildId}`);
  }

  /**
   * https://discord.dev/resources/guild#get-guild-invites
   *
   * Returns a list of [invite](https://discord.dev/resources/invite#invite-object) objects (with [invite metadata](https://discord.dev/resources/invite#invite-metadata-object)) for the guild. Requires the `MANAGE_GUILD` permission.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  getGuildInvites(guildId: Snowflake): Promise<GetGuildInvitesBody> {
    return this.request("GET", GUILD_INVITES(guildId), `GetGuildInvites ${guildId}`);
  }

  /**
   * https://discord.dev/resources/guild#get-guild-member
   *
   * Returns a [guild member](https://discord.dev/resources/guild#guild-member-object) object for the specified user.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   * @param userId https://discord.dev/resources/user#user-object
   */
  getGuildMember(guildId: Snowflake, userId: Snowflake): Promise<GetGuildMemberBody> {
    return this.request("GET", GUILD_MEMBER(guildId, userId), `GetGuildMember ${guildId}`);
  }

  /**
   * https://discord.dev/resources/guild#get-guild-preview
   *
   * Returns the [guild preview](https://discord.dev/resources/guild#guild-preview-object) object for the given id. If the user is not in the guild, then the guild must be lurkable.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  getGuildPreview(guildId: Snowflake): Promise<GetGuildPreviewBody> {
    return this.request("GET", GUILD_PREVIEW(guildId), `GetGuildPreview ${guildId}`);
  }

  /**
   * https://discord.dev/resources/guild#get-guild-prune-count
   *
   * Returns an object with one `pruned` key indicating the number of members that would be removed in a prune operation. Requires the `KICK_MEMBERS` permission.
   * 
   * By default, prune will not remove users with roles. You can optionally include specific roles in your prune by providing the `include_roles` parameter. Any inactive user that has a subset of the provided role(s) will be counted in the prune and users with additional roles will not.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  getGuildPruneCount(guildId: Snowflake, query: GetGuildPruneCountQuery): Promise<GetGuildPruneCountBody> {
    return this.request("GET", GUILD_PRUNE(guildId), `GetGuildPruneCount ${guildId}`, {
      query,
    });
  }

  /**
   * https://discord.dev/resources/guild#get-guild-roles
   *
   * Returns a list of [role](https://discord.dev/topics/permissions#role-object) objects for the guild.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  getGuildRoles(guildId: Snowflake): Promise<GetGuildRolesBody> {
    return this.request("GET", GUILD_ROLES(guildId), `GetGuildRoles ${guildId}`);
  }

  /**
   * https://discord.dev/resources/guild-scheduled-event#get-guild-scheduled-event
   *
   * Get a guild scheduled event. Returns a [guild scheduled event](https://discord.dev/resources/guild-scheduled-event#guild-scheduled-event-object) object on success.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   * @param guildScheduledEventId https://discord.dev/resources/guild-scheduled-event#guild-scheduled-event-object
   */
  getGuildScheduledEvent(guildId: Snowflake, guildScheduledEventId: Snowflake, query: GetGuildScheduledEventQuery): Promise<GetGuildScheduledEventBody> {
    return this.request("GET", GUILD_SCHEDULED_EVENT(guildId, guildScheduledEventId), `GetGuildScheduledEvent ${guildId}`, {
      query,
    });
  }

  /**
   * https://discord.dev/resources/guild-scheduled-event#get-guild-scheduled-event-users
   *
   * Get a list of guild scheduled event users subscribed to a guild scheduled event. Returns a list of [guild scheduled event user](https://discord.dev/resources/guild-scheduled-event#guild-scheduled-event-user-object) objects on success. Guild member data, if it exists, is included if the `with_member` query parameter is set.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   * @param guildScheduledEventId https://discord.dev/resources/guild-scheduled-event#guild-scheduled-event-object
   */
  getGuildScheduledEventUsers(guildId: Snowflake, guildScheduledEventId: Snowflake, data: GetGuildScheduledEventUsersData): Promise<GetGuildScheduledEventUsersBody> {
    return this.request("GET", GUILD_SCHEDULED_EVENT_USERS(guildId, guildScheduledEventId), `GetGuildScheduledEventUsers ${guildId}`, {
      data,
    });
  }

  /**
   * https://discord.dev/resources/sticker#get-guild-sticker
   *
   * Returns a [sticker](https://discord.dev/resources/sticker#sticker-object) object for the given guild and sticker IDs. Includes the `user` field if the bot has the `MANAGE_EMOJIS_AND_STICKERS` permission.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   * @param stickerId https://discord.dev/resources/sticker#sticker-object
   */
  getGuildSticker(guildId: Snowflake, stickerId: Snowflake): Promise<GetGuildStickerBody> {
    return this.request("GET", GUILD_STICKER(guildId, stickerId), `GetGuildSticker ${guildId}`);
  }

  /**
   * https://discord.dev/resources/guild-template#get-guild-template
   *
   * Returns a [guild template](https://discord.dev/resources/guild-template#guild-template-object) object for the given code.
   *
   * @param templateCode https://discord.dev/resources/guild-template#guild-template-object
   */
  getGuildTemplate(templateCode: string): Promise<GetGuildTemplateBody> {
    return this.request("GET", GUILDS_TEMPLATE(templateCode), "GetGuildTemplate");
  }

  /**
   * https://discord.dev/resources/guild-template#get-guild-templates
   *
   * Returns an array of [guild template](https://discord.dev/resources/guild-template#guild-template-object) objects. Requires the `MANAGE_GUILD` permission.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  getGuildTemplates(guildId: Snowflake): Promise<GetGuildTemplatesBody> {
    return this.request("GET", GUILD_TEMPLATES(guildId), `GetGuildTemplates ${guildId}`);
  }

  /**
   * https://discord.dev/resources/guild#get-guild-vanity-url
   *
   * Returns a partial [invite](https://discord.dev/resources/invite#invite-object) object for guilds with that feature enabled. Requires the `MANAGE_GUILD` permission. `code` will be null if a vanity url for the guild is not set.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  getGuildVanityURL(guildId: Snowflake): Promise<GetGuildVanityURLBody> {
    return this.request("GET", GUILD_VANITY_URL(guildId), `GetGuildVanityURL ${guildId}`);
  }

  /**
   * https://discord.dev/resources/guild#get-guild-voice-regions
   *
   * Returns a list of [voice region](https://discord.dev/resources/voice#voice-region-object) objects for the guild. Unlike the similar `/voice` route, this returns VIP servers when the guild is VIP-enabled.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  getGuildVoiceRegions(guildId: Snowflake): Promise<GetGuildVoiceRegionsBody> {
    return this.request("GET", GUILD_REGIONS(guildId), `GetGuildVoiceRegions ${guildId}`);
  }

  /**
   * https://discord.dev/resources/webhook#get-guild-webhooks
   *
   * Returns a list of guild [webhook](https://discord.dev/resources/webhook#webhook-object) objects. Requires the `MANAGE_WEBHOOKS` permission.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  getGuildWebhooks(guildId: Snowflake): Promise<GetGuildWebhooksBody> {
    return this.request("GET", GUILD_WEBHOOKS(guildId), `GetGuildWebhooks ${guildId}`);
  }

  /**
   * https://discord.dev/resources/guild#get-guild-welcome-screen
   *
   * Returns the [Welcome Screen](https://discord.dev/resources/guild#welcome-screen-object) object for the guild. If the welcome screen is not enabled, the `MANAGE_GUILD` permission is required.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  getGuildWelcomeScreen(guildId: Snowflake): Promise<GetGuildWelcomeScreenBody> {
    return this.request("GET", GUILD_WELCOME_SCREEN(guildId), `GetGuildWelcomeScreen ${guildId}`);
  }

  /**
   * https://discord.dev/resources/guild#get-guild-widget
   *
   * Returns the [widget](https://discord.dev/resources/guild#get-guild-widget-object) for the guild.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  getGuildWidget(guildId: Snowflake): Promise<GetGuildWidgetBody> {
    return this.request("GET", GUILD_WIDGET_JSON(guildId), `GetGuildWidget ${guildId}`, {
      authorization: false,
    });
  }

  /**
   * https://discord.dev/resources/guild#get-guild-widget-image
   *
   * Returns a PNG image widget for the guild. Requires no permissions or authentication.
   * 
   * > info
   * > All parameters to this endpoint are optional.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  getGuildWidgetImage(guildId: Snowflake, query: GetGuildWidgetImageQuery): Promise<GetGuildWidgetImageBody> {
    return this.request("GET", GUILD_WIDGET_PNG(guildId), `GetGuildWidgetImage ${guildId}`, {
      authorization: false,
      query,
    });
  }

  /**
   * https://discord.dev/resources/guild#get-guild-widget-settings
   *
   * Returns a [guild widget settings](https://discord.dev/resources/guild#guild-widget-settings-object) object. Requires the `MANAGE_GUILD` permission.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  getGuildWidgetSettings(guildId: Snowflake): Promise<GetGuildWidgetSettingsBody> {
    return this.request("GET", GUILD_WIDGET(guildId), `GetGuildWidgetSettings ${guildId}`);
  }

  /**
   * https://discord.dev/resources/invite#get-invite
   *
   * Returns an [invite](https://discord.dev/resources/invite#invite-object) object for the given code.
   *
   * @param inviteCode https://discord.dev/resources/invite#invite-object
   */
  getInvite(inviteCode: string, query: GetInviteQuery): Promise<GetInviteBody> {
    return this.request("GET", INVITE(inviteCode), "GetInvite", {
      authorization: false,
      query,
    });
  }

  /**
   * https://discord.dev/interactions/receiving-and-responding#get-original-interaction-response
   *
   * Returns the initial Interaction response. Functions the same as [Get Webhook Message](https://discord.dev/resources/webhook#get-webhook-message).
   *
   * @param applicationId https://discord.dev/resources/application#application-object
   * @param interactionToken https://discord.dev/interactions/receiving-and-responding#interaction-object
   */
  getOriginalInteractionResponse(applicationId: Snowflake, interactionToken: string): Promise<GetOriginalInteractionResponseBody> {
    return this.request("GET", WEBHOOK_TOKEN_MESSAGE_ORIGINAL(applicationId, interactionToken), `GetOriginalInteractionResponse ${interactionToken}`);
  }

  /**
   * https://discord.dev/resources/channel#get-pinned-messages
   *
   * Returns all pinned messages in the channel as an array of [message](https://discord.dev/resources/channel#message-object) objects.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   */
  getPinnedMessages(channelId: Snowflake): Promise<GetPinnedMessagesBody> {
    return this.request("GET", CHANNEL_PINS(channelId), `GetPinnedMessages ${channelId}`);
  }

  /**
   * https://discord.dev/resources/channel#get-reactions
   *
   * Get a list of users that reacted with this emoji. Returns an array of [user](https://discord.dev/resources/user#user-object) objects on success.
   * The `emoji` must be [URL Encoded](https://en.wikipedia.org/wiki/Percent-encoding) or the request will fail with `10014: Unknown Emoji`. To use custom emoji, you must encode it in the format `name:id` with the emoji name and emoji id.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   * @param messageId https://discord.dev/resources/channel#message-object
   * @param emoji https://discord.dev/resources/emoji#emoji-object
   */
  getReactions(channelId: Snowflake, messageId: Snowflake, emoji: string, query: GetReactionsQuery): Promise<GetReactionsBody> {
    return this.request("GET", CHANNEL_MESSAGE_REACTION(channelId, messageId, emoji), `GetReactions ${channelId}`, {
      query,
    });
  }

  /**
   * https://discord.dev/game-sdk/store#get-skus
   *
   * Get all SKUs for an application.
   *
   * @param applicationId https://discord.dev/game-sdk/sdk-starter-guide#get-set-up
   */
  getSKUs(applicationId: Snowflake): Promise<GetSKUsBody> {
    return this.request("GET", APPLICATION_SKUS(applicationId), "GetSKUs");
  }

  /**
   * https://discord.dev/resources/stage-instance#get-stage-instance
   *
   * Gets the stage instance associated with the Stage channel, if it exists.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   */
  getStageInstance(channelId: Snowflake): Promise<GetStageInstanceBody> {
    return this.request("GET", STAGE_INSTANCE(channelId), `GetStageInstance ${channelId}`);
  }

  /**
   * https://discord.dev/resources/sticker#get-sticker
   *
   * Returns a [sticker](https://discord.dev/resources/sticker#sticker-object) object for the given sticker ID.
   *
   * @param stickerId https://discord.dev/resources/sticker#sticker-object
   */
  getSticker(stickerId: Snowflake): Promise<GetStickerBody> {
    return this.request("GET", STICKER(stickerId), "GetSticker");
  }

  /**
   * https://discord.dev/resources/channel#get-thread-member
   *
   * Returns a [thread member](https://discord.dev/resources/channel#thread-member-object) object for the specified user if they are a member of the thread, returns a 404 response otherwise.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   * @param userId https://discord.dev/resources/user#user-object
   */
  getThreadMember(channelId: Snowflake, userId: Snowflake): Promise<GetThreadMemberBody> {
    return this.request("GET", CHANNEL_THREAD_MEMBER(channelId, userId), `GetThreadMember ${channelId}`);
  }

  /**
   * https://discord.dev/resources/user#get-user
   *
   * Returns a [user](https://discord.dev/resources/user#user-object) object for a given user ID.
   *
   * @param userId https://discord.dev/resources/user#user-object
   */
  getUser(userId: Snowflake): Promise<GetUserBody> {
    return this.request("GET", USER(userId), "GetUser");
  }

  /**
   * https://discord.dev/game-sdk/achievements#get-user-achievements
   *
   * Returns a list of achievements for the user whose token you're making the request with. This endpoint will **NOT** accept the Bearer token for your application generated via the [Client Crendentials Grant](https://discord.dev/topics/oauth2#client-credentials-grant). You will need the _user's_ bearer token, gotten via either the [Authorization Code OAuth2 Grant](https://discord.dev/topics/oauth2#authorization-code-grant) or via the SDK with [GetOAuth2Token](https://discord.dev/game-sdk/applications#getoauth2token). This endpoint has a rate limit of 2 requests per 5 seconds per application per user.
   * 
   * > info
   * > This endpoint will _not_ return any achievements marked as `secret` that the user has not yet completed.
   *
   * @param applicationId https://discord.dev/game-sdk/sdk-starter-guide#get-set-up
   */
  getUserAchievements(applicationId: Snowflake): Promise<GetUserAchievementsBody> {
    return this.request("GET", USER_ME_APPLICATION_ACHIEVEMENTS(applicationId), "GetUserAchievements");
  }

  /**
   * https://discord.dev/resources/user#get-user-connections
   *
   * Returns a list of [connection](https://discord.dev/resources/user#connection-object) objects. Requires the `connections` OAuth2 scope.
   * 
   */
  getUserConnections(): Promise<GetUserConnectionsBody> {
    return this.request("GET", USER_ME_CONNECTIONS, "GetUserConnections");
  }

  /**
   * https://discord.dev/resources/webhook#get-webhook
   *
   * Returns the new [webhook](https://discord.dev/resources/webhook#webhook-object) object for the given id.
   *
   * @param webhookId https://discord.dev/resources/webhook#webhook-object
   */
  getWebhook(webhookId: Snowflake): Promise<GetWebhookBody> {
    return this.request("GET", WEBHOOK(webhookId), `GetWebhook ${webhookId}`);
  }

  /**
   * https://discord.dev/resources/webhook#get-webhook-message
   *
   * Returns a previously-sent webhook message from the same token. Returns a [message](https://discord.dev/resources/channel#message-object) object on success.
   *
   * @param webhookId https://discord.dev/resources/webhook#webhook-object
   * @param webhookToken https://discord.dev/resources/webhook#webhook-object
   * @param messageId https://discord.dev/resources/channel#message-object
   */
  getWebhookMessage(webhookId: Snowflake, webhookToken: string, messageId: Snowflake, query: GetWebhookMessageQuery): Promise<GetWebhookMessageBody> {
    return this.request("GET", WEBHOOK_TOKEN_MESSAGE(webhookId, webhookToken, messageId), `GetWebhookMessage ${webhookId},${webhookToken}`, {
      query,
    });
  }

  /**
   * https://discord.dev/resources/webhook#get-webhook-with-token
   *
   * Same as above, except this call does not require authentication and returns no user in the webhook object.
   *
   * @param webhookId https://discord.dev/resources/webhook#webhook-object
   * @param webhookToken https://discord.dev/resources/webhook#webhook-object
   */
  getWebhookWithToken(webhookId: Snowflake, webhookToken: string): Promise<GetWebhookWithTokenBody> {
    return this.request("GET", WEBHOOK_TOKEN(webhookId, webhookToken), `GetWebhookWithToken ${webhookId},${webhookToken}`, {
      authorization: false,
    });
  }

  /**
   * https://discord.dev/resources/channel#group-dm-add-recipient
   *
   * Adds a recipient to a Group DM using their access token.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   * @param userId https://discord.dev/resources/user#user-object
   */
  groupDMAddRecipient(channelId: Snowflake, userId: Snowflake, data: GroupDMAddRecipientData): Promise<GroupDMAddRecipientBody> {
    return this.request("PUT", CHANNEL_RECIPIENT(channelId, userId), `GroupDMAddRecipient ${channelId}`, {
      data,
    });
  }

  /**
   * https://discord.dev/resources/channel#group-dm-remove-recipient
   *
   * Removes a recipient from a Group DM.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   * @param userId https://discord.dev/resources/user#user-object
   */
  groupDMRemoveRecipient(channelId: Snowflake, userId: Snowflake): Promise<GroupDMRemoveRecipientBody> {
    return this.request("DELETE", CHANNEL_RECIPIENT(channelId, userId), `GroupDMRemoveRecipient ${channelId}`);
  }

  /**
   * https://discord.dev/resources/channel#join-thread
   *
   * Adds the current user to a thread. Also requires the thread is not archived. Returns a 204 empty response on success. Fires a [Thread Members Update](https://discord.dev/topics/gateway#thread-members-update) Gateway event.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   */
  joinThread(channelId: Snowflake): Promise<JoinThreadBody> {
    return this.request("PUT", CHANNEL_THREAD_MEMBER_ME(channelId), `JoinThread ${channelId}`);
  }

  /**
   * https://discord.dev/resources/user#leave-guild
   *
   * Leave a guild. Returns a 204 empty response on success.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  leaveGuild(guildId: Snowflake): Promise<LeaveGuildBody> {
    return this.request("DELETE", USER_ME_GUILD(guildId), `LeaveGuild ${guildId}`);
  }

  /**
   * https://discord.dev/resources/channel#leave-thread
   *
   * Removes the current user from a thread. Also requires the thread is not archived. Returns a 204 empty response on success. Fires a [Thread Members Update](https://discord.dev/topics/gateway#thread-members-update) Gateway event.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   */
  leaveThread(channelId: Snowflake): Promise<LeaveThreadBody> {
    return this.request("DELETE", CHANNEL_THREAD_MEMBER_ME(channelId), `LeaveThread ${channelId}`);
  }

  /**
   * https://discord.dev/resources/guild#list-active-guild-threads
   *
   * Returns all active threads in the guild, including public and private threads. Threads are ordered by their `id`, in descending order.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  listActiveGuildThreads(guildId: Snowflake): Promise<ListActiveGuildThreadsBody> {
    return this.request("GET", GUILD_THREADS_ACTIVE(guildId), `ListActiveGuildThreads ${guildId}`);
  }

  /**
   * https://discord.dev/resources/emoji#list-guild-emojis
   *
   * Returns a list of [emoji](https://discord.dev/resources/emoji#emoji-object) objects for the given guild.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  listGuildEmojis(guildId: Snowflake): Promise<ListGuildEmojisBody> {
    return this.request("GET", GUILD_EMOJIS(guildId), `ListGuildEmojis ${guildId}`);
  }

  /**
   * https://discord.dev/resources/guild#list-guild-members
   *
   * Returns a list of [guild member](https://discord.dev/resources/guild#guild-member-object) objects that are members of the guild.
   * 
   * > warn
   * > This endpoint is restricted according to whether the `GUILD_MEMBERS` [Privileged Intent](https://discord.dev/topics/gateway#privileged-intents) is enabled for your application.
   * 
   * > info
   * > All parameters to this endpoint are optional
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  listGuildMembers(guildId: Snowflake, query: ListGuildMembersQuery): Promise<ListGuildMembersBody> {
    return this.request("GET", GUILD_MEMBERS(guildId), `ListGuildMembers ${guildId}`, {
      query,
    });
  }

  /**
   * https://discord.dev/resources/sticker#list-guild-stickers
   *
   * Returns an array of [sticker](https://discord.dev/resources/sticker#sticker-object) objects for the given guild. Includes `user` fields if the bot has the `MANAGE_EMOJIS_AND_STICKERS` permission.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  listGuildStickers(guildId: Snowflake): Promise<ListGuildStickersBody> {
    return this.request("GET", GUILD_STICKERS(guildId), `ListGuildStickers ${guildId}`);
  }

  /**
   * https://discord.dev/resources/channel#list-joined-private-archived-threads
   *
   * Returns archived threads in the channel that are of [type](https://discord.dev/resources/channel#channel-object-channel-types) `GUILD_PRIVATE_THREAD`, and the user has joined. Threads are ordered by their `id`, in descending order. Requires the `READ_MESSAGE_HISTORY` permission.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   */
  listJoinedPrivateArchivedThreads(channelId: Snowflake, query: ListJoinedPrivateArchivedThreadsQuery): Promise<ListJoinedPrivateArchivedThreadsBody> {
    return this.request("GET", CHANNEL_USER_ME_THREADS_ARCHIVED_PRIVATE(channelId), `ListJoinedPrivateArchivedThreads ${channelId}`, {
      query,
    });
  }

  /**
   * https://discord.dev/resources/sticker#list-nitro-sticker-packs
   *
   * Returns the list of sticker packs available to Nitro subscribers.
   */
  listNitroStickerPacks(): Promise<ListNitroStickerPacksBody> {
    return this.request("GET", STICKER_PACKS, "ListNitroStickerPacks");
  }

  /**
   * https://discord.dev/resources/channel#list-private-archived-threads
   *
   * Returns archived threads in the channel that are of [type](https://discord.dev/resources/channel#channel-object-channel-types) `GUILD_PRIVATE_THREAD`. Threads are ordered by `archive_timestamp`, in descending order. Requires both the `READ_MESSAGE_HISTORY` and `MANAGE_THREADS` permissions.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   */
  listPrivateArchivedThreads(channelId: Snowflake, query: ListPrivateArchivedThreadsQuery): Promise<ListPrivateArchivedThreadsBody> {
    return this.request("GET", CHANNEL_THREADS_ARCHIVED_PRIVATE(channelId), `ListPrivateArchivedThreads ${channelId}`, {
      query,
    });
  }

  /**
   * https://discord.dev/resources/channel#list-public-archived-threads
   *
   * Returns archived threads in the channel that are public. When called on a `GUILD_TEXT` channel, returns threads of [type](https://discord.dev/resources/channel#channel-object-channel-types) `GUILD_PUBLIC_THREAD`. When called on a `GUILD_NEWS` channel returns threads of [type](https://discord.dev/resources/channel#channel-object-channel-types) `GUILD_NEWS_THREAD`. Threads are ordered by `archive_timestamp`, in descending order. Requires the `READ_MESSAGE_HISTORY` permission.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   */
  listPublicArchivedThreads(channelId: Snowflake, query: ListPublicArchivedThreadsQuery): Promise<ListPublicArchivedThreadsBody> {
    return this.request("GET", CHANNEL_THREADS_ARCHIVED_PUBLIC(channelId), `ListPublicArchivedThreads ${channelId}`, {
      query,
    });
  }

  /**
   * https://discord.dev/resources/guild-scheduled-event#list-scheduled-events-for-guild
   *
   * Returns a list of [guild scheduled event](https://discord.dev/resources/guild-scheduled-event#guild-scheduled-event-object) objects for the given guild.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  listScheduledEventsForGuild(guildId: Snowflake, query: ListScheduledEventsForGuildQuery): Promise<ListScheduledEventsForGuildBody> {
    return this.request("GET", GUILD_SCHEDULED_EVENTS(guildId), `ListScheduledEventsForGuild ${guildId}`, {
      query,
    });
  }

  /**
   * https://discord.dev/resources/channel#list-thread-members
   *
   * Returns array of [thread members](https://discord.dev/resources/channel#thread-member-object) objects that are members of the thread.
   * 
   * > warn
   * > This endpoint is restricted according to whether the `GUILD_MEMBERS` [Privileged Intent](https://discord.dev/topics/gateway#privileged-intents) is enabled for your application.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   */
  listThreadMembers(channelId: Snowflake): Promise<ListThreadMembersBody> {
    return this.request("GET", CHANNEL_THREAD_MEMBERS(channelId), `ListThreadMembers ${channelId}`);
  }

  /**
   * https://discord.dev/resources/voice#list-voice-regions
   *
   * Returns an array of [voice region](https://discord.dev/resources/voice#voice-region-object) objects that can be used when setting a voice or stage channel's [`rtc_region`](https://discord.dev/resources/channel#channel-object-channel-structure).
   * 
   */
  listVoiceRegions(): Promise<ListVoiceRegionsBody> {
    return this.request("GET", VOICE_REGIONS, "ListVoiceRegions");
  }

  /**
   * https://discord.dev/resources/channel#modify-channel
   *
   * Update a channel's settings. Returns a [channel](https://discord.dev/resources/channel#channel-object) on success, and a 400 BAD REQUEST on invalid parameters. All JSON parameters are optional.
   * 
   * > info
   * > This endpoint supports the `X-Audit-Log-Reason` header.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   */
  modifyChannel(channelId: Snowflake, data: ModifyChannelData, reason?: string): Promise<ModifyChannelBody> {
    return this.request("PATCH", CHANNEL(channelId), `ModifyChannel ${channelId}`, {
      data,
      reason,
    });
  }

  /**
   * https://discord.dev/resources/guild#modify-current-member
   *
   * Modifies the current member in a guild. Returns a 200 with the updated member object on success. Fires a [Guild Member Update](https://discord.dev/topics/gateway#guild-member-update) Gateway event.
   * 
   * > info
   * > This endpoint supports the `X-Audit-Log-Reason` header.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  modifyCurrentMember(guildId: Snowflake, data: ModifyCurrentMemberData, reason?: string): Promise<ModifyCurrentMemberBody> {
    return this.request("PATCH", GUILD_MEMBER_ME(guildId), `ModifyCurrentMember ${guildId}`, {
      data,
      reason,
    });
  }

  /**
   * https://discord.dev/resources/user#modify-current-user
   *
   * Modify the requester's user account settings. Returns a [user](https://discord.dev/resources/user#user-object) object on success.
   * 
   * > info
   * > All parameters to this endpoint are optional.
   */
  modifyCurrentUser(data: ModifyCurrentUserData): Promise<ModifyCurrentUserBody> {
    return this.request("PATCH", USER_ME, "ModifyCurrentUser", {
      data,
    });
  }

  /**
   * https://discord.dev/resources/guild#modify-current-user-nick
   *
   * > danger
   * > Deprecated in favor of [Modify Current Member](https://discord.dev/resources/guild#modify-current-member).
   * 
   * Modifies the nickname of the current user in a guild. Returns a 200 with the nickname on success. Fires a [Guild Member Update](https://discord.dev/topics/gateway#guild-member-update) Gateway event.
   * 
   * > info
   * > This endpoint supports the `X-Audit-Log-Reason` header.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  modifyCurrentUserNick(guildId: Snowflake, data: ModifyCurrentUserNickData, reason?: string): Promise<ModifyCurrentUserNickBody> {
    return this.request("PATCH", GUILD_MEMBER_ME_NICK(guildId), `ModifyCurrentUserNick ${guildId}`, {
      data,
      reason,
    });
  }

  /**
   * https://discord.dev/resources/guild#modify-current-user-voice-state
   *
   * Updates the current user's voice state. Returns `204 No Content` on success.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  modifyCurrentUserVoiceState(guildId: Snowflake, data: ModifyCurrentUserVoiceStateData): Promise<ModifyCurrentUserVoiceStateBody> {
    return this.request("PATCH", GUILD_VOICE_STATE_ME(guildId), `ModifyCurrentUserVoiceState ${guildId}`, {
      data,
    });
  }

  /**
   * https://discord.dev/resources/guild#modify-guild
   *
   * Modify a guild's settings. Requires the `MANAGE_GUILD` permission. Returns the updated [guild](https://discord.dev/resources/guild#guild-object) object on success. Fires a [Guild Update](https://discord.dev/topics/gateway#guild-update) Gateway event.
   * 
   * > info
   * > All parameters to this endpoint are optional
   * 
   * > info
   * > This endpoint supports the `X-Audit-Log-Reason` header.
   * 
   * > warn
   * > Attempting to add or remove the `COMMUNITY` [guild feature](https://discord.dev/resources/guild#guild-object-guild-features) requires the `ADMINISTRATOR` permission.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  modifyGuild(guildId: Snowflake, data: ModifyGuildData, reason?: string): Promise<ModifyGuildBody> {
    return this.request("PATCH", GUILD(guildId), `ModifyGuild ${guildId}`, {
      data,
      reason,
    });
  }

  /**
   * https://discord.dev/resources/guild#modify-guild-channel-positions
   *
   * Modify the positions of a set of [channel](https://discord.dev/resources/channel#channel-object) objects for the guild. Requires `MANAGE_CHANNELS` permission. Returns a 204 empty response on success. Fires multiple [Channel Update](https://discord.dev/topics/gateway#channel-update) Gateway events.
   * 
   * > info
   * > Only channels to be modified are required.
   * 
   * > info
   * > This endpoint supports the `X-Audit-Log-Reason` header.
   * 
   * This endpoint takes a JSON array of parameters in the following format:
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  modifyGuildChannelPositions(guildId: Snowflake, data: ModifyGuildChannelPositionsData, reason?: string): Promise<ModifyGuildChannelPositionsBody> {
    return this.request("PATCH", GUILD_CHANNELS(guildId), `ModifyGuildChannelPositions ${guildId}`, {
      data,
      reason,
    });
  }

  /**
   * https://discord.dev/resources/emoji#modify-guild-emoji
   *
   * Modify the given emoji. Requires the `MANAGE_EMOJIS_AND_STICKERS` permission. Returns the updated [emoji](https://discord.dev/resources/emoji#emoji-object) object on success. Fires a [Guild Emojis Update](https://discord.dev/topics/gateway#guild-emojis-update) Gateway event.
   * 
   * > info
   * > All parameters to this endpoint are optional.
   * 
   * > info
   * > This endpoint supports the `X-Audit-Log-Reason` header.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   * @param emojiId https://discord.dev/resources/emoji#emoji-object
   */
  modifyGuildEmoji(guildId: Snowflake, emojiId: Snowflake, data: ModifyGuildEmojiData, reason?: string): Promise<ModifyGuildEmojiBody> {
    return this.request("PATCH", GUILD_EMOJI(guildId, emojiId), `ModifyGuildEmoji ${guildId}`, {
      data,
      reason,
    });
  }

  /**
   * https://discord.dev/resources/guild#modify-guild-member
   *
   * Modify attributes of a [guild member](https://discord.dev/resources/guild#guild-member-object). Returns a 200 OK with the [guild member](https://discord.dev/resources/guild#guild-member-object) as the body. Fires a [Guild Member Update](https://discord.dev/topics/gateway#guild-member-update) Gateway event. If the `channel_id` is set to null, this will force the target user to be disconnected from voice.
   * 
   * > info
   * > All parameters to this endpoint are optional and nullable. When moving members to channels, the API user _must_ have permissions to both connect to the channel and have the `MOVE_MEMBERS` permission.
   * 
   * > info
   * > This endpoint supports the `X-Audit-Log-Reason` header.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   * @param userId https://discord.dev/resources/user#user-object
   */
  modifyGuildMember(guildId: Snowflake, userId: Snowflake, data: ModifyGuildMemberData, reason?: string): Promise<ModifyGuildMemberBody> {
    return this.request("PATCH", GUILD_MEMBER(guildId, userId), `ModifyGuildMember ${guildId}`, {
      data,
      reason,
    });
  }

  /**
   * https://discord.dev/resources/guild#modify-guild-role
   *
   * Modify a guild role. Requires the `MANAGE_ROLES` permission. Returns the updated [role](https://discord.dev/topics/permissions#role-object) on success. Fires a [Guild Role Update](https://discord.dev/topics/gateway#guild-role-update) Gateway event.
   * 
   * > info
   * > All parameters to this endpoint are optional and nullable.
   * 
   * > info
   * > This endpoint supports the `X-Audit-Log-Reason` header.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   * @param roleId https://discord.dev/topics/permissions#role-object
   */
  modifyGuildRole(guildId: Snowflake, roleId: Snowflake, data: ModifyGuildRoleData, reason?: string): Promise<ModifyGuildRoleBody> {
    return this.request("PATCH", GUILD_ROLE(guildId, roleId), `ModifyGuildRole ${guildId}`, {
      data,
      reason,
    });
  }

  /**
   * https://discord.dev/resources/guild#modify-guild-role-positions
   *
   * Modify the positions of a set of [role](https://discord.dev/topics/permissions#role-object) objects for the guild. Requires the `MANAGE_ROLES` permission. Returns a list of all of the guild's [role](https://discord.dev/topics/permissions#role-object) objects on success. Fires multiple [Guild Role Update](https://discord.dev/topics/gateway#guild-role-update) Gateway events.
   * 
   * > info
   * > This endpoint supports the `X-Audit-Log-Reason` header.
   * 
   * This endpoint takes a JSON array of parameters in the following format:
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  modifyGuildRolePositions(guildId: Snowflake, data: ModifyGuildRolePositionsData, reason?: string): Promise<ModifyGuildRolePositionsBody> {
    return this.request("PATCH", GUILD_ROLES(guildId), `ModifyGuildRolePositions ${guildId}`, {
      data,
      reason,
    });
  }

  /**
   * https://discord.dev/resources/guild-scheduled-event#modify-guild-scheduled-event
   *
   * Modify a guild scheduled event. Returns the modified [guild scheduled event](https://discord.dev/resources/guild-scheduled-event#guild-scheduled-event-object) object on success.
   * 
   * > info
   * > To start or end an event, use this endpoint to modify the event's [status](https://discord.dev/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-status) field.
   * 
   * > info
   * > This endpoint supports the `X-Audit-Log-Reason` header.
   * 
   * > info
   * > This endpoint silently discards `entity_metadata` for non-`EXTERNAL` events.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   * @param guildScheduledEventId https://discord.dev/resources/guild-scheduled-event#guild-scheduled-event-object
   */
  modifyGuildScheduledEvent(guildId: Snowflake, guildScheduledEventId: Snowflake, data: ModifyGuildScheduledEventData, reason?: string): Promise<ModifyGuildScheduledEventBody> {
    return this.request("PATCH", GUILD_SCHEDULED_EVENT(guildId, guildScheduledEventId), `ModifyGuildScheduledEvent ${guildId}`, {
      data,
      reason,
    });
  }

  /**
   * https://discord.dev/resources/sticker#modify-guild-sticker
   *
   * Modify the given sticker. Requires the `MANAGE_EMOJIS_AND_STICKERS` permission. Returns the updated [sticker](https://discord.dev/resources/sticker#sticker-object) object on success.
   * 
   * > info
   * > All parameters to this endpoint are optional.
   * 
   * > info
   * > This endpoint supports the `X-Audit-Log-Reason` header.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   * @param stickerId https://discord.dev/resources/sticker#sticker-object
   */
  modifyGuildSticker(guildId: Snowflake, stickerId: Snowflake, data: ModifyGuildStickerData, reason?: string): Promise<ModifyGuildStickerBody> {
    return this.request("PATCH", GUILD_STICKER(guildId, stickerId), `ModifyGuildSticker ${guildId}`, {
      data,
      reason,
    });
  }

  /**
   * https://discord.dev/resources/guild-template#modify-guild-template
   *
   * Modifies the template's metadata. Requires the `MANAGE_GUILD` permission. Returns the [guild template](https://discord.dev/resources/guild-template#guild-template-object) object on success.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   * @param templateCode https://discord.dev/resources/guild-template#guild-template-object
   */
  modifyGuildTemplate(guildId: Snowflake, templateCode: string, data: ModifyGuildTemplateData): Promise<ModifyGuildTemplateBody> {
    return this.request("PATCH", GUILD_TEMPLATE(guildId, templateCode), `ModifyGuildTemplate ${guildId}`, {
      data,
    });
  }

  /**
   * https://discord.dev/resources/guild#modify-guild-welcome-screen
   *
   * Modify the guild's [Welcome Screen](https://discord.dev/resources/guild#welcome-screen-object). Requires the `MANAGE_GUILD` permission. Returns the updated [Welcome Screen](https://discord.dev/resources/guild#welcome-screen-object) object.
   * 
   * > info
   * > All parameters to this endpoint are optional and nullable
   * 
   * > info
   * > This endpoint supports the `X-Audit-Log-Reason` header.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  modifyGuildWelcomeScreen(guildId: Snowflake, data: ModifyGuildWelcomeScreenData, reason?: string): Promise<ModifyGuildWelcomeScreenBody> {
    return this.request("PATCH", GUILD_WELCOME_SCREEN(guildId), `ModifyGuildWelcomeScreen ${guildId}`, {
      data,
      reason,
    });
  }

  /**
   * https://discord.dev/resources/guild#modify-guild-widget
   *
   * Modify a [guild widget settings](https://discord.dev/resources/guild#guild-widget-settings-object) object for the guild. All attributes may be passed in with JSON and modified. Requires the `MANAGE_GUILD` permission. Returns the updated [guild widget](https://discord.dev/resources/guild#guild-widget-settings-object) object.
   * 
   * > info
   * > This endpoint supports the `X-Audit-Log-Reason` header.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  modifyGuildWidget(guildId: Snowflake, data: ModifyGuildWidgetData, reason?: string): Promise<ModifyGuildWidgetBody> {
    return this.request("PATCH", GUILD_WIDGET(guildId), `ModifyGuildWidget ${guildId}`, {
      data,
      reason,
    });
  }

  /**
   * https://discord.dev/resources/stage-instance#modify-stage-instance
   *
   * Updates fields of an existing Stage instance. Returns the updated [Stage instance](https://discord.dev/resources/stage/instance#stage-instance-object-stage-instance-structure).
   * 
   * Requires the user to be a moderator of the Stage channel.
   * 
   * > info
   * > This endpoint supports the `X-Audit-Log-Reason` header.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   */
  modifyStageInstance(channelId: Snowflake, data: ModifyStageInstanceData, reason?: string): Promise<ModifyStageInstanceBody> {
    return this.request("PATCH", STAGE_INSTANCE(channelId), `ModifyStageInstance ${channelId}`, {
      data,
      reason,
    });
  }

  /**
   * https://discord.dev/resources/guild#modify-user-voice-state
   *
   * Updates another user's voice state.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   * @param userId https://discord.dev/resources/user#user-object
   */
  modifyUserVoiceState(guildId: Snowflake, userId: Snowflake, data: ModifyUserVoiceStateData): Promise<ModifyUserVoiceStateBody> {
    return this.request("PATCH", GUILD_VOICE_STATE(guildId, userId), `ModifyUserVoiceState ${guildId}`, {
      data,
    });
  }

  /**
   * https://discord.dev/resources/webhook#modify-webhook
   *
   * Modify a webhook. Requires the `MANAGE_WEBHOOKS` permission. Returns the updated [webhook](https://discord.dev/resources/webhook#webhook-object) object on success.
   * 
   * > info
   * > All parameters to this endpoint are optional
   * 
   * > info
   * > This endpoint supports the `X-Audit-Log-Reason` header.
   *
   * @param webhookId https://discord.dev/resources/webhook#webhook-object
   */
  modifyWebhook(webhookId: Snowflake, data: ModifyWebhookData, reason?: string): Promise<ModifyWebhookBody> {
    return this.request("PATCH", WEBHOOK(webhookId), `ModifyWebhook ${webhookId}`, {
      data,
      reason,
    });
  }

  /**
   * https://discord.dev/resources/webhook#modify-webhook-with-token
   *
   * Same as above, except this call does not require authentication, does not accept a `channel_id` parameter in the body, and does not return a user in the webhook object.
   *
   * @param webhookId https://discord.dev/resources/webhook#webhook-object
   * @param webhookToken https://discord.dev/resources/webhook#webhook-object
   */
  modifyWebhookWithToken(webhookId: Snowflake, webhookToken: string, data: ModifyWebhookWithTokenData): Promise<ModifyWebhookWithTokenBody> {
    return this.request("PATCH", WEBHOOK_TOKEN(webhookId, webhookToken), `ModifyWebhookWithToken ${webhookId},${webhookToken}`, {
      authorization: false,
      data,
    });
  }

  /**
   * https://discord.dev/resources/channel#pin-message
   *
   * Pin a message in a channel. Requires the `MANAGE_MESSAGES` permission. Returns a 204 empty response on success.
   * 
   * > warn
   * > The max pinned messages is 50.
   * 
   * > info
   * > This endpoint supports the `X-Audit-Log-Reason` header.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   * @param messageId https://discord.dev/resources/channel#message-object
   */
  pinMessage(channelId: Snowflake, messageId: Snowflake, reason?: string): Promise<PinMessageBody> {
    return this.request("PUT", CHANNEL_PIN(channelId, messageId), `PinMessage ${channelId}`, {
      reason,
    });
  }

  /**
   * https://discord.dev/resources/guild#remove-guild-ban
   *
   * Remove the ban for a user. Requires the `BAN_MEMBERS` permissions. Returns a 204 empty response on success. Fires a [Guild Ban Remove](https://discord.dev/topics/gateway#guild-ban-remove) Gateway event.
   * 
   * > info
   * > This endpoint supports the `X-Audit-Log-Reason` header.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   * @param userId https://discord.dev/resources/user#user-object
   */
  removeGuildBan(guildId: Snowflake, userId: Snowflake, reason?: string): Promise<RemoveGuildBanBody> {
    return this.request("DELETE", GUILD_BAN(guildId, userId), `RemoveGuildBan ${guildId}`, {
      reason,
    });
  }

  /**
   * https://discord.dev/resources/guild#remove-guild-member
   *
   * Remove a member from a guild. Requires `KICK_MEMBERS` permission. Returns a 204 empty response on success. Fires a [Guild Member Remove](https://discord.dev/topics/gateway#guild-member-remove) Gateway event.
   * 
   * > info
   * > This endpoint supports the `X-Audit-Log-Reason` header.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   * @param userId https://discord.dev/resources/user#user-object
   */
  removeGuildMember(guildId: Snowflake, userId: Snowflake, reason?: string): Promise<RemoveGuildMemberBody> {
    return this.request("DELETE", GUILD_MEMBER(guildId, userId), `RemoveGuildMember ${guildId}`, {
      reason,
    });
  }

  /**
   * https://discord.dev/resources/guild#remove-guild-member-role
   *
   * Removes a role from a [guild member](https://discord.dev/resources/guild#guild-member-object). Requires the `MANAGE_ROLES` permission. Returns a 204 empty response on success. Fires a [Guild Member Update](https://discord.dev/topics/gateway#guild-member-update) Gateway event.
   * 
   * > info
   * > This endpoint supports the `X-Audit-Log-Reason` header.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   * @param userId https://discord.dev/resources/user#user-object
   * @param roleId https://discord.dev/topics/permissions#role-object
   */
  removeGuildMemberRole(guildId: Snowflake, userId: Snowflake, roleId: Snowflake, reason?: string): Promise<RemoveGuildMemberRoleBody> {
    return this.request("DELETE", GUILD_MEMBER_ROLE(guildId, userId, roleId), `RemoveGuildMemberRole ${guildId}`, {
      reason,
    });
  }

  /**
   * https://discord.dev/resources/channel#remove-thread-member
   *
   * Removes another member from a thread. Requires the `MANAGE_THREADS` permission, or the creator of the thread if it is a `GUILD_PRIVATE_THREAD`. Also requires the thread is not archived. Returns a 204 empty response on success. Fires a [Thread Members Update](https://discord.dev/topics/gateway#thread-members-update) Gateway event.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   * @param userId https://discord.dev/resources/user#user-object
   */
  removeThreadMember(channelId: Snowflake, userId: Snowflake): Promise<RemoveThreadMemberBody> {
    return this.request("DELETE", CHANNEL_THREAD_MEMBER(channelId, userId), `RemoveThreadMember ${channelId}`);
  }

  /**
   * https://discord.dev/resources/guild#search-guild-members
   *
   * Returns a list of [guild member](https://discord.dev/resources/guild#guild-member-object) objects whose username or nickname starts with a provided string.
   * 
   * > info
   * > All parameters to this endpoint except for `query` are optional
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  searchGuildMembers(guildId: Snowflake, query: SearchGuildMembersQuery): Promise<SearchGuildMembersBody> {
    return this.request("GET", GUILD_MEMBERS_SEARCH(guildId), `SearchGuildMembers ${guildId}`, {
      query,
    });
  }

  /**
   * https://discord.dev/game-sdk/lobbies#send-lobby-data
   *
   * Sends a message to the lobby, fanning it out to other lobby members.
   * 
   * This endpoints accepts a UTF8 string. If your message is already a string, you're good to go! If you want to send binary, you can send it to this endpoint as a base64 encoded data uri.
   *
   * @param lobbyId https://discord.dev/game-sdk/lobbies#data-models-lobby-struct
   */
  sendLobbyData(lobbyId: Snowflake, data: SendLobbyDataData): Promise<SendLobbyDataBody> {
    return this.request("POST", LOBBY_SEND(lobbyId), "SendLobbyData", {
      data,
    });
  }

  /**
   * https://discord.dev/resources/channel#start-thread-from-message
   *
   * Creates a new thread from an existing message. Returns a [channel](https://discord.dev/resources/channel#channel-object) on success, and a 400 BAD REQUEST on invalid parameters. Fires a [Thread Create](https://discord.dev/topics/gateway#thread-create) Gateway event.
   * 
   * When called on a `GUILD_TEXT` channel, creates a `GUILD_PUBLIC_THREAD`. When called on a `GUILD_NEWS` channel, creates a `GUILD_NEWS_THREAD`. Does not work on a [`GUILD_FORUM`](https://discord.dev/resources/channel#start-thread-in-forum-channel) channel. The id of the created thread will be the same as the id of the source message, and as such a message can only have a single thread created from it.
   * 
   * > info
   * > This endpoint supports the `X-Audit-Log-Reason` header.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   * @param messageId https://discord.dev/resources/channel#message-object
   */
  startThreadFromMessage(channelId: Snowflake, messageId: Snowflake, data: StartThreadFromMessageData, reason?: string): Promise<StartThreadFromMessageBody> {
    return this.request("POST", CHANNEL_MESSAGE_THREADS(channelId, messageId), `StartThreadFromMessage ${channelId}`, {
      data,
      reason,
    });
  }

  /**
   * https://discord.dev/resources/channel#start-thread-in-forum-channel
   *
   * Creates a new thread in a forum channel, and sends a message within the created thread. Returns a [channel](https://discord.dev/resources/channel#channel-object), with a nested [message](https://discord.dev/resources/channel#message-object) object, on success, and a 400 BAD REQUEST on invalid parameters. Fires a [Thread Create](https://discord.dev/topics/gateway#thread-create) and [Message Create](https://discord.dev/topics/gateway#message-create) Gateway event.
   * 
   * - The type of the created thread is `GUILD_PUBLIC_THREAD`.
   * - See [message formatting](https://discord.dev/reference#message-formatting) for more information on how to properly format messages.
   * - The current user must have the `SEND_MESSAGES` permission (`CREATE_PUBLIC_THREADS` is ignored).
   * - The maximum request size when sending a message is **8MiB**.
   * - For the embed object, you can set every field except `type` (it will be `rich` regardless of if you try to set it), `provider`, `video`, and any `height`, `width`, or `proxy_url` values for images.
   * - Examples for file uploads are available in [Uploading Files](https://discord.dev/reference#uploading-files).
   * - Files must be attached using a `multipart/form-data` body as described in [Uploading Files](https://discord.dev/reference#uploading-files).
   * - Note that when sending a message, you must provide a value for at **least one of** `content`, `embeds`, or `files[n]`.
   * 
   * > warn
   * > Discord may strip certain characters from message content, like invalid unicode characters or characters which cause unexpected message formatting. If you are passing user-generated strings into message content, consider sanitizing the data to prevent unexpected behavior and utilizing `allowed_mentions` to prevent unexpected mentions.
   * 
   * > info
   * > This endpoint supports the `X-Audit-Log-Reason` header.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   */
  startThreadInForumChannel(channelId: Snowflake, data: StartThreadInForumChannelData, reason?: string): Promise<StartThreadInForumChannelBody> {
    return this.request("POST", CHANNEL_THREADS(channelId), `StartThreadInForumChannel ${channelId}`, {
      data,
      reason,
    });
  }

  /**
   * https://discord.dev/resources/channel#start-thread-without-message
   *
   * Creates a new thread that is not connected to an existing message. Returns a [channel](https://discord.dev/resources/channel#channel-object) on success, and a 400 BAD REQUEST on invalid parameters. Fires a [Thread Create](https://discord.dev/topics/gateway#thread-create) Gateway event.
   * 
   * > info
   * > This endpoint supports the `X-Audit-Log-Reason` header.
   * 
   * > info
   * > Creating a private thread requires the server to be boosted. The [guild features](https://discord.dev/resources/guild#guild-object-guild-features) will indicate if that is possible for the guild.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   */
  startThreadWithoutMessage(channelId: Snowflake, data: StartThreadWithoutMessageData, reason?: string): Promise<StartThreadWithoutMessageBody> {
    return this.request("POST", CHANNEL_THREADS(channelId), `StartThreadWithoutMessage ${channelId}`, {
      data,
      reason,
    });
  }

  /**
   * https://discord.dev/resources/guild-template#sync-guild-template
   *
   * Syncs the template to the guild's current state. Requires the `MANAGE_GUILD` permission. Returns the [guild template](https://discord.dev/resources/guild-template#guild-template-object) object on success.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   * @param templateCode https://discord.dev/resources/guild-template#guild-template-object
   */
  syncGuildTemplate(guildId: Snowflake, templateCode: string): Promise<SyncGuildTemplateBody> {
    return this.request("PUT", GUILD_TEMPLATE(guildId, templateCode), `SyncGuildTemplate ${guildId}`);
  }

  /**
   * https://discord.dev/resources/channel#trigger-typing-indicator
   *
   * Post a typing indicator for the specified channel. Generally bots should **not** implement this route. However, if a bot is responding to a command and expects the computation to take a few seconds, this endpoint may be called to let the user know that the bot is processing their message. Returns a 204 empty response on success. Fires a [Typing Start](https://discord.dev/topics/gateway#typing-start) Gateway event.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   */
  triggerTypingIndicator(channelId: Snowflake): Promise<TriggerTypingIndicatorBody> {
    return this.request("POST", CHANNEL_TYPING(channelId), `TriggerTypingIndicator ${channelId}`);
  }

  /**
   * https://discord.dev/resources/channel#unpin-message
   *
   * Unpin a message in a channel. Requires the `MANAGE_MESSAGES` permission. Returns a 204 empty response on success.
   * 
   * > info
   * > This endpoint supports the `X-Audit-Log-Reason` header.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   * @param messageId https://discord.dev/resources/channel#message-object
   */
  unpinMessage(channelId: Snowflake, messageId: Snowflake, reason?: string): Promise<UnpinMessageBody> {
    return this.request("DELETE", CHANNEL_PIN(channelId, messageId), `UnpinMessage ${channelId}`, {
      reason,
    });
  }

  /**
   * https://discord.dev/game-sdk/achievements#update-achievement
   *
   * Updates the achievement for **\_\_ALL USERS\_\_**. This is **NOT** to update a single user's achievement progress; this is to edit the UserAchievement itself. This endpoint has a rate limit of 5 requests per 5 seconds per application.
   *
   * @param applicationId https://discord.dev/game-sdk/sdk-starter-guide#get-set-up
   * @param achievementId https://discord.dev/game-sdk/achievements#data-models-achievement-struct
   */
  updateAchievement(applicationId: Snowflake, achievementId: Snowflake, data: UpdateAchievementData): Promise<UpdateAchievementBody> {
    return this.request("PATCH", APPLICATION_ACHIEVEMENT(applicationId, achievementId), "UpdateAchievement", {
      data,
    });
  }

  /**
   * https://discord.dev/game-sdk/lobbies#update-lobby
   *
   * Updates a lobby.
   *
   * @param lobbyId https://discord.dev/lobbies#data-models-lobby-struct
   */
  updateLobby(lobbyId: Snowflake, data: UpdateLobbyData): Promise<UpdateLobbyBody> {
    return this.request("PATCH", LOBBY(lobbyId), "UpdateLobby", {
      data,
    });
  }

  /**
   * https://discord.dev/game-sdk/lobbies#update-lobby-member
   *
   * Updates the metadata for a lobby member.
   *
   * @param lobbyId https://discord.dev/game-sdk/lobbies#data-models-lobby-struct
   * @param userId https://discord.dev/resources/user#user-object
   */
  updateLobbyMember(lobbyId: Snowflake, userId: Snowflake, data: UpdateLobbyMemberData): Promise<UpdateLobbyMemberBody> {
    return this.request("PATCH", LOBBY_MEMBER(lobbyId, userId), "UpdateLobbyMember", {
      data,
    });
  }

  /**
   * https://discord.dev/game-sdk/achievements#update-user-achievement
   *
   * Updates the UserAchievement record for a given user. Use this endpoint to update `secure` achievement progress for users. This endpoint has a rate limit of 5 requests per 5 seconds per application.
   *
   * @param applicationId https://discord.dev/game-sdk/sdk-starter-guide#get-set-up
   * @param achievementId https://discord.dev/game-sdk/achievements#data-models-achievement-struct
   */
  updateUserAchievement(applicationId: Snowflake, achievementId: Snowflake, data: UpdateUserAchievementData): Promise<UpdateUserAchievementBody> {
    return this.request("PUT", APPLICATION_ACHIEVEMENT(applicationId, achievementId), "UpdateUserAchievement", {
      data,
    });
  }
  //#endregion endpoints
}
