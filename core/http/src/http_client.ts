//#region
import type {
  AddGuildMemberBody,
  AddGuildMemberData,
  AddGuildMemberRoleBody,
  AddThreadMemberBody,
  BatchEditApplicationCommandPermissionsBody,
  BatchEditApplicationCommandPermissionsData,
  BeginGuildPruneBody,
  BeginGuildPruneData,
  BulkDeleteMessagesBody,
  BulkDeleteMessagesData,
  BulkOverwriteGlobalApplicationCommandsBody,
  BulkOverwriteGlobalApplicationCommandsData,
  BulkOverwriteGuildApplicationCommandsBody,
  BulkOverwriteGuildApplicationCommandsData,
  ConsumeSKUBody,
  CreateChannelInviteBody,
  CreateChannelInviteData,
  CreateDMBody,
  CreateDMData,
  CreateFollowupMessageBody,
  CreateFollowupMessageData,
  CreateGlobalApplicationCommandBody,
  CreateGlobalApplicationCommandData,
  CreateGroupDMBody,
  CreateGroupDMData,
  CreateGuildApplicationCommandBody,
  CreateGuildApplicationCommandData,
  CreateGuildBanBody,
  CreateGuildBanData,
  CreateGuildBody,
  CreateGuildChannelBody,
  CreateGuildChannelData,
  CreateGuildData,
  CreateGuildEmojiBody,
  CreateGuildEmojiData,
  CreateGuildFromGuildTemplateBody,
  CreateGuildFromGuildTemplateData,
  CreateGuildRoleBody,
  CreateGuildRoleData,
  CreateGuildScheduledEventBody,
  CreateGuildScheduledEventData,
  CreateGuildStickerBody,
  CreateGuildTemplateBody,
  CreateGuildTemplateData,
  CreateInteractionResponseBody,
  CreateInteractionResponseData,
  CreateMessageBody,
  CreateMessageData,
  CreatePurchaseDiscountBody,
  CreatePurchaseDiscountData,
  CreateReactionBody,
  CreateStageInstanceBody,
  CreateStageInstanceData,
  CreateWebhookBody,
  CreateWebhookData,
  CrosspostMessageBody,
  DeleteAllReactionsBody,
  DeleteAllReactionsForEmojiBody,
  DeleteChannelBody,
  DeleteChannelPermissionBody,
  DeleteFollowupMessageBody,
  DeleteGlobalApplicationCommandBody,
  DeleteGuildApplicationCommandBody,
  DeleteGuildBody,
  DeleteGuildEmojiBody,
  DeleteGuildIntegrationBody,
  DeleteGuildRoleBody,
  DeleteGuildScheduledEventBody,
  DeleteGuildStickerBody,
  DeleteGuildTemplateBody,
  DeleteInviteBody,
  DeleteMessageBody,
  DeleteOriginalInteractionResponseBody,
  DeleteOwnReactionBody,
  DeletePurchaseDiscountBody,
  DeleteStageInstanceBody,
  DeleteTestEntitlementBody,
  DeleteUserReactionBody,
  DeleteWebhookBody,
  DeleteWebhookMessageBody,
  DeleteWebhookMessageQuery,
  DeleteWebhookWithTokenBody,
  EditApplicationCommandPermissionsBody,
  EditApplicationCommandPermissionsData,
  EditChannelPermissionsBody,
  EditChannelPermissionsData,
  EditFollowupMessageBody,
  EditFollowupMessageData,
  EditGlobalApplicationCommandBody,
  EditGlobalApplicationCommandData,
  EditGuildApplicationCommandBody,
  EditGuildApplicationCommandData,
  EditMessageBody,
  EditMessageData,
  EditOriginalInteractionResponseBody,
  EditOriginalInteractionResponseData,
  EditWebhookMessageBody,
  EditWebhookMessageData,
  EditWebhookMessageQuery,
  ExecuteGitHubCompatibleWebhookBody,
  ExecuteGitHubCompatibleWebhookQuery,
  ExecuteSlackCompatibleWebhookBody,
  ExecuteSlackCompatibleWebhookQuery,
  ExecuteWebhookBody,
  ExecuteWebhookData,
  ExecuteWebhookQuery,
  FollowNewsChannelBody,
  FollowNewsChannelData,
  GetApplicationCommandPermissionsBody,
  GetChannelBody,
  GetChannelInvitesBody,
  GetChannelMessageBody,
  GetChannelMessagesBody,
  GetChannelMessagesQuery,
  GetChannelWebhooksBody,
  GetCurrentAuthorizationInformationBody,
  GetCurrentBotApplicationInformationBody,
  GetCurrentUserBody,
  GetCurrentUserGuildsBody,
  GetCurrentUserGuildsQuery,
  GetEntitlementBody,
  GetEntitlementQuery,
  GetEntitlementsBody,
  GetEntitlementsQuery,
  GetFollowupMessageBody,
  GetGatewayBody,
  GetGatewayBotBody,
  GetGlobalApplicationCommandBody,
  GetGlobalApplicationCommandsBody,
  GetGuildApplicationCommandBody,
  GetGuildApplicationCommandPermissionsBody,
  GetGuildApplicationCommandsBody,
  GetGuildAuditLogBody,
  GetGuildAuditLogQuery,
  GetGuildBanBody,
  GetGuildBansBody,
  GetGuildBody,
  GetGuildChannelsBody,
  GetGuildEmojiBody,
  GetGuildIntegrationsBody,
  GetGuildInvitesBody,
  GetGuildMemberBody,
  GetGuildPreviewBody,
  GetGuildPruneCountBody,
  GetGuildPruneCountQuery,
  GetGuildQuery,
  GetGuildRolesBody,
  GetGuildScheduledEventBody,
  GetGuildScheduledEventQuery,
  GetGuildScheduledEventUsersBody,
  GetGuildScheduledEventUsersData,
  GetGuildStickerBody,
  GetGuildTemplateBody,
  GetGuildTemplatesBody,
  GetGuildVanityURLBody,
  GetGuildVoiceRegionsBody,
  GetGuildWebhooksBody,
  GetGuildWelcomeScreenBody,
  GetGuildWidgetBody,
  GetGuildWidgetImageBody,
  GetGuildWidgetImageQuery,
  GetGuildWidgetSettingsBody,
  GetInviteBody,
  GetInviteQuery,
  GetOriginalInteractionResponseBody,
  GetPinnedMessagesBody,
  GetReactionsBody,
  GetReactionsQuery,
  GetSKUsBody,
  GetStageInstanceBody,
  GetStickerBody,
  GetThreadMemberBody,
  GetUserBody,
  GetUserConnectionsBody,
  GetWebhookBody,
  GetWebhookMessageBody,
  GetWebhookMessageQuery,
  GetWebhookWithTokenBody,
  GroupDMAddRecipientBody,
  GroupDMAddRecipientData,
  GroupDMRemoveRecipientBody,
  JoinThreadBody,
  LeaveGuildBody,
  LeaveThreadBody,
  ListActiveThreadsBody,
  ListGuildEmojisBody,
  ListGuildMembersBody,
  ListGuildMembersQuery,
  ListGuildStickersBody,
  ListJoinedPrivateArchivedThreadsBody,
  ListJoinedPrivateArchivedThreadsQuery,
  ListNitroStickerPacksBody,
  ListPrivateArchivedThreadsBody,
  ListPrivateArchivedThreadsQuery,
  ListPublicArchivedThreadsBody,
  ListPublicArchivedThreadsQuery,
  ListScheduledEventsForGuildBody,
  ListScheduledEventsForGuildQuery,
  ListThreadMembersBody,
  ListVoiceRegionsBody,
  ModifyChannelBody,
  ModifyChannelData,
  ModifyCurrentMemberBody,
  ModifyCurrentMemberData,
  ModifyCurrentUserBody,
  ModifyCurrentUserData,
  ModifyCurrentUserNickBody,
  ModifyCurrentUserNickData,
  ModifyCurrentUserVoiceStateBody,
  ModifyCurrentUserVoiceStateData,
  ModifyGuildBody,
  ModifyGuildChannelPositionsBody,
  ModifyGuildChannelPositionsData,
  ModifyGuildData,
  ModifyGuildEmojiBody,
  ModifyGuildEmojiData,
  ModifyGuildMemberBody,
  ModifyGuildMemberData,
  ModifyGuildRoleBody,
  ModifyGuildRoleData,
  ModifyGuildRolePositionsBody,
  ModifyGuildRolePositionsData,
  ModifyGuildScheduledEventBody,
  ModifyGuildScheduledEventData,
  ModifyGuildStickerBody,
  ModifyGuildStickerData,
  ModifyGuildTemplateBody,
  ModifyGuildTemplateData,
  ModifyGuildWelcomeScreenBody,
  ModifyGuildWelcomeScreenData,
  ModifyGuildWidgetBody,
  ModifyGuildWidgetData,
  ModifyStageInstanceBody,
  ModifyStageInstanceData,
  ModifyUserVoiceStateBody,
  ModifyUserVoiceStateData,
  ModifyWebhookBody,
  ModifyWebhookData,
  ModifyWebhookWithTokenBody,
  ModifyWebhookWithTokenData,
  PinMessageBody,
  RemoveGuildBanBody,
  RemoveGuildMemberBody,
  RemoveGuildMemberRoleBody,
  RemoveThreadMemberBody,
  SearchGuildMembersBody,
  SearchGuildMembersQuery,
  StartThreadWithMessageBody,
  StartThreadWithMessageData,
  StartThreadWithoutMessageBody,
  StartThreadWithoutMessageData,
  SyncGuildTemplateBody,
  TriggerTypingIndicatorBody,
  UnpinMessageBody,
} from "../../types/mod.ts";
//#endregion
import { BaseUrl, Snowflake } from "../../types/src/reference.ts";
import type { ApiVersions } from "../../types/src/reference.ts";
import { HttpResponseCodes } from "../../types/src/topics/opcodes_and_status_codes.ts";
import {
  X_RATELIMIT_BUCKET,
  X_RATELIMIT_GLOBAL,
  X_RATELIMIT_LIMIT,
  X_RATELIMIT_REMAINING,
  X_RATELIMIT_RESET_AFTER,
} from "../../types/src/topics/rate_limits.ts";
import * as logger from "../../util/src/logger.ts";
import { RateLimit } from "../../util/src/rate_limit.ts";
import { sleep } from "../../util/src/sleep.ts";
import {
  HTTP_VERSION,
  MAX_RETRIES,
  REQUEST_DELAY,
  USER_AGENT,
} from "./constants.ts";
import { HttpError } from "./http_error.ts";
//#region
import {
  APPLICATION_COMMAND,
  APPLICATION_COMMANDS,
  APPLICATION_ENTITLEMENT,
  APPLICATION_ENTITLEMENT_CONSUME,
  APPLICATION_ENTITLEMENTS,
  APPLICATION_GUILD_COMMAND,
  APPLICATION_GUILD_COMMAND_PERMISSIONS,
  APPLICATION_GUILD_COMMANDS,
  APPLICATION_GUILD_COMMANDS_PERMISSIONS,
  APPLICATION_SKUS,
  CHANNEL,
  CHANNEL_FOLLOWERS,
  CHANNEL_INVITES,
  CHANNEL_MESSAGE,
  CHANNEL_MESSAGE_CROSSPOST,
  CHANNEL_MESSAGE_REACTION,
  CHANNEL_MESSAGE_REACTION_ME,
  CHANNEL_MESSAGE_REACTION_USER,
  CHANNEL_MESSAGE_REACTIONS,
  CHANNEL_MESSAGE_THREADS,
  CHANNEL_MESSAGES,
  CHANNEL_MESSAGES_BULK_DELETE,
  CHANNEL_PERMISSION,
  CHANNEL_PIN,
  CHANNEL_PINS,
  CHANNEL_RECIPIENT,
  CHANNEL_THREAD_MEMBER,
  CHANNEL_THREAD_MEMBER_ME,
  CHANNEL_THREAD_MEMBERS,
  CHANNEL_THREADS,
  CHANNEL_THREADS_ARCHIVED_PRIVATE,
  CHANNEL_THREADS_ARCHIVED_PUBLIC,
  CHANNEL_TYPING,
  CHANNEL_USER_ME_THREADS_ARCHIVED_PRIVATE,
  CHANNEL_WEBHOOKS,
  GATEWAY,
  GATEWAY_BOT,
  GUILD,
  GUILD_AUDIT_LOGS,
  GUILD_BAN,
  GUILD_BANS,
  GUILD_CHANNELS,
  GUILD_EMOJI,
  GUILD_EMOJIS,
  GUILD_INTEGRATION,
  GUILD_INTEGRATIONS,
  GUILD_INVITES,
  GUILD_MEMBER,
  GUILD_MEMBER_ME,
  GUILD_MEMBER_ME_NICK,
  GUILD_MEMBER_ROLE,
  GUILD_MEMBERS,
  GUILD_MEMBERS_SEARCH,
  GUILD_PREVIEW,
  GUILD_PRUNE,
  GUILD_REGIONS,
  GUILD_ROLE,
  GUILD_ROLES,
  GUILD_SCHEDULED_EVENT,
  GUILD_SCHEDULED_EVENT_USERS,
  GUILD_SCHEDULED_EVENTS,
  GUILD_STICKER,
  GUILD_STICKERS,
  GUILD_TEMPLATE,
  GUILD_TEMPLATES,
  GUILD_THREADS_ACTIVE,
  GUILD_VANITY_URL,
  GUILD_VOICE_STATE,
  GUILD_VOICE_STATE_ME,
  GUILD_WEBHOOKS,
  GUILD_WELCOME_SCREEN,
  GUILD_WIDGET,
  GUILD_WIDGET_JSON,
  GUILD_WIDGET_PNG,
  GUILDS,
  GUILDS_TEMPLATE,
  INTERACTION_TOKEN_CALLBACK,
  INVITE,
  OAUTH2_APPLICATION_ME,
  OAUTH2_ME,
  STAGE_INSTANCE,
  STAGE_INSTANCES,
  STICKER,
  STICKER_PACKS,
  STORE_SKU_DISCOUNT,
  USER,
  USER_ME,
  USER_ME_CHANNELS,
  USER_ME_CONNECTIONS,
  USER_ME_GUILD,
  USER_ME_GUILDS,
  VOICE_REGIONS,
  WEBHOOK,
  WEBHOOK_TOKEN,
  WEBHOOK_TOKEN_GITHUB,
  WEBHOOK_TOKEN_MESSAGE,
  WEBHOOK_TOKEN_MESSAGE_ORIGINAL,
  WEBHOOK_TOKEN_SLACK,
} from "./routes.ts";
//#endregion

export interface HttpClientOptions {
  delay?: number;
  maxRetries?: number;
  userAgent?: string;
  version?: ApiVersions;
}

export interface RequestOptions {
  data?: unknown;
  files?: File[];
  // https://github.com/microsoft/TypeScript/issues/15300
  query?: unknown;
  reason?: string;
}

export const encodeQuery = (query?: Record<string, string>) => {
  let str = "?";
  for (const key in query) {
    str += `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}&`;
  }
  return str.slice(0, -1);
};

export class HttpClient {
  buckets: Record<string, string | undefined> = Object.create(null);
  rateLimits: Record<string, RateLimit | undefined> = Object.create(null);

  #token;

  // imagine if constructor(#token: string) was possible
  constructor(token: string, public options?: HttpClientOptions) {
    this.#token = token;
  }

  async request(
    method: string,
    path: string,
    bucketKey: string,
    options?: RequestOptions,
  ) {
    const headers: Record<string, string> = {
      "Authorization": this.#token,
      "User-Agent": this.options?.userAgent ?? USER_AGENT,
    };
    if (options?.reason) {
      headers["X-Audit-Log-Reason"] = options.reason;
    }

    let data;
    if (options?.files) {
      data = new FormData();
      for (const file of options.files) {
        data.append(file.name, file, file.name);
      }
      if (options.data) {
        data.append("payload_json", JSON.stringify(options.data));
      }
    } else if (options?.data) {
      data = JSON.stringify(options.data);
      headers["Content-Type"] = "application/json";
    }

    let url = `${BaseUrl}/v${this.options?.version ?? HTTP_VERSION}${path}`;
    if (options?.query) {
      url += encodeQuery(options.query as Record<string, string>);
    }

    const index = bucketKey.indexOf("_");
    const parameters = index > -1 ? bucketKey.substring(index) : "";
    const bucket = this.buckets[bucketKey];

    let rateLimit = bucket ? this.rateLimits[bucket + parameters] : void 0;

    if (rateLimit?.rateLimited) {
      await rateLimit.sleep();
    }

    let response!: Response;

    const delay = this.options?.delay ?? REQUEST_DELAY;
    const maxRetries = this.options?.maxRetries ?? MAX_RETRIES;

    for (let retries = 0; retries <= maxRetries; retries++) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), delay);

      response = await fetch(url, {
        body: data,
        headers,
        method,
        signal: controller.signal,
      });

      clearTimeout(timeout);

      const resetAfter =
        parseFloat(response.headers.get(X_RATELIMIT_RESET_AFTER)!) * 1_000;

      // TODO: Sleep on new requests (global rate limit pepega)
      if (response.headers.get(X_RATELIMIT_GLOBAL)) {
        logger.warn(
          `Global rate limited - ${retries}/${maxRetries} retrying in`,
          `${resetAfter} ms`,
        );
        await sleep(resetAfter);
        continue;
      }

      const bucketNew = response.headers.get(X_RATELIMIT_BUCKET);
      if (!bucketNew) {
        break;
      }
      if (bucket !== void 0 && bucket !== bucketNew) {
        logger.debug(
          `"${bucketKey}" Encountered a new bucket - old: "${bucket}" new:`,
          `"${bucketNew}"`,
        );
      }

      this.buckets[bucketKey] = bucketNew;
      rateLimit = this.rateLimits[bucketNew + parameters] ??= new RateLimit();
      rateLimit.update(
        parseInt(response.headers.get(X_RATELIMIT_LIMIT)!),
        parseFloat(response.headers.get(X_RATELIMIT_RESET_AFTER)!) * 1_000,
        parseInt(response.headers.get(X_RATELIMIT_REMAINING)!),
      );

      if (response.status === HttpResponseCodes.TooManyRequests) {
        logger.warn(
          `"${bucketKey}" rate limited - ${retries}/${maxRetries} retrying in`,
          `${rateLimit.reset} ms`,
        );
        await rateLimit.sleep();
        continue;
      }

      rateLimit.next();

      break;
    }

    const body = response.headers.get("Content-Type") === "application/json"
      ? response.json()
      : response.text();

    if (response.ok) {
      return body;
    }

    throw new HttpError(response, await body);
  }

  delete(path: string, bucketKey: string, options?: RequestOptions) {
    return this.request("DELETE", path, bucketKey, options);
  }

  get(path: string, bucketKey: string, options?: RequestOptions) {
    return this.request("GET", path, bucketKey, options);
  }

  patch(path: string, bucketKey: string, options?: RequestOptions) {
    return this.request("PATCH", path, bucketKey, options);
  }

  post(path: string, bucketKey: string, options?: RequestOptions) {
    return this.request("POST", path, bucketKey, options);
  }

  put(path: string, bucketKey: string, options?: RequestOptions) {
    return this.request("PUT", path, bucketKey, options);
  }

  //#region methods
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
  addGuildMember(
    guildId: Snowflake,
    userId: Snowflake,
    data: AddGuildMemberData,
  ): Promise<AddGuildMemberBody> {
    return this.put(
      GUILD_MEMBER(guildId, userId),
      `addGuildMember_${guildId}`,
      {
        data,
      },
    );
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
  addGuildMemberRole(
    guildId: Snowflake,
    userId: Snowflake,
    roleId: Snowflake,
  ): Promise<AddGuildMemberRoleBody> {
    return this.put(
      GUILD_MEMBER_ROLE(guildId, userId, roleId),
      `addGuildMemberRole_${guildId}`,
    );
  }

  /**
   * https://discord.dev/resources/channel#add-thread-member
   *
   * Adds another member to a thread. Requires the ability to send messages in the thread. Also requires the thread is not archived. Returns a 204 empty response if the member is successfully added or was already a member of the thread. Fires a [Thread Members Update](https://discord.dev/topics/gateway#thread-members-update) Gateway event.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   * @param userId https://discord.dev/resources/user#user-object
   */
  addThreadMember(
    channelId: Snowflake,
    userId: Snowflake,
  ): Promise<AddThreadMemberBody> {
    return this.put(
      CHANNEL_THREAD_MEMBER(channelId, userId),
      `addThreadMember_${channelId}`,
    );
  }

  /**
   * https://discord.dev/interactions/application-commands#batch-edit-application-command-permissions
   *
   * > warn
   * > This endpoint will overwrite all existing permissions for all commands in a guild, including slash commands, user commands, and message commands.
   *
   * Batch edits permissions for all commands in a guild. Takes an array of partial [guild application command permissions](https://discord.dev/interactions/application-commands#application-command-permissions-object-guild-application-command-permissions-structure) objects including `id` and `permissions`.
   *
   * You can only add up to 10 permission overwrites for a command.
   *
   * Returns an array of [GuildApplicationCommandPermissions](https://discord.dev/interactions/application-commands#application-command-permissions-object-guild-application-command-permissions-structure) objects.
   *
   * @param applicationId https://discord.dev/resources/application#application-object
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  batchEditApplicationCommandPermissions(
    applicationId: Snowflake,
    guildId: Snowflake,
    data: BatchEditApplicationCommandPermissionsData,
  ): Promise<BatchEditApplicationCommandPermissionsBody> {
    return this.put(
      APPLICATION_GUILD_COMMANDS_PERMISSIONS(applicationId, guildId),
      `batchEditApplicationCommandPermissions_${guildId}`,
      {
        data,
      },
    );
  }

  /**
   * https://discord.dev/resources/guild#begin-guild-prune
   *
   * Begin a prune operation. Requires the `KICK_MEMBERS` permission. Returns an object with one 'pruned' key indicating the number of members that were removed in the prune operation. For large guilds it's recommended to set the `compute_prune_count` option to `false`, forcing 'pruned' to `null`. Fires multiple [Guild Member Remove](https://discord.dev/topics/gateway#guild-member-remove) Gateway events.
   *
   * By default, prune will not remove users with roles. You can optionally include specific roles in your prune by providing the `include_roles` parameter. Any inactive user that has a subset of the provided role(s) will be included in the prune and users with additional roles will not.
   *
   * > info
   * > This endpoint supports the `X-Audit-Log-Reason` header.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  beginGuildPrune(
    guildId: Snowflake,
    data: BeginGuildPruneData,
  ): Promise<BeginGuildPruneBody> {
    return this.post(GUILD_PRUNE(guildId), `beginGuildPrune_${guildId}`, {
      data,
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
  bulkDeleteMessages(
    channelId: Snowflake,
    data: BulkDeleteMessagesData,
  ): Promise<BulkDeleteMessagesBody> {
    return this.post(
      CHANNEL_MESSAGES_BULK_DELETE(channelId),
      `bulkDeleteMessages_${channelId}`,
      {
        data,
      },
    );
  }

  /**
   * https://discord.dev/interactions/application-commands#bulk-overwrite-global-application-commands
   *
   * Takes a list of application commands, overwriting the existing global command list for this application. Updates will be available in all guilds after 1 hour. Returns `200` and a list of [application command](https://discord.dev/interactions/application-commands#application-command-object) objects. Commands that do not already exist will count toward daily application command create limits.
   *
   * > danger
   * > This will overwrite **all** types of application commands: slash commands, user commands, and message commands.
   *
   * @param applicationId https://discord.dev/resources/application#application-object
   */
  bulkOverwriteGlobalApplicationCommands(
    applicationId: Snowflake,
    data: BulkOverwriteGlobalApplicationCommandsData,
  ): Promise<BulkOverwriteGlobalApplicationCommandsBody> {
    return this.put(
      APPLICATION_COMMANDS(applicationId),
      "bulkOverwriteGlobalApplicationCommands",
      {
        data,
      },
    );
  }

  /**
   * https://discord.dev/interactions/application-commands#bulk-overwrite-guild-application-commands
   *
   * Takes a list of application commands, overwriting the existing command list for this application for the targeted guild. Returns `200` and a list of [application command](https://discord.dev/interactions/application-commands#application-command-object) objects.
   *
   * > danger
   * > This will overwrite **all** types of application commands: slash commands, user commands, and message commands.
   *
   * @param applicationId https://discord.dev/resources/application#application-object
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  bulkOverwriteGuildApplicationCommands(
    applicationId: Snowflake,
    guildId: Snowflake,
    data: BulkOverwriteGuildApplicationCommandsData,
  ): Promise<BulkOverwriteGuildApplicationCommandsBody> {
    return this.put(
      APPLICATION_GUILD_COMMANDS(applicationId, guildId),
      `bulkOverwriteGuildApplicationCommands_${guildId}`,
      {
        data,
      },
    );
  }

  /**
   * https://discord.dev/game-sdk/store#consume-sku
   *
   * Marks a given entitlement for the user as consumed, meaning it will no longer be returned in an entitlements check. **Ensure the user was granted whatever items the entitlement was for before consuming it!**
   *
   * @param applicationId https://discord.dev/game-sdk/sdk-starter-guide#get-set-up
   * @param entitlementId https://discord.dev/game-sdk/store#data-models-entitlement-struct
   */
  consumeSKU(
    applicationId: Snowflake,
    entitlementId: Snowflake,
  ): Promise<ConsumeSKUBody> {
    return this.post(
      APPLICATION_ENTITLEMENT_CONSUME(applicationId, entitlementId),
      "consumeSKU",
    );
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
  createChannelInvite(
    channelId: Snowflake,
    data: CreateChannelInviteData,
  ): Promise<CreateChannelInviteBody> {
    return this.post(
      CHANNEL_INVITES(channelId),
      `createChannelInvite_${channelId}`,
      {
        data,
      },
    );
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
    return this.post(USER_ME_CHANNELS, "createDM", {
      data,
    });
  }

  /**
   * https://discord.dev/interactions/receiving-and-responding#create-followup-message
   *
   * Create a followup message for an Interaction. Functions the same as [Execute Webhook](https://discord.dev/resources/webhook#execute-webhook), but `wait` is always true, and `flags` can be set to `64` in the body to send an ephemeral message. The `thread_id` query parameter is not required (and is furthermore ignored) when using this endpoint for interaction followups.
   *
   * @param applicationId https://discord.dev/resources/application#application-object
   * @param interactionToken https://discord.dev/interactions/receiving-and-responding#interaction-object
   */
  createFollowupMessage(
    applicationId: Snowflake,
    interactionToken: string,
    data: CreateFollowupMessageData,
  ): Promise<CreateFollowupMessageBody> {
    return this.post(
      WEBHOOK_TOKEN(applicationId, interactionToken),
      `createFollowupMessage_${interactionToken}`,
      {
        data,
      },
    );
  }

  /**
   * https://discord.dev/interactions/application-commands#create-global-application-command
   *
   * > danger
   * > Creating a command with the same name as an existing command for your application will overwrite the old command.
   *
   * Create a new global command. New global commands will be available in all guilds after 1 hour. Returns `201` and an [application command](https://discord.dev/interactions/application-commands#application-command-object) object.
   *
   * @param applicationId https://discord.dev/resources/application#application-object
   */
  createGlobalApplicationCommand(
    applicationId: Snowflake,
    data: CreateGlobalApplicationCommandData,
  ): Promise<CreateGlobalApplicationCommandBody> {
    return this.post(
      APPLICATION_COMMANDS(applicationId),
      "createGlobalApplicationCommand",
      {
        data,
      },
    );
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
    return this.post(USER_ME_CHANNELS, "createGroupDM", {
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
    return this.post(GUILDS, "createGuild", {
      data,
    });
  }

  /**
   * https://discord.dev/interactions/application-commands#create-guild-application-command
   *
   * > danger
   * > Creating a command with the same name as an existing command for your application will overwrite the old command.
   *
   * Create a new guild command. New guild commands will be available in the guild immediately. Returns `201` and an [application command](https://discord.dev/interactions/application-commands#application-command-object) object. If the command did not already exist, it will count toward daily application command create limits.
   *
   * @param applicationId https://discord.dev/resources/application#application-object
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  createGuildApplicationCommand(
    applicationId: Snowflake,
    guildId: Snowflake,
    data: CreateGuildApplicationCommandData,
  ): Promise<CreateGuildApplicationCommandBody> {
    return this.post(
      APPLICATION_GUILD_COMMANDS(applicationId, guildId),
      `createGuildApplicationCommand_${guildId}`,
      {
        data,
      },
    );
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
  createGuildBan(
    guildId: Snowflake,
    userId: Snowflake,
    data: CreateGuildBanData,
  ): Promise<CreateGuildBanBody> {
    return this.put(GUILD_BAN(guildId, userId), `createGuildBan_${guildId}`, {
      data,
    });
  }

  /**
   * https://discord.dev/resources/guild#create-guild-channel
   *
   * Create a new [channel](https://discord.dev/resources/channel#channel-object) object for the guild. Requires the `MANAGE_CHANNELS` permission. If setting permission overwrites, only permissions your bot has in the guild can be allowed/denied. Setting `MANAGE_ROLES` permission in channels is only possible for guild administrators. Returns the new [channel](https://discord.dev/resources/channel#channel-object) object on success. Fires a [Channel Create](https://discord.dev/topics/gateway#channel-create) Gateway event.
   *
   * > info
   * > All parameters to this endpoint are optional excluding 'name'
   *
   * > info
   * > This endpoint supports the `X-Audit-Log-Reason` header.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  createGuildChannel(
    guildId: Snowflake,
    data: CreateGuildChannelData,
  ): Promise<CreateGuildChannelBody> {
    return this.post(GUILD_CHANNELS(guildId), `createGuildChannel_${guildId}`, {
      data,
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
  createGuildEmoji(
    guildId: Snowflake,
    data: CreateGuildEmojiData,
  ): Promise<CreateGuildEmojiBody> {
    return this.post(GUILD_EMOJIS(guildId), `createGuildEmoji_${guildId}`, {
      data,
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
  createGuildFromGuildTemplate(
    templateCode: string,
    data: CreateGuildFromGuildTemplateData,
  ): Promise<CreateGuildFromGuildTemplateBody> {
    return this.post(
      GUILDS_TEMPLATE(templateCode),
      "createGuildFromGuildTemplate",
      {
        data,
      },
    );
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
  createGuildRole(
    guildId: Snowflake,
    data: CreateGuildRoleData,
  ): Promise<CreateGuildRoleBody> {
    return this.post(GUILD_ROLES(guildId), `createGuildRole_${guildId}`, {
      data,
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
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  createGuildScheduledEvent(
    guildId: Snowflake,
    data: CreateGuildScheduledEventData,
  ): Promise<CreateGuildScheduledEventBody> {
    return this.post(
      GUILD_SCHEDULED_EVENTS(guildId),
      `createGuildScheduledEvent_${guildId}`,
      {
        data,
      },
    );
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
  createGuildSticker(guildId: Snowflake): Promise<CreateGuildStickerBody> {
    return this.post(GUILD_STICKERS(guildId), `createGuildSticker_${guildId}`);
  }

  /**
   * https://discord.dev/resources/guild-template#create-guild-template
   *
   * Creates a template for the guild. Requires the `MANAGE_GUILD` permission. Returns the created [guild template](https://discord.dev/resources/guild-template#guild-template-object) object on success.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  createGuildTemplate(
    guildId: Snowflake,
    data: CreateGuildTemplateData,
  ): Promise<CreateGuildTemplateBody> {
    return this.post(
      GUILD_TEMPLATES(guildId),
      `createGuildTemplate_${guildId}`,
      {
        data,
      },
    );
  }

  /**
   * https://discord.dev/interactions/receiving-and-responding#create-interaction-response
   *
   * Create a response to an Interaction from the gateway. Takes an [interaction response](https://discord.dev/interactions/receiving-and-responding#interaction-response-object).
   * This endpoint also supports file attachments similar to the webhook endpoints. Refer to [Uploading Files](https://discord.dev/reference#uploading-files) for details on uploading files and `multipart/form-data` requests.
   *
   * @param interactionId https://discord.dev/interactions/receiving-and-responding#interaction
   * @param interactionToken https://discord.dev/interactions/receiving-and-responding#interaction-object
   */
  createInteractionResponse(
    interactionId: Snowflake,
    interactionToken: string,
    data: CreateInteractionResponseData,
  ): Promise<CreateInteractionResponseBody> {
    return this.post(
      INTERACTION_TOKEN_CALLBACK(interactionId, interactionToken),
      `createInteractionResponse_${interactionToken}`,
      {
        data,
      },
    );
  }

  /**
   * https://discord.dev/resources/channel#create-message
   *
   * > warn
   * > Discord may strip certain characters from message content, like invalid unicode characters or characters which cause unexpected message formatting. If you are passing user-generated strings into message content, consider sanitizing the data to prevent unexpected behavior and utilizing `allowed_mentions` to prevent unexpected mentions.
   *
   * Post a message to a guild text or DM channel. Returns a [message](https://discord.dev/resources/channel#message-object) object. Fires a [Message Create](https://discord.dev/topics/gateway#message-create) Gateway event. See [message formatting](https://discord.dev/reference#message-formatting) for more information on how to properly format messages.
   *
   * You may create a message as a reply to another message. To do so, include a [`message_reference`](https://discord.dev/resources/channel#message-reference-object-message-reference-structure) with a `message_id`. The `channel_id` and `guild_id` in the `message_reference` are optional, but will be validated if provided.
   *
   * Files must be attached using a `multipart/form-data` body as described in [Uploading Files](https://discord.dev/reference#uploading-files).
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   */
  createMessage(
    channelId: Snowflake,
    data: CreateMessageData,
  ): Promise<CreateMessageBody> {
    return this.post(
      CHANNEL_MESSAGES(channelId),
      `createMessage_${channelId}`,
      {
        data,
      },
    );
  }

  /**
   * https://discord.dev/game-sdk/store#create-purchase-discount
   *
   * Creates a discount for the given user on their next purchase of the given SKU. You should call this endpoint from your backend server just before calling [StartPurchase](https://discord.dev/game-sdk/store#startpurchase) for the SKU you wish to discount. The user will then see a discounted price for that SKU at time of payment. The discount is automatically consumed after successful purchase or if the TTL expires.
   *
   * @param skuId https://discord.dev/game-sdk/store#data-models-sku-struct
   * @param userId https://discord.dev/resources/user#user-object
   */
  createPurchaseDiscount(
    skuId: Snowflake,
    userId: Snowflake,
    data: CreatePurchaseDiscountData,
  ): Promise<CreatePurchaseDiscountBody> {
    return this.put(
      STORE_SKU_DISCOUNT(skuId, userId),
      "createPurchaseDiscount",
      {
        data,
      },
    );
  }

  /**
   * https://discord.dev/resources/channel#create-reaction
   *
   * Create a reaction for the message. This endpoint requires the 'READ_MESSAGE_HISTORY' permission to be present on the current user. Additionally, if nobody else has reacted to the message using this emoji, this endpoint requires the 'ADD_REACTIONS' permission to be present on the current user. Returns a 204 empty response on success.
   * The `emoji` must be [URL Encoded](https://en.wikipedia.org/wiki/Percent-encoding) or the request will fail with `10014: Unknown Emoji`. To use custom emoji, you must encode it in the format `name:id` with the emoji name and emoji id.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   * @param messageId https://discord.dev/resources/channel#message-object
   * @param emoji https://discord.dev/resources/emoji#emoji-object
   */
  createReaction(
    channelId: Snowflake,
    messageId: Snowflake,
    emoji: string,
  ): Promise<CreateReactionBody> {
    return this.put(
      CHANNEL_MESSAGE_REACTION_ME(channelId, messageId, emoji),
      `createReaction_${channelId}`,
    );
  }

  /**
   * https://discord.dev/resources/stage-instance#create-stage-instance
   *
   * Creates a new Stage instance associated to a Stage channel.
   *
   * Requires the user to be a moderator of the Stage channel.
   *
   * > info
   * > This endpoint supports the `X-Audit-Log-Reason` header.
   */
  createStageInstance(
    data: CreateStageInstanceData,
  ): Promise<CreateStageInstanceBody> {
    return this.post(STAGE_INSTANCES, "createStageInstance", {
      data,
    });
  }

  /**
   * https://discord.dev/resources/webhook#create-webhook
   *
   * Create a new webhook. Requires the `MANAGE_WEBHOOKS` permission. Returns a [webhook](https://discord.dev/resources/webhook#webhook-object) object on success. Webhook names follow our naming restrictions that can be found in our [Usernames and Nicknames](https://discord.dev/resources/user#usernames-and-nicknames) documentation, with the following additional stipulations:
   *
   * - Webhook names cannot be: 'clyde'
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   */
  createWebhook(
    channelId: Snowflake,
    data: CreateWebhookData,
  ): Promise<CreateWebhookBody> {
    return this.post(
      CHANNEL_WEBHOOKS(channelId),
      `createWebhook_${channelId}`,
      {
        data,
      },
    );
  }

  /**
   * https://discord.dev/resources/channel#crosspost-message
   *
   * Crosspost a message in a News Channel to following channels. This endpoint requires the 'SEND_MESSAGES' permission, if the current user sent the message, or additionally the 'MANAGE_MESSAGES' permission, for all other messages, to be present for the current user.
   *
   * Returns a [message](https://discord.dev/resources/channel#message-object) object.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   * @param messageId https://discord.dev/resources/channel#message-object
   */
  crosspostMessage(
    channelId: Snowflake,
    messageId: Snowflake,
  ): Promise<CrosspostMessageBody> {
    return this.post(
      CHANNEL_MESSAGE_CROSSPOST(channelId, messageId),
      `crosspostMessage_${channelId}`,
    );
  }

  /**
   * https://discord.dev/resources/channel#delete-all-reactions
   *
   * Deletes all reactions on a message. This endpoint requires the 'MANAGE_MESSAGES' permission to be present on the current user. Fires a [Message Reaction Remove All](https://discord.dev/topics/gateway#message-reaction-remove-all) Gateway event.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   * @param messageId https://discord.dev/resources/channel#message-object
   */
  deleteAllReactions(
    channelId: Snowflake,
    messageId: Snowflake,
  ): Promise<DeleteAllReactionsBody> {
    return this.delete(
      CHANNEL_MESSAGE_REACTIONS(channelId, messageId),
      `deleteAllReactions_${channelId}`,
    );
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
  deleteAllReactionsForEmoji(
    channelId: Snowflake,
    messageId: Snowflake,
    emoji: string,
  ): Promise<DeleteAllReactionsForEmojiBody> {
    return this.delete(
      CHANNEL_MESSAGE_REACTION(channelId, messageId, emoji),
      `deleteAllReactionsForEmoji_${channelId}`,
    );
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
  deleteChannelPermission(
    channelId: Snowflake,
    overwriteId: Snowflake,
  ): Promise<DeleteChannelPermissionBody> {
    return this.delete(
      CHANNEL_PERMISSION(channelId, overwriteId),
      `deleteChannelPermission_${channelId}`,
    );
  }

  /**
   * https://discord.dev/interactions/receiving-and-responding#delete-followup-message
   *
   * Deletes a followup message for an Interaction. Returns `204` on success. Does not support ephemeral followups.
   *
   * @param applicationId https://discord.dev/resources/application#application-object
   * @param interactionToken https://discord.dev/interactions/receiving-and-responding#interaction-object
   * @param messageId https://discord.dev/resources/channel#message-object
   */
  deleteFollowupMessage(
    applicationId: Snowflake,
    interactionToken: string,
    messageId: Snowflake,
  ): Promise<DeleteFollowupMessageBody> {
    return this.delete(
      WEBHOOK_TOKEN_MESSAGE(applicationId, interactionToken, messageId),
      `deleteFollowupMessage_${interactionToken}`,
    );
  }

  /**
   * https://discord.dev/interactions/application-commands#delete-global-application-command
   *
   * Deletes a global command. Returns `204`.
   *
   * @param applicationId https://discord.dev/resources/application#application-object
   * @param commandId https://discord.dev/interactions/application-commands#application-command-object
   */
  deleteGlobalApplicationCommand(
    applicationId: Snowflake,
    commandId: Snowflake,
  ): Promise<DeleteGlobalApplicationCommandBody> {
    return this.delete(
      APPLICATION_COMMAND(applicationId, commandId),
      "deleteGlobalApplicationCommand",
    );
  }

  /**
   * https://discord.dev/resources/guild#delete-guild
   *
   * Delete a guild permanently. User must be owner. Returns `204 No Content` on success. Fires a [Guild Delete](https://discord.dev/topics/gateway#guild-delete) Gateway event.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  deleteGuild(guildId: Snowflake): Promise<DeleteGuildBody> {
    return this.delete(GUILD(guildId), `deleteGuild_${guildId}`);
  }

  /**
   * https://discord.dev/interactions/application-commands#delete-guild-application-command
   *
   * Delete a guild command. Returns `204` on success.
   *
   * @param applicationId https://discord.dev/resources/application#application-object
   * @param guildId https://discord.dev/resources/guild#guild-object
   * @param commandId https://discord.dev/interactions/application-commands#application-command-object
   */
  deleteGuildApplicationCommand(
    applicationId: Snowflake,
    guildId: Snowflake,
    commandId: Snowflake,
  ): Promise<DeleteGuildApplicationCommandBody> {
    return this.delete(
      APPLICATION_GUILD_COMMAND(applicationId, guildId, commandId),
      `deleteGuildApplicationCommand_${guildId}`,
    );
  }

  /**
   * https://discord.dev/resources/emoji#delete-guild-emoji
   *
   * Delete the given emoji. Requires the `MANAGE_EMOJIS_AND_STICKERS` permission. Returns `204 No Content` on success. Fires a [Guild Emojis Update](https://discord.dev/topics/gateway#guild-emojis-update) Gateway event.
   *
   * > info
   * > This endpoint supports the `X-Audit-Log-Reason` header.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   * @param emojiId https://discord.dev/resources/emoji#emoji-object
   */
  deleteGuildEmoji(
    guildId: Snowflake,
    emojiId: Snowflake,
  ): Promise<DeleteGuildEmojiBody> {
    return this.delete(
      GUILD_EMOJI(guildId, emojiId),
      `deleteGuildEmoji_${guildId}`,
    );
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
  deleteGuildIntegration(
    guildId: Snowflake,
    integrationId: Snowflake,
  ): Promise<DeleteGuildIntegrationBody> {
    return this.delete(
      GUILD_INTEGRATION(guildId, integrationId),
      `deleteGuildIntegration_${guildId}`,
    );
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
  deleteGuildRole(
    guildId: Snowflake,
    roleId: Snowflake,
  ): Promise<DeleteGuildRoleBody> {
    return this.delete(
      GUILD_ROLE(guildId, roleId),
      `deleteGuildRole_${guildId}`,
    );
  }

  /**
   * https://discord.dev/resources/guild-scheduled-event#delete-guild-scheduled-event
   *
   * Delete a guild scheduled event. Returns a `204` on success.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   * @param guildScheduledEventId https://discord.dev/resources/guild-scheduled-event#guild-scheduled-event-object
   */
  deleteGuildScheduledEvent(
    guildId: Snowflake,
    guildScheduledEventId: Snowflake,
  ): Promise<DeleteGuildScheduledEventBody> {
    return this.delete(
      GUILD_SCHEDULED_EVENT(guildId, guildScheduledEventId),
      `deleteGuildScheduledEvent_${guildId}`,
    );
  }

  /**
   * https://discord.dev/resources/sticker#delete-guild-sticker
   *
   * Delete the given sticker. Requires the `MANAGE_EMOJIS_AND_STICKERS` permission. Returns `204 No Content` on success.
   *
   * > info
   * > This endpoint supports the `X-Audit-Log-Reason` header.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   * @param stickerId https://discord.dev/resources/sticker#sticker-object
   */
  deleteGuildSticker(
    guildId: Snowflake,
    stickerId: Snowflake,
  ): Promise<DeleteGuildStickerBody> {
    return this.delete(
      GUILD_STICKER(guildId, stickerId),
      `deleteGuildSticker_${guildId}`,
    );
  }

  /**
   * https://discord.dev/resources/guild-template#delete-guild-template
   *
   * Deletes the template. Requires the `MANAGE_GUILD` permission. Returns the deleted [guild template](https://discord.dev/resources/guild-template#guild-template-object) object on success.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   * @param templateCode https://discord.dev/resources/guild-template#guild-template-object
   */
  deleteGuildTemplate(
    guildId: Snowflake,
    templateCode: string,
  ): Promise<DeleteGuildTemplateBody> {
    return this.delete(
      GUILD_TEMPLATE(guildId, templateCode),
      `deleteGuildTemplate_${guildId}`,
    );
  }

  /**
   * https://discord.dev/resources/invite#delete-invite
   *
   * Delete an invite. Requires the `MANAGE_CHANNELS` permission on the channel this invite belongs to, or `MANAGE_GUILD` to remove any invite across the guild. Returns an [invite](https://discord.dev/resources/invite#invite-object) object on success. Fires a [Invite Delete](https://discord.dev/topics/gateway#invite-delete) Gateway event.
   *
   * > info
   * > This endpoint supports the `X-Audit-Log-Reason` header.
   *
   * @param inviteCode https://discord.dev/resources/invite#invite-object
   */
  deleteInvite(inviteCode: string): Promise<DeleteInviteBody> {
    return this.delete(INVITE(inviteCode), "deleteInvite");
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
  deleteMessage(
    channelId: Snowflake,
    messageId: Snowflake,
  ): Promise<DeleteMessageBody> {
    return this.delete(
      CHANNEL_MESSAGE(channelId, messageId),
      `deleteMessage_${channelId}`,
    );
  }

  /**
   * https://discord.dev/interactions/receiving-and-responding#delete-original-interaction-response
   *
   * Deletes the initial Interaction response. Returns `204` on success.
   *
   * @param applicationId https://discord.dev/resources/application#application-object
   * @param interactionToken https://discord.dev/interactions/receiving-and-responding#interaction-object
   */
  deleteOriginalInteractionResponse(
    applicationId: Snowflake,
    interactionToken: string,
  ): Promise<DeleteOriginalInteractionResponseBody> {
    return this.delete(
      WEBHOOK_TOKEN_MESSAGE_ORIGINAL(applicationId, interactionToken),
      `deleteOriginalInteractionResponse_${interactionToken}`,
    );
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
  deleteOwnReaction(
    channelId: Snowflake,
    messageId: Snowflake,
    emoji: string,
  ): Promise<DeleteOwnReactionBody> {
    return this.delete(
      CHANNEL_MESSAGE_REACTION_ME(channelId, messageId, emoji),
      `deleteOwnReaction_${channelId}`,
    );
  }

  /**
   * https://discord.dev/game-sdk/store#delete-purchase-discount
   *
   * Deletes the currently active discount on the given SKU for the given user. You **do not need** to call this after a user has made a discounted purchase; successful discounted purchases will automatically remove the discount for that user for subsequent purchases.
   *
   * @param skuId https://discord.dev/game-sdk/store#data-models-sku-struct
   * @param userId https://discord.dev/resources/user#user-object
   */
  deletePurchaseDiscount(
    skuId: Snowflake,
    userId: Snowflake,
  ): Promise<DeletePurchaseDiscountBody> {
    return this.delete(
      STORE_SKU_DISCOUNT(skuId, userId),
      "deletePurchaseDiscount",
    );
  }

  /**
   * https://discord.dev/resources/stage-instance#delete-stage-instance
   *
   * Deletes the Stage instance.
   *
   * Requires the user to be a moderator of the Stage channel.
   *
   * > info
   * > This endpoint supports the `X-Audit-Log-Reason` header.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   */
  deleteStageInstance(channelId: Snowflake): Promise<DeleteStageInstanceBody> {
    return this.delete(
      STAGE_INSTANCE(channelId),
      `deleteStageInstance_${channelId}`,
    );
  }

  /**
   * https://discord.dev/game-sdk/store#delete-test-entitlement
   *
   * Deletes a test entitlement for an application. You can only delete entitlements that were "purchased" in developer test mode; these are entitlements of `type == TestModePurchase`. You cannot use this route to delete arbitrary entitlements that users actually purchased.
   *
   * @param applicationId https://discord.dev/game-sdk/sdk-starter-guide#get-set-up
   * @param entitlementId https://discord.dev/game-sdk/store#data-models-entitlement-struct
   */
  deleteTestEntitlement(
    applicationId: Snowflake,
    entitlementId: Snowflake,
  ): Promise<DeleteTestEntitlementBody> {
    return this.delete(
      APPLICATION_ENTITLEMENT(applicationId, entitlementId),
      "deleteTestEntitlement",
    );
  }

  /**
   * https://discord.dev/resources/channel#delete-user-reaction
   *
   * Deletes another user's reaction. This endpoint requires the 'MANAGE_MESSAGES' permission to be present on the current user. Returns a 204 empty response on success.
   * The `emoji` must be [URL Encoded](https://en.wikipedia.org/wiki/Percent-encoding) or the request will fail with `10014: Unknown Emoji`. To use custom emoji, you must encode it in the format `name:id` with the emoji name and emoji id.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   * @param messageId https://discord.dev/resources/channel#message-object
   * @param emoji https://discord.dev/resources/emoji#emoji-object
   * @param userId https://discord.dev/resources/user#user-object
   */
  deleteUserReaction(
    channelId: Snowflake,
    messageId: Snowflake,
    emoji: string,
    userId: Snowflake,
  ): Promise<DeleteUserReactionBody> {
    return this.delete(
      CHANNEL_MESSAGE_REACTION_USER(channelId, messageId, emoji, userId),
      `deleteUserReaction_${channelId}`,
    );
  }

  /**
   * https://discord.dev/resources/webhook#delete-webhook
   *
   * Delete a webhook permanently. Requires the `MANAGE_WEBHOOKS` permission. Returns a 204 NO CONTENT response on success.
   *
   * @param webhookId https://discord.dev/resources/webhook#webhook-object
   */
  deleteWebhook(webhookId: Snowflake): Promise<DeleteWebhookBody> {
    return this.delete(WEBHOOK(webhookId), `deleteWebhook_${webhookId}`);
  }

  /**
   * https://discord.dev/resources/webhook#delete-webhook-message
   *
   * Deletes a message that was created by the webhook. Returns a 204 NO CONTENT response on success.
   *
   * @param webhookId https://discord.dev/resources/webhook#webhook-object
   * @param webhookToken https://discord.dev/resources/webhook#webhook-object
   * @param messageId https://discord.dev/resources/channel#message-object
   */
  deleteWebhookMessage(
    webhookId: Snowflake,
    webhookToken: string,
    messageId: Snowflake,
    query: DeleteWebhookMessageQuery,
  ): Promise<DeleteWebhookMessageBody> {
    return this.delete(
      WEBHOOK_TOKEN_MESSAGE(webhookId, webhookToken, messageId),
      `deleteWebhookMessage_${webhookId}_${webhookToken}`,
      {
        query,
      },
    );
  }

  /**
   * https://discord.dev/resources/webhook#delete-webhook-with-token
   *
   * Same as above, except this call does not require authentication.
   *
   * @param webhookId https://discord.dev/resources/webhook#webhook-object
   * @param webhookToken https://discord.dev/resources/webhook#webhook-object
   */
  deleteWebhookWithToken(
    webhookId: Snowflake,
    webhookToken: string,
  ): Promise<DeleteWebhookWithTokenBody> {
    return this.delete(
      WEBHOOK_TOKEN(webhookId, webhookToken),
      `deleteWebhookWithToken_${webhookId}_${webhookToken}`,
    );
  }

  /**
   * https://discord.dev/resources/channel#delete/close-channel
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
  deleteChannel(channelId: Snowflake): Promise<DeleteChannelBody> {
    return this.delete(CHANNEL(channelId), `deleteChannel_${channelId}`);
  }

  /**
   * https://discord.dev/interactions/application-commands#edit-application-command-permissions
   *
   * > warn
   * > This endpoint will overwrite existing permissions for the command in that guild
   *
   * Edits command permissions for a specific command for your application in a guild.
   * You can only add up to 10 permission overwrites for a command.
   * Returns a [GuildApplicationCommandPermissions](https://discord.dev/interactions/application-commands#application-command-permissions-object-guild-application-command-permissions-structure) object.
   *
   * > warn
   * > Deleting or renaming a command will permanently delete all permissions for that command
   *
   * @param applicationId https://discord.dev/resources/application#application-object
   * @param guildId https://discord.dev/resources/guild#guild-object
   * @param commandId https://discord.dev/interactions/application-commands#application-command-object
   */
  editApplicationCommandPermissions(
    applicationId: Snowflake,
    guildId: Snowflake,
    commandId: Snowflake,
    data: EditApplicationCommandPermissionsData,
  ): Promise<EditApplicationCommandPermissionsBody> {
    return this.put(
      APPLICATION_GUILD_COMMAND_PERMISSIONS(applicationId, guildId, commandId),
      `editApplicationCommandPermissions_${guildId}`,
      {
        data,
      },
    );
  }

  /**
   * https://discord.dev/resources/channel#edit-channel-permissions
   *
   * Edit the channel permission overwrites for a user or role in a channel. Only usable for guild channels. Requires the `MANAGE_ROLES` permission. Only permissions your bot has in the guild or channel can be allowed/denied (unless your bot has a `MANAGE_ROLES` overwrite in the channel). Returns a 204 empty response on success. For more information about permissions, see [permissions](https://discord.dev/topics/permissions#permissions).
   *
   * > info
   * > This endpoint supports the `X-Audit-Log-Reason` header.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   * @param overwriteId https://discord.dev/resources/channel#overwrite-object
   */
  editChannelPermissions(
    channelId: Snowflake,
    overwriteId: Snowflake,
    data: EditChannelPermissionsData,
  ): Promise<EditChannelPermissionsBody> {
    return this.put(
      CHANNEL_PERMISSION(channelId, overwriteId),
      `editChannelPermissions_${channelId}`,
      {
        data,
      },
    );
  }

  /**
   * https://discord.dev/interactions/receiving-and-responding#edit-followup-message
   *
   * Edits a followup message for an Interaction. Functions the same as [Edit Webhook Message](https://discord.dev/resources/webhook#edit-webhook-message). Does not support ephemeral followups.
   *
   * @param applicationId https://discord.dev/resources/application#application-object
   * @param interactionToken https://discord.dev/interactions/receiving-and-responding#interaction-object
   * @param messageId https://discord.dev/resources/channel#message-object
   */
  editFollowupMessage(
    applicationId: Snowflake,
    interactionToken: string,
    messageId: Snowflake,
    data: EditFollowupMessageData,
  ): Promise<EditFollowupMessageBody> {
    return this.patch(
      WEBHOOK_TOKEN_MESSAGE(applicationId, interactionToken, messageId),
      `editFollowupMessage_${interactionToken}`,
      {
        data,
      },
    );
  }

  /**
   * https://discord.dev/interactions/application-commands#edit-global-application-command
   *
   * > info
   * > All parameters for this endpoint are optional.
   *
   * Edit a global command. Updates will be available in all guilds after 1 hour. Returns `200` and an [application command](https://discord.dev/interactions/application-commands#application-command-object) object.
   *
   * @param applicationId https://discord.dev/resources/application#application-object
   * @param commandId https://discord.dev/interactions/application-commands#application-command-object
   */
  editGlobalApplicationCommand(
    applicationId: Snowflake,
    commandId: Snowflake,
    data: EditGlobalApplicationCommandData,
  ): Promise<EditGlobalApplicationCommandBody> {
    return this.patch(
      APPLICATION_COMMAND(applicationId, commandId),
      "editGlobalApplicationCommand",
      {
        data,
      },
    );
  }

  /**
   * https://discord.dev/interactions/application-commands#edit-guild-application-command
   *
   * > info
   * > All parameters for this endpoint are optional.
   *
   * Edit a guild command. Updates for guild commands will be available immediately. Returns `200` and an [application command](https://discord.dev/interactions/application-commands#application-command-object) object.
   *
   * @param applicationId https://discord.dev/resources/application#application-object
   * @param guildId https://discord.dev/resources/guild#guild-object
   * @param commandId https://discord.dev/interactions/application-commands#application-command-object
   */
  editGuildApplicationCommand(
    applicationId: Snowflake,
    guildId: Snowflake,
    commandId: Snowflake,
    data: EditGuildApplicationCommandData,
  ): Promise<EditGuildApplicationCommandBody> {
    return this.patch(
      APPLICATION_GUILD_COMMAND(applicationId, guildId, commandId),
      `editGuildApplicationCommand_${guildId}`,
      {
        data,
      },
    );
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
  editMessage(
    channelId: Snowflake,
    messageId: Snowflake,
    data: EditMessageData,
  ): Promise<EditMessageBody> {
    return this.patch(
      CHANNEL_MESSAGE(channelId, messageId),
      `editMessage_${channelId}`,
      {
        data,
      },
    );
  }

  /**
   * https://discord.dev/interactions/receiving-and-responding#edit-original-interaction-response
   *
   * Edits the initial Interaction response. Functions the same as [Edit Webhook Message](https://discord.dev/resources/webhook#edit-webhook-message).
   *
   * @param applicationId https://discord.dev/resources/application#application-object
   * @param interactionToken https://discord.dev/interactions/receiving-and-responding#interaction-object
   */
  editOriginalInteractionResponse(
    applicationId: Snowflake,
    interactionToken: string,
    data: EditOriginalInteractionResponseData,
  ): Promise<EditOriginalInteractionResponseBody> {
    return this.patch(
      WEBHOOK_TOKEN_MESSAGE_ORIGINAL(applicationId, interactionToken),
      `editOriginalInteractionResponse_${interactionToken}`,
      {
        data,
      },
    );
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
  editWebhookMessage(
    webhookId: Snowflake,
    webhookToken: string,
    messageId: Snowflake,
    data: EditWebhookMessageData,
    query: EditWebhookMessageQuery,
  ): Promise<EditWebhookMessageBody> {
    return this.patch(
      WEBHOOK_TOKEN_MESSAGE(webhookId, webhookToken, messageId),
      `editWebhookMessage_${webhookId}_${webhookToken}`,
      {
        data,
        query,
      },
    );
  }

  /**
   * https://discord.dev/resources/webhook#execute-github-compatible-webhook
   *
   * Add a new webhook to your GitHub repo (in the repo's settings), and use this endpoint as the "Payload URL." You can choose what events your Discord channel receives by choosing the "Let me select individual events" option and selecting individual events for the new webhook you're configuring.
   *
   * @param webhookId https://discord.dev/resources/webhook#webhook-object
   * @param webhookToken https://discord.dev/resources/webhook#webhook-object
   */
  executeGitHubCompatibleWebhook(
    webhookId: Snowflake,
    webhookToken: string,
    query: ExecuteGitHubCompatibleWebhookQuery,
  ): Promise<ExecuteGitHubCompatibleWebhookBody> {
    return this.post(
      WEBHOOK_TOKEN_GITHUB(webhookId, webhookToken),
      `executeGitHubCompatibleWebhook_${webhookId}_${webhookToken}`,
      {
        query,
      },
    );
  }

  /**
   * https://discord.dev/resources/webhook#execute-slack-compatible-webhook
   *
   * Refer to [Slack's documentation](https://api.slack.com/incoming-webhooks) for more information. We do not support Slack's `channel`, `icon_emoji`, `mrkdwn`, or `mrkdwn_in` properties.
   *
   * @param webhookId https://discord.dev/resources/webhook#webhook-object
   * @param webhookToken https://discord.dev/resources/webhook#webhook-object
   */
  executeSlackCompatibleWebhook(
    webhookId: Snowflake,
    webhookToken: string,
    query: ExecuteSlackCompatibleWebhookQuery,
  ): Promise<ExecuteSlackCompatibleWebhookBody> {
    return this.post(
      WEBHOOK_TOKEN_SLACK(webhookId, webhookToken),
      `executeSlackCompatibleWebhook_${webhookId}_${webhookToken}`,
      {
        query,
      },
    );
  }

  /**
   * https://discord.dev/resources/webhook#execute-webhook
   *
   * Refer to [Uploading Files](https://discord.dev/reference#uploading-files) for details on attachments and `multipart/form-data` requests.
   *
   * > info
   * > Note that when sending a message, you must provide a value for at **least one of** `content`, `embeds`, or `file`.
   *
   * @param webhookId https://discord.dev/resources/webhook#webhook-object
   * @param webhookToken https://discord.dev/resources/webhook#webhook-object
   */
  executeWebhook(
    webhookId: Snowflake,
    webhookToken: string,
    data: ExecuteWebhookData,
    query: ExecuteWebhookQuery,
  ): Promise<ExecuteWebhookBody> {
    return this.post(
      WEBHOOK_TOKEN(webhookId, webhookToken),
      `executeWebhook_${webhookId}_${webhookToken}`,
      {
        data,
        query,
      },
    );
  }

  /**
   * https://discord.dev/resources/channel#follow-news-channel
   *
   * Follow a News Channel to send messages to a target channel. Requires the `MANAGE_WEBHOOKS` permission in the target channel. Returns a [followed channel](https://discord.dev/resources/channel#followed-channel-object) object.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   */
  followNewsChannel(
    channelId: Snowflake,
    data: FollowNewsChannelData,
  ): Promise<FollowNewsChannelBody> {
    return this.post(
      CHANNEL_FOLLOWERS(channelId),
      `followNewsChannel_${channelId}`,
      {
        data,
      },
    );
  }

  /**
   * https://discord.dev/interactions/application-commands#get-application-command-permissions
   *
   * Fetches command permissions for a specific command for your application in a guild. Returns a [guild application command permissions](https://discord.dev/interactions/application-commands#application-command-permissions-object-guild-application-command-permissions-structure) object.
   *
   * @param applicationId https://discord.dev/resources/application#application-object
   * @param guildId https://discord.dev/resources/guild#guild-object
   * @param commandId https://discord.dev/interactions/application-commands#application-command-object
   */
  getApplicationCommandPermissions(
    applicationId: Snowflake,
    guildId: Snowflake,
    commandId: Snowflake,
  ): Promise<GetApplicationCommandPermissionsBody> {
    return this.get(
      APPLICATION_GUILD_COMMAND_PERMISSIONS(applicationId, guildId, commandId),
      `getApplicationCommandPermissions_${guildId}`,
    );
  }

  /**
   * https://discord.dev/resources/channel#get-channel
   *
   * Get a channel by ID. Returns a [channel](https://discord.dev/resources/channel#channel-object) object.  If the channel is a thread, a [thread member](https://discord.dev/resources/channel#thread-member-object) object is included in the returned result.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   */
  getChannel(channelId: Snowflake): Promise<GetChannelBody> {
    return this.get(CHANNEL(channelId), `getChannel_${channelId}`);
  }

  /**
   * https://discord.dev/resources/channel#get-channel-invites
   *
   * Returns a list of [invite](https://discord.dev/resources/invite#invite-object) objects (with [invite metadata](https://discord.dev/resources/invite#invite-metadata-object)) for the channel. Only usable for guild channels. Requires the `MANAGE_CHANNELS` permission.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   */
  getChannelInvites(channelId: Snowflake): Promise<GetChannelInvitesBody> {
    return this.get(
      CHANNEL_INVITES(channelId),
      `getChannelInvites_${channelId}`,
    );
  }

  /**
   * https://discord.dev/resources/channel#get-channel-message
   *
   * Returns a specific message in the channel. If operating on a guild channel, this endpoint requires the 'READ_MESSAGE_HISTORY' permission to be present on the current user. Returns a [message](https://discord.dev/resources/channel#message-object) object on success.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   * @param messageId https://discord.dev/resources/channel#message-object
   */
  getChannelMessage(
    channelId: Snowflake,
    messageId: Snowflake,
  ): Promise<GetChannelMessageBody> {
    return this.get(
      CHANNEL_MESSAGE(channelId, messageId),
      `getChannelMessage_${channelId}`,
    );
  }

  /**
   * https://discord.dev/resources/channel#get-channel-messages
   *
   * Returns the messages for a channel. If operating on a guild channel, this endpoint requires the `VIEW_CHANNEL` permission to be present on the current user. If the current user is missing the 'READ_MESSAGE_HISTORY' permission in the channel then this will return no messages (since they cannot read the message history). Returns an array of [message](https://discord.dev/resources/channel#message-object) objects on success.
   *
   * > info
   * > The before, after, and around keys are mutually exclusive, only one may be passed at a time.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   */
  getChannelMessages(
    channelId: Snowflake,
    query: GetChannelMessagesQuery,
  ): Promise<GetChannelMessagesBody> {
    return this.get(
      CHANNEL_MESSAGES(channelId),
      `getChannelMessages_${channelId}`,
      {
        query,
      },
    );
  }

  /**
   * https://discord.dev/resources/webhook#get-channel-webhooks
   *
   * Returns a list of channel [webhook](https://discord.dev/resources/webhook#webhook-object) objects. Requires the `MANAGE_WEBHOOKS` permission.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   */
  getChannelWebhooks(channelId: Snowflake): Promise<GetChannelWebhooksBody> {
    return this.get(
      CHANNEL_WEBHOOKS(channelId),
      `getChannelWebhooks_${channelId}`,
    );
  }

  /**
   * https://discord.dev/topics/oauth2#get-current-authorization-information
   *
   * Returns info about the current authorization. Requires authentication with a bearer token.
   */
  getCurrentAuthorizationInformation(): Promise<
    GetCurrentAuthorizationInformationBody
  > {
    return this.get(OAUTH2_ME, "getCurrentAuthorizationInformation");
  }

  /**
   * https://discord.dev/topics/oauth2#get-current-bot-application-information
   *
   * Returns the bot's [application](https://discord.dev/resources/application#application-object) object.
   */
  getCurrentBotApplicationInformation(): Promise<
    GetCurrentBotApplicationInformationBody
  > {
    return this.get(
      OAUTH2_APPLICATION_ME,
      "getCurrentBotApplicationInformation",
    );
  }

  /**
   * https://discord.dev/resources/user#get-current-user
   *
   * Returns the [user](https://discord.dev/resources/user#user-object) object of the requester's account. For OAuth2, this requires the `identify` scope, which will return the object _without_ an email, and optionally the `email` scope, which returns the object _with_ an email.
   */
  getCurrentUser(): Promise<GetCurrentUserBody> {
    return this.get(USER_ME, "getCurrentUser");
  }

  /**
   * https://discord.dev/resources/user#get-current-user-guilds
   *
   * Returns a list of partial [guild](https://discord.dev/resources/guild#guild-object) objects the current user is a member of. Requires the `guilds` OAuth2 scope.
   */
  getCurrentUserGuilds(
    query: GetCurrentUserGuildsQuery,
  ): Promise<GetCurrentUserGuildsBody> {
    return this.get(USER_ME_GUILDS, "getCurrentUserGuilds", {
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
  getEntitlement(
    applicationId: Snowflake,
    entitlementId: Snowflake,
    query: GetEntitlementQuery,
  ): Promise<GetEntitlementBody> {
    return this.get(
      APPLICATION_ENTITLEMENT(applicationId, entitlementId),
      "getEntitlement",
      {
        query,
      },
    );
  }

  /**
   * https://discord.dev/game-sdk/store#get-entitlements
   *
   * Gets entitlements for a given user. You can use this on your game backend to check entitlements of an arbitrary user, or perhaps in an administrative panel for your support team.
   *
   * @param applicationId https://discord.dev/game-sdk/sdk-starter-guide#get-set-up
   */
  getEntitlements(
    applicationId: Snowflake,
    query: GetEntitlementsQuery,
  ): Promise<GetEntitlementsBody> {
    return this.get(
      APPLICATION_ENTITLEMENTS(applicationId),
      "getEntitlements",
      {
        query,
      },
    );
  }

  /**
   * https://discord.dev/interactions/receiving-and-responding#get-followup-message
   *
   * Returns a followup message for an Interaction. Functions the same as [Get Webhook Message](https://discord.dev/resources/webhook#get-webhook-message). Does not support ephemeral followups.
   *
   * @param applicationId https://discord.dev/resources/application#application-object
   * @param interactionToken https://discord.dev/interactions/receiving-and-responding#interaction-object
   * @param messageId https://discord.dev/resources/channel#message-object
   */
  getFollowupMessage(
    applicationId: Snowflake,
    interactionToken: string,
    messageId: Snowflake,
  ): Promise<GetFollowupMessageBody> {
    return this.get(
      WEBHOOK_TOKEN_MESSAGE(applicationId, interactionToken, messageId),
      `getFollowupMessage_${interactionToken}`,
    );
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
    return this.get(GATEWAY, "getGateway");
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
    return this.get(GATEWAY_BOT, "getGatewayBot");
  }

  /**
   * https://discord.dev/interactions/application-commands#get-global-application-command
   *
   * Fetch a global command for your application. Returns an [application command](https://discord.dev/interactions/application-commands#application-command-object) object.
   *
   * @param applicationId https://discord.dev/resources/application#application-object
   * @param commandId https://discord.dev/interactions/application-commands#application-command-object
   */
  getGlobalApplicationCommand(
    applicationId: Snowflake,
    commandId: Snowflake,
  ): Promise<GetGlobalApplicationCommandBody> {
    return this.get(
      APPLICATION_COMMAND(applicationId, commandId),
      "getGlobalApplicationCommand",
    );
  }

  /**
   * https://discord.dev/interactions/application-commands#get-global-application-commands
   *
   * Fetch all of the global commands for your application. Returns an array of [application command](https://discord.dev/interactions/application-commands#application-command-object) objects.
   *
   * @param applicationId https://discord.dev/resources/application#application-object
   */
  getGlobalApplicationCommands(
    applicationId: Snowflake,
  ): Promise<GetGlobalApplicationCommandsBody> {
    return this.get(
      APPLICATION_COMMANDS(applicationId),
      "getGlobalApplicationCommands",
    );
  }

  /**
   * https://discord.dev/resources/guild#get-guild
   *
   * Returns the [guild](https://discord.dev/resources/guild#guild-object) object for the given id. If `with_counts` is set to `true`, this endpoint will also return `approximate_member_count` and `approximate_presence_count` for the guild.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  getGuild(guildId: Snowflake, query: GetGuildQuery): Promise<GetGuildBody> {
    return this.get(GUILD(guildId), `getGuild_${guildId}`, {
      query,
    });
  }

  /**
   * https://discord.dev/interactions/application-commands#get-guild-application-command
   *
   * Fetch a guild command for your application. Returns an [application command](https://discord.dev/interactions/application-commands#application-command-object) object.
   *
   * @param applicationId https://discord.dev/resources/application#application-object
   * @param guildId https://discord.dev/resources/guild#guild-object
   * @param commandId https://discord.dev/interactions/application-commands#application-command-object
   */
  getGuildApplicationCommand(
    applicationId: Snowflake,
    guildId: Snowflake,
    commandId: Snowflake,
  ): Promise<GetGuildApplicationCommandBody> {
    return this.get(
      APPLICATION_GUILD_COMMAND(applicationId, guildId, commandId),
      `getGuildApplicationCommand_${guildId}`,
    );
  }

  /**
   * https://discord.dev/interactions/application-commands#get-guild-application-command-permissions
   *
   * Fetches command permissions for all commands for your application in a guild. Returns an array of [guild application command permissions](https://discord.dev/interactions/application-commands#application-command-permissions-object-guild-application-command-permissions-structure) objects.
   *
   * @param applicationId https://discord.dev/resources/application#application-object
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  getGuildApplicationCommandPermissions(
    applicationId: Snowflake,
    guildId: Snowflake,
  ): Promise<GetGuildApplicationCommandPermissionsBody> {
    return this.get(
      APPLICATION_GUILD_COMMANDS_PERMISSIONS(applicationId, guildId),
      `getGuildApplicationCommandPermissions_${guildId}`,
    );
  }

  /**
   * https://discord.dev/interactions/application-commands#get-guild-application-commands
   *
   * Fetch all of the guild commands for your application for a specific guild. Returns an array of [application command](https://discord.dev/interactions/application-commands#application-command-object) objects.
   *
   * @param applicationId https://discord.dev/resources/application#application-object
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  getGuildApplicationCommands(
    applicationId: Snowflake,
    guildId: Snowflake,
  ): Promise<GetGuildApplicationCommandsBody> {
    return this.get(
      APPLICATION_GUILD_COMMANDS(applicationId, guildId),
      `getGuildApplicationCommands_${guildId}`,
    );
  }

  /**
   * https://discord.dev/resources/audit-log#get-guild-audit-log
   *
   * Returns an [audit log](https://discord.dev/resources/audit/log#audit-log-object) object for the guild. Requires the 'VIEW_AUDIT_LOG' permission.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  getGuildAuditLog(
    guildId: Snowflake,
    query: GetGuildAuditLogQuery,
  ): Promise<GetGuildAuditLogBody> {
    return this.get(GUILD_AUDIT_LOGS(guildId), `getGuildAuditLog_${guildId}`, {
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
    return this.get(GUILD_BAN(guildId, userId), `getGuildBan_${guildId}`);
  }

  /**
   * https://discord.dev/resources/guild#get-guild-bans
   *
   * Returns a list of [ban](https://discord.dev/resources/guild#ban-object) objects for the users banned from this guild. Requires the `BAN_MEMBERS` permission.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  getGuildBans(guildId: Snowflake): Promise<GetGuildBansBody> {
    return this.get(GUILD_BANS(guildId), `getGuildBans_${guildId}`);
  }

  /**
   * https://discord.dev/resources/guild#get-guild-channels
   *
   * Returns a list of guild [channel](https://discord.dev/resources/channel#channel-object) objects. Does not include threads.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  getGuildChannels(guildId: Snowflake): Promise<GetGuildChannelsBody> {
    return this.get(GUILD_CHANNELS(guildId), `getGuildChannels_${guildId}`);
  }

  /**
   * https://discord.dev/resources/emoji#get-guild-emoji
   *
   * Returns an [emoji](https://discord.dev/resources/emoji#emoji-object) object for the given guild and emoji IDs.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   * @param emojiId https://discord.dev/resources/emoji#emoji-object
   */
  getGuildEmoji(
    guildId: Snowflake,
    emojiId: Snowflake,
  ): Promise<GetGuildEmojiBody> {
    return this.get(GUILD_EMOJI(guildId, emojiId), `getGuildEmoji_${guildId}`);
  }

  /**
   * https://discord.dev/resources/guild#get-guild-integrations
   *
   * Returns a list of [integration](https://discord.dev/resources/guild#integration-object) objects for the guild. Requires the `MANAGE_GUILD` permission.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  getGuildIntegrations(guildId: Snowflake): Promise<GetGuildIntegrationsBody> {
    return this.get(
      GUILD_INTEGRATIONS(guildId),
      `getGuildIntegrations_${guildId}`,
    );
  }

  /**
   * https://discord.dev/resources/guild#get-guild-invites
   *
   * Returns a list of [invite](https://discord.dev/resources/invite#invite-object) objects (with [invite metadata](https://discord.dev/resources/invite#invite-metadata-object)) for the guild. Requires the `MANAGE_GUILD` permission.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  getGuildInvites(guildId: Snowflake): Promise<GetGuildInvitesBody> {
    return this.get(GUILD_INVITES(guildId), `getGuildInvites_${guildId}`);
  }

  /**
   * https://discord.dev/resources/guild#get-guild-member
   *
   * Returns a [guild member](https://discord.dev/resources/guild#guild-member-object) object for the specified user.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   * @param userId https://discord.dev/resources/user#user-object
   */
  getGuildMember(
    guildId: Snowflake,
    userId: Snowflake,
  ): Promise<GetGuildMemberBody> {
    return this.get(GUILD_MEMBER(guildId, userId), `getGuildMember_${guildId}`);
  }

  /**
   * https://discord.dev/resources/guild#get-guild-preview
   *
   * Returns the [guild preview](https://discord.dev/resources/guild#guild-preview-object) object for the given id. If the user is not in the guild, then the guild must be lurkable (it must be Discoverable or have a [live public stage](https://discord.dev/resources/stage/instance#definitions)).
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  getGuildPreview(guildId: Snowflake): Promise<GetGuildPreviewBody> {
    return this.get(GUILD_PREVIEW(guildId), `getGuildPreview_${guildId}`);
  }

  /**
   * https://discord.dev/resources/guild#get-guild-prune-count
   *
   * Returns an object with one 'pruned' key indicating the number of members that would be removed in a prune operation. Requires the `KICK_MEMBERS` permission.
   *
   * By default, prune will not remove users with roles. You can optionally include specific roles in your prune by providing the `include_roles` parameter. Any inactive user that has a subset of the provided role(s) will be counted in the prune and users with additional roles will not.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  getGuildPruneCount(
    guildId: Snowflake,
    query: GetGuildPruneCountQuery,
  ): Promise<GetGuildPruneCountBody> {
    return this.get(GUILD_PRUNE(guildId), `getGuildPruneCount_${guildId}`, {
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
    return this.get(GUILD_ROLES(guildId), `getGuildRoles_${guildId}`);
  }

  /**
   * https://discord.dev/resources/guild-scheduled-event#get-guild-scheduled-event
   *
   * Get a guild scheduled event. Returns a [guild scheduled event](https://discord.dev/resources/guild-scheduled-event#guild-scheduled-event-object) object on success.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   * @param guildScheduledEventId https://discord.dev/resources/guild-scheduled-event#guild-scheduled-event-object
   */
  getGuildScheduledEvent(
    guildId: Snowflake,
    guildScheduledEventId: Snowflake,
    query: GetGuildScheduledEventQuery,
  ): Promise<GetGuildScheduledEventBody> {
    return this.get(
      GUILD_SCHEDULED_EVENT(guildId, guildScheduledEventId),
      `getGuildScheduledEvent_${guildId}`,
      {
        query,
      },
    );
  }

  /**
   * https://discord.dev/resources/guild-scheduled-event#get-guild-scheduled-event-users
   *
   * > warn
   * > A breaking change was introduced for this endpoint on Thursday Nov 18, 2021 after the initial publication of this documentation in which the return type was changed in response to developer feedback. We apologize for the inconvenience and additional work this creates for developers.
   *
   * Get a list of guild scheduled event users subscribed to a guild scheduled event. Returns a list of [guild scheduled event user](https://discord.dev/resources/guild-scheduled-event#guild-scheduled-event-user-object) objects on success. Guild member data, if it exists, is included if the `with_member` query parameter is set.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   * @param guildScheduledEventId https://discord.dev/resources/guild-scheduled-event#guild-scheduled-event-object
   */
  getGuildScheduledEventUsers(
    guildId: Snowflake,
    guildScheduledEventId: Snowflake,
    data: GetGuildScheduledEventUsersData,
  ): Promise<GetGuildScheduledEventUsersBody> {
    return this.get(
      GUILD_SCHEDULED_EVENT_USERS(guildId, guildScheduledEventId),
      `getGuildScheduledEventUsers_${guildId}`,
      {
        data,
      },
    );
  }

  /**
   * https://discord.dev/resources/sticker#get-guild-sticker
   *
   * Returns a [sticker](https://discord.dev/resources/sticker#sticker-object) object for the given guild and sticker IDs. Includes the `user` field if the bot has the `MANAGE_EMOJIS_AND_STICKERS` permission.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   * @param stickerId https://discord.dev/resources/sticker#sticker-object
   */
  getGuildSticker(
    guildId: Snowflake,
    stickerId: Snowflake,
  ): Promise<GetGuildStickerBody> {
    return this.get(
      GUILD_STICKER(guildId, stickerId),
      `getGuildSticker_${guildId}`,
    );
  }

  /**
   * https://discord.dev/resources/guild-template#get-guild-template
   *
   * Returns a [guild template](https://discord.dev/resources/guild-template#guild-template-object) object for the given code.
   *
   * @param templateCode https://discord.dev/resources/guild-template#guild-template-object
   */
  getGuildTemplate(templateCode: string): Promise<GetGuildTemplateBody> {
    return this.get(GUILDS_TEMPLATE(templateCode), "getGuildTemplate");
  }

  /**
   * https://discord.dev/resources/guild-template#get-guild-templates
   *
   * Returns an array of [guild template](https://discord.dev/resources/guild-template#guild-template-object) objects. Requires the `MANAGE_GUILD` permission.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  getGuildTemplates(guildId: Snowflake): Promise<GetGuildTemplatesBody> {
    return this.get(GUILD_TEMPLATES(guildId), `getGuildTemplates_${guildId}`);
  }

  /**
   * https://discord.dev/resources/guild#get-guild-vanity-url
   *
   * Returns a partial [invite](https://discord.dev/resources/invite#invite-object) object for guilds with that feature enabled. Requires the `MANAGE_GUILD` permission. `code` will be null if a vanity url for the guild is not set.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  getGuildVanityURL(guildId: Snowflake): Promise<GetGuildVanityURLBody> {
    return this.get(GUILD_VANITY_URL(guildId), `getGuildVanityURL_${guildId}`);
  }

  /**
   * https://discord.dev/resources/guild#get-guild-voice-regions
   *
   * Returns a list of [voice region](https://discord.dev/resources/voice#voice-region-object) objects for the guild. Unlike the similar `/voice` route, this returns VIP servers when the guild is VIP-enabled.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  getGuildVoiceRegions(guildId: Snowflake): Promise<GetGuildVoiceRegionsBody> {
    return this.get(GUILD_REGIONS(guildId), `getGuildVoiceRegions_${guildId}`);
  }

  /**
   * https://discord.dev/resources/webhook#get-guild-webhooks
   *
   * Returns a list of guild [webhook](https://discord.dev/resources/webhook#webhook-object) objects. Requires the `MANAGE_WEBHOOKS` permission.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  getGuildWebhooks(guildId: Snowflake): Promise<GetGuildWebhooksBody> {
    return this.get(GUILD_WEBHOOKS(guildId), `getGuildWebhooks_${guildId}`);
  }

  /**
   * https://discord.dev/resources/guild#get-guild-welcome-screen
   *
   * Returns the [Welcome Screen](https://discord.dev/resources/guild#welcome-screen-object) object for the guild.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  getGuildWelcomeScreen(
    guildId: Snowflake,
  ): Promise<GetGuildWelcomeScreenBody> {
    return this.get(
      GUILD_WELCOME_SCREEN(guildId),
      `getGuildWelcomeScreen_${guildId}`,
    );
  }

  /**
   * https://discord.dev/resources/guild#get-guild-widget
   *
   * Returns the widget for the guild.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  getGuildWidget(guildId: Snowflake): Promise<GetGuildWidgetBody> {
    return this.get(GUILD_WIDGET_JSON(guildId), `getGuildWidget_${guildId}`);
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
  getGuildWidgetImage(
    guildId: Snowflake,
    query: GetGuildWidgetImageQuery,
  ): Promise<GetGuildWidgetImageBody> {
    return this.get(
      GUILD_WIDGET_PNG(guildId),
      `getGuildWidgetImage_${guildId}`,
      {
        query,
      },
    );
  }

  /**
   * https://discord.dev/resources/guild#get-guild-widget-settings
   *
   * Returns a [guild widget](https://discord.dev/resources/guild#guild-widget-object) object. Requires the `MANAGE_GUILD` permission.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  getGuildWidgetSettings(
    guildId: Snowflake,
  ): Promise<GetGuildWidgetSettingsBody> {
    return this.get(GUILD_WIDGET(guildId), `getGuildWidgetSettings_${guildId}`);
  }

  /**
   * https://discord.dev/resources/invite#get-invite
   *
   * Returns an [invite](https://discord.dev/resources/invite#invite-object) object for the given code.
   *
   * @param inviteCode https://discord.dev/resources/invite#invite-object
   */
  getInvite(inviteCode: string, query: GetInviteQuery): Promise<GetInviteBody> {
    return this.get(INVITE(inviteCode), "getInvite", {
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
  getOriginalInteractionResponse(
    applicationId: Snowflake,
    interactionToken: string,
  ): Promise<GetOriginalInteractionResponseBody> {
    return this.get(
      WEBHOOK_TOKEN_MESSAGE_ORIGINAL(applicationId, interactionToken),
      `getOriginalInteractionResponse_${interactionToken}`,
    );
  }

  /**
   * https://discord.dev/resources/channel#get-pinned-messages
   *
   * Returns all pinned messages in the channel as an array of [message](https://discord.dev/resources/channel#message-object) objects.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   */
  getPinnedMessages(channelId: Snowflake): Promise<GetPinnedMessagesBody> {
    return this.get(CHANNEL_PINS(channelId), `getPinnedMessages_${channelId}`);
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
  getReactions(
    channelId: Snowflake,
    messageId: Snowflake,
    emoji: string,
    query: GetReactionsQuery,
  ): Promise<GetReactionsBody> {
    return this.get(
      CHANNEL_MESSAGE_REACTION(channelId, messageId, emoji),
      `getReactions_${channelId}`,
      {
        query,
      },
    );
  }

  /**
   * https://discord.dev/game-sdk/store#get-skus
   *
   * Get all SKUs for an application.
   *
   * @param applicationId https://discord.dev/game-sdk/sdk-starter-guide#get-set-up
   */
  getSKUs(applicationId: Snowflake): Promise<GetSKUsBody> {
    return this.get(APPLICATION_SKUS(applicationId), "getSKUs");
  }

  /**
   * https://discord.dev/resources/stage-instance#get-stage-instance
   *
   * Gets the stage instance associated with the Stage channel, if it exists.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   */
  getStageInstance(channelId: Snowflake): Promise<GetStageInstanceBody> {
    return this.get(STAGE_INSTANCE(channelId), `getStageInstance_${channelId}`);
  }

  /**
   * https://discord.dev/resources/sticker#get-sticker
   *
   * Returns a [sticker](https://discord.dev/resources/sticker#sticker-object) object for the given sticker ID.
   *
   * @param stickerId https://discord.dev/resources/sticker#sticker-object
   */
  getSticker(stickerId: Snowflake): Promise<GetStickerBody> {
    return this.get(STICKER(stickerId), "getSticker");
  }

  /**
   * https://discord.dev/resources/channel#get-thread-member
   *
   * Returns a [thread member](https://discord.dev/resources/channel#thread-member-object) object for the specified user if they are a member of the thread, returns a 404 response otherwise.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   * @param userId https://discord.dev/resources/user#user-object
   */
  getThreadMember(
    channelId: Snowflake,
    userId: Snowflake,
  ): Promise<GetThreadMemberBody> {
    return this.get(
      CHANNEL_THREAD_MEMBER(channelId, userId),
      `getThreadMember_${channelId}`,
    );
  }

  /**
   * https://discord.dev/resources/user#get-user
   *
   * Returns a [user](https://discord.dev/resources/user#user-object) object for a given user ID.
   *
   * @param userId https://discord.dev/resources/user#user-object
   */
  getUser(userId: Snowflake): Promise<GetUserBody> {
    return this.get(USER(userId), "getUser");
  }

  /**
   * https://discord.dev/resources/user#get-user-connections
   *
   * Returns a list of [connection](https://discord.dev/resources/user#connection-object) objects. Requires the `connections` OAuth2 scope.
   */
  getUserConnections(): Promise<GetUserConnectionsBody> {
    return this.get(USER_ME_CONNECTIONS, "getUserConnections");
  }

  /**
   * https://discord.dev/resources/webhook#get-webhook
   *
   * Returns the new [webhook](https://discord.dev/resources/webhook#webhook-object) object for the given id.
   *
   * @param webhookId https://discord.dev/resources/webhook#webhook-object
   */
  getWebhook(webhookId: Snowflake): Promise<GetWebhookBody> {
    return this.get(WEBHOOK(webhookId), `getWebhook_${webhookId}`);
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
  getWebhookMessage(
    webhookId: Snowflake,
    webhookToken: string,
    messageId: Snowflake,
    query: GetWebhookMessageQuery,
  ): Promise<GetWebhookMessageBody> {
    return this.get(
      WEBHOOK_TOKEN_MESSAGE(webhookId, webhookToken, messageId),
      `getWebhookMessage_${webhookId}_${webhookToken}`,
      {
        query,
      },
    );
  }

  /**
   * https://discord.dev/resources/webhook#get-webhook-with-token
   *
   * Same as above, except this call does not require authentication and returns no user in the webhook object.
   *
   * @param webhookId https://discord.dev/resources/webhook#webhook-object
   * @param webhookToken https://discord.dev/resources/webhook#webhook-object
   */
  getWebhookWithToken(
    webhookId: Snowflake,
    webhookToken: string,
  ): Promise<GetWebhookWithTokenBody> {
    return this.get(
      WEBHOOK_TOKEN(webhookId, webhookToken),
      `getWebhookWithToken_${webhookId}_${webhookToken}`,
    );
  }

  /**
   * https://discord.dev/resources/channel#group-dm-add-recipient
   *
   * Adds a recipient to a Group DM using their access token.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   * @param userId https://discord.dev/resources/user#user-object
   */
  groupDMAddRecipient(
    channelId: Snowflake,
    userId: Snowflake,
    data: GroupDMAddRecipientData,
  ): Promise<GroupDMAddRecipientBody> {
    return this.put(
      CHANNEL_RECIPIENT(channelId, userId),
      `groupDMAddRecipient_${channelId}`,
      {
        data,
      },
    );
  }

  /**
   * https://discord.dev/resources/channel#group-dm-remove-recipient
   *
   * Removes a recipient from a Group DM.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   * @param userId https://discord.dev/resources/user#user-object
   */
  groupDMRemoveRecipient(
    channelId: Snowflake,
    userId: Snowflake,
  ): Promise<GroupDMRemoveRecipientBody> {
    return this.delete(
      CHANNEL_RECIPIENT(channelId, userId),
      `groupDMRemoveRecipient_${channelId}`,
    );
  }

  /**
   * https://discord.dev/resources/channel#join-thread
   *
   * Adds the current user to a thread. Also requires the thread is not archived. Returns a 204 empty response on success. Fires a [Thread Members Update](https://discord.dev/topics/gateway#thread-members-update) Gateway event.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   */
  joinThread(channelId: Snowflake): Promise<JoinThreadBody> {
    return this.put(
      CHANNEL_THREAD_MEMBER_ME(channelId),
      `joinThread_${channelId}`,
    );
  }

  /**
   * https://discord.dev/resources/user#leave-guild
   *
   * Leave a guild. Returns a 204 empty response on success.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  leaveGuild(guildId: Snowflake): Promise<LeaveGuildBody> {
    return this.delete(USER_ME_GUILD(guildId), `leaveGuild_${guildId}`);
  }

  /**
   * https://discord.dev/resources/channel#leave-thread
   *
   * Removes the current user from a thread. Also requires the thread is not archived. Returns a 204 empty response on success. Fires a [Thread Members Update](https://discord.dev/topics/gateway#thread-members-update) Gateway event.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   */
  leaveThread(channelId: Snowflake): Promise<LeaveThreadBody> {
    return this.delete(
      CHANNEL_THREAD_MEMBER_ME(channelId),
      `leaveThread_${channelId}`,
    );
  }

  /**
   * https://discord.dev/resources/guild#list-active-threads
   *
   * Returns all active threads in the guild, including public and private threads. Threads are ordered by their `id`, in descending order.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  listActiveThreads(guildId: Snowflake): Promise<ListActiveThreadsBody> {
    return this.get(
      GUILD_THREADS_ACTIVE(guildId),
      `listActiveThreads_${guildId}`,
    );
  }

  /**
   * https://discord.dev/resources/emoji#list-guild-emojis
   *
   * Returns a list of [emoji](https://discord.dev/resources/emoji#emoji-object) objects for the given guild.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  listGuildEmojis(guildId: Snowflake): Promise<ListGuildEmojisBody> {
    return this.get(GUILD_EMOJIS(guildId), `listGuildEmojis_${guildId}`);
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
  listGuildMembers(
    guildId: Snowflake,
    query: ListGuildMembersQuery,
  ): Promise<ListGuildMembersBody> {
    return this.get(GUILD_MEMBERS(guildId), `listGuildMembers_${guildId}`, {
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
    return this.get(GUILD_STICKERS(guildId), `listGuildStickers_${guildId}`);
  }

  /**
   * https://discord.dev/resources/channel#list-joined-private-archived-threads
   *
   * Returns archived threads in the channel that are of [type](https://discord.dev/resources/channel#channel-object-channel-types) `GUILD_PRIVATE_THREAD`, and the user has joined. Threads are ordered by their `id`, in descending order. Requires the `READ_MESSAGE_HISTORY` permission.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   */
  listJoinedPrivateArchivedThreads(
    channelId: Snowflake,
    query: ListJoinedPrivateArchivedThreadsQuery,
  ): Promise<ListJoinedPrivateArchivedThreadsBody> {
    return this.get(
      CHANNEL_USER_ME_THREADS_ARCHIVED_PRIVATE(channelId),
      `listJoinedPrivateArchivedThreads_${channelId}`,
      {
        query,
      },
    );
  }

  /**
   * https://discord.dev/resources/sticker#list-nitro-sticker-packs
   *
   * Returns the list of sticker packs available to Nitro subscribers.
   */
  listNitroStickerPacks(): Promise<ListNitroStickerPacksBody> {
    return this.get(STICKER_PACKS, "listNitroStickerPacks");
  }

  /**
   * https://discord.dev/resources/channel#list-private-archived-threads
   *
   * Returns archived threads in the channel that are of [type](https://discord.dev/resources/channel#channel-object-channel-types) `GUILD_PRIVATE_THREAD`. Threads are ordered by `archive_timestamp`, in descending order. Requires both the `READ_MESSAGE_HISTORY` and `MANAGE_THREADS` permissions.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   */
  listPrivateArchivedThreads(
    channelId: Snowflake,
    query: ListPrivateArchivedThreadsQuery,
  ): Promise<ListPrivateArchivedThreadsBody> {
    return this.get(
      CHANNEL_THREADS_ARCHIVED_PRIVATE(channelId),
      `listPrivateArchivedThreads_${channelId}`,
      {
        query,
      },
    );
  }

  /**
   * https://discord.dev/resources/channel#list-public-archived-threads
   *
   * Returns archived threads in the channel that are public. When called on a `GUILD_TEXT` channel, returns threads of [type](https://discord.dev/resources/channel#channel-object-channel-types) `GUILD_PUBLIC_THREAD`. When called on a `GUILD_NEWS` channel returns threads of [type](https://discord.dev/resources/channel#channel-object-channel-types) `GUILD_NEWS_THREAD`. Threads are ordered by `archive_timestamp`, in descending order. Requires the `READ_MESSAGE_HISTORY` permission.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   */
  listPublicArchivedThreads(
    channelId: Snowflake,
    query: ListPublicArchivedThreadsQuery,
  ): Promise<ListPublicArchivedThreadsBody> {
    return this.get(
      CHANNEL_THREADS_ARCHIVED_PUBLIC(channelId),
      `listPublicArchivedThreads_${channelId}`,
      {
        query,
      },
    );
  }

  /**
   * https://discord.dev/resources/guild-scheduled-event#list-scheduled-events-for-guild
   *
   * Returns a list of [guild scheduled event](https://discord.dev/resources/guild-scheduled-event#guild-scheduled-event-object) objects for the given guild.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  listScheduledEventsForGuild(
    guildId: Snowflake,
    query: ListScheduledEventsForGuildQuery,
  ): Promise<ListScheduledEventsForGuildBody> {
    return this.get(
      GUILD_SCHEDULED_EVENTS(guildId),
      `listScheduledEventsForGuild_${guildId}`,
      {
        query,
      },
    );
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
    return this.get(
      CHANNEL_THREAD_MEMBERS(channelId),
      `listThreadMembers_${channelId}`,
    );
  }

  /**
   * https://discord.dev/resources/voice#list-voice-regions
   *
   * Returns an array of [voice region](https://discord.dev/resources/voice#voice-region-object) objects that can be used when setting a voice or stage channel's [`rtc_region`](https://discord.dev/resources/channel#channel-object-channel-structure).
   */
  listVoiceRegions(): Promise<ListVoiceRegionsBody> {
    return this.get(VOICE_REGIONS, "listVoiceRegions");
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
  modifyChannel(
    channelId: Snowflake,
    data: ModifyChannelData,
  ): Promise<ModifyChannelBody> {
    return this.patch(CHANNEL(channelId), `modifyChannel_${channelId}`, {
      data,
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
  modifyCurrentMember(
    guildId: Snowflake,
    data: ModifyCurrentMemberData,
  ): Promise<ModifyCurrentMemberBody> {
    return this.patch(
      GUILD_MEMBER_ME(guildId),
      `modifyCurrentMember_${guildId}`,
      {
        data,
      },
    );
  }

  /**
   * https://discord.dev/resources/user#modify-current-user
   *
   * Modify the requester's user account settings. Returns a [user](https://discord.dev/resources/user#user-object) object on success.
   *
   * > info
   * > All parameters to this endpoint are optional.
   */
  modifyCurrentUser(
    data: ModifyCurrentUserData,
  ): Promise<ModifyCurrentUserBody> {
    return this.patch(USER_ME, "modifyCurrentUser", {
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
  modifyCurrentUserNick(
    guildId: Snowflake,
    data: ModifyCurrentUserNickData,
  ): Promise<ModifyCurrentUserNickBody> {
    return this.patch(
      GUILD_MEMBER_ME_NICK(guildId),
      `modifyCurrentUserNick_${guildId}`,
      {
        data,
      },
    );
  }

  /**
   * https://discord.dev/resources/guild#modify-current-user-voice-state
   *
   * Updates the current user's voice state.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  modifyCurrentUserVoiceState(
    guildId: Snowflake,
    data: ModifyCurrentUserVoiceStateData,
  ): Promise<ModifyCurrentUserVoiceStateBody> {
    return this.patch(
      GUILD_VOICE_STATE_ME(guildId),
      `modifyCurrentUserVoiceState_${guildId}`,
      {
        data,
      },
    );
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
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  modifyGuild(
    guildId: Snowflake,
    data: ModifyGuildData,
  ): Promise<ModifyGuildBody> {
    return this.patch(GUILD(guildId), `modifyGuild_${guildId}`, {
      data,
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
  modifyGuildChannelPositions(
    guildId: Snowflake,
    data: ModifyGuildChannelPositionsData,
  ): Promise<ModifyGuildChannelPositionsBody> {
    return this.patch(
      GUILD_CHANNELS(guildId),
      `modifyGuildChannelPositions_${guildId}`,
      {
        data,
      },
    );
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
  modifyGuildEmoji(
    guildId: Snowflake,
    emojiId: Snowflake,
    data: ModifyGuildEmojiData,
  ): Promise<ModifyGuildEmojiBody> {
    return this.patch(
      GUILD_EMOJI(guildId, emojiId),
      `modifyGuildEmoji_${guildId}`,
      {
        data,
      },
    );
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
  modifyGuildMember(
    guildId: Snowflake,
    userId: Snowflake,
    data: ModifyGuildMemberData,
  ): Promise<ModifyGuildMemberBody> {
    return this.patch(
      GUILD_MEMBER(guildId, userId),
      `modifyGuildMember_${guildId}`,
      {
        data,
      },
    );
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
  modifyGuildRole(
    guildId: Snowflake,
    roleId: Snowflake,
    data: ModifyGuildRoleData,
  ): Promise<ModifyGuildRoleBody> {
    return this.patch(
      GUILD_ROLE(guildId, roleId),
      `modifyGuildRole_${guildId}`,
      {
        data,
      },
    );
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
  modifyGuildRolePositions(
    guildId: Snowflake,
    data: ModifyGuildRolePositionsData,
  ): Promise<ModifyGuildRolePositionsBody> {
    return this.patch(
      GUILD_ROLES(guildId),
      `modifyGuildRolePositions_${guildId}`,
      {
        data,
      },
    );
  }

  /**
   * https://discord.dev/resources/guild-scheduled-event#modify-guild-scheduled-event
   *
   * Modify a guild scheduled event. Returns the modified [guild scheduled event](https://discord.dev/resources/guild-scheduled-event#guild-scheduled-event-object) object on success.
   *
   * > info
   * > To start or end an event, use this endpoint to modify the event's [status](https://discord.dev/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-status) field.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   * @param guildScheduledEventId https://discord.dev/resources/guild-scheduled-event#guild-scheduled-event-object
   */
  modifyGuildScheduledEvent(
    guildId: Snowflake,
    guildScheduledEventId: Snowflake,
    data: ModifyGuildScheduledEventData,
  ): Promise<ModifyGuildScheduledEventBody> {
    return this.patch(
      GUILD_SCHEDULED_EVENT(guildId, guildScheduledEventId),
      `modifyGuildScheduledEvent_${guildId}`,
      {
        data,
      },
    );
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
  modifyGuildSticker(
    guildId: Snowflake,
    stickerId: Snowflake,
    data: ModifyGuildStickerData,
  ): Promise<ModifyGuildStickerBody> {
    return this.patch(
      GUILD_STICKER(guildId, stickerId),
      `modifyGuildSticker_${guildId}`,
      {
        data,
      },
    );
  }

  /**
   * https://discord.dev/resources/guild-template#modify-guild-template
   *
   * Modifies the template's metadata. Requires the `MANAGE_GUILD` permission. Returns the [guild template](https://discord.dev/resources/guild-template#guild-template-object) object on success.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   * @param templateCode https://discord.dev/resources/guild-template#guild-template-object
   */
  modifyGuildTemplate(
    guildId: Snowflake,
    templateCode: string,
    data: ModifyGuildTemplateData,
  ): Promise<ModifyGuildTemplateBody> {
    return this.patch(
      GUILD_TEMPLATE(guildId, templateCode),
      `modifyGuildTemplate_${guildId}`,
      {
        data,
      },
    );
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
  modifyGuildWelcomeScreen(
    guildId: Snowflake,
    data: ModifyGuildWelcomeScreenData,
  ): Promise<ModifyGuildWelcomeScreenBody> {
    return this.patch(
      GUILD_WELCOME_SCREEN(guildId),
      `modifyGuildWelcomeScreen_${guildId}`,
      {
        data,
      },
    );
  }

  /**
   * https://discord.dev/resources/guild#modify-guild-widget
   *
   * Modify a [guild widget](https://discord.dev/resources/guild#guild-widget-object) object for the guild. All attributes may be passed in with JSON and modified. Requires the `MANAGE_GUILD` permission. Returns the updated [guild widget](https://discord.dev/resources/guild#guild-widget-object) object.
   *
   * > info
   * > This endpoint supports the `X-Audit-Log-Reason` header.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   */
  modifyGuildWidget(
    guildId: Snowflake,
    data: ModifyGuildWidgetData,
  ): Promise<ModifyGuildWidgetBody> {
    return this.patch(GUILD_WIDGET(guildId), `modifyGuildWidget_${guildId}`, {
      data,
    });
  }

  /**
   * https://discord.dev/resources/stage-instance#modify-stage-instance
   *
   * Updates fields of an existing Stage instance.
   *
   * Requires the user to be a moderator of the Stage channel.
   *
   * > info
   * > This endpoint supports the `X-Audit-Log-Reason` header.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   */
  modifyStageInstance(
    channelId: Snowflake,
    data: ModifyStageInstanceData,
  ): Promise<ModifyStageInstanceBody> {
    return this.patch(
      STAGE_INSTANCE(channelId),
      `modifyStageInstance_${channelId}`,
      {
        data,
      },
    );
  }

  /**
   * https://discord.dev/resources/guild#modify-user-voice-state
   *
   * Updates another user's voice state.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   * @param userId https://discord.dev/resources/user#user-object
   */
  modifyUserVoiceState(
    guildId: Snowflake,
    userId: Snowflake,
    data: ModifyUserVoiceStateData,
  ): Promise<ModifyUserVoiceStateBody> {
    return this.patch(
      GUILD_VOICE_STATE(guildId, userId),
      `modifyUserVoiceState_${guildId}`,
      {
        data,
      },
    );
  }

  /**
   * https://discord.dev/resources/webhook#modify-webhook
   *
   * Modify a webhook. Requires the `MANAGE_WEBHOOKS` permission. Returns the updated [webhook](https://discord.dev/resources/webhook#webhook-object) object on success.
   *
   * > info
   * > All parameters to this endpoint are optional
   *
   * @param webhookId https://discord.dev/resources/webhook#webhook-object
   */
  modifyWebhook(
    webhookId: Snowflake,
    data: ModifyWebhookData,
  ): Promise<ModifyWebhookBody> {
    return this.patch(WEBHOOK(webhookId), `modifyWebhook_${webhookId}`, {
      data,
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
  modifyWebhookWithToken(
    webhookId: Snowflake,
    webhookToken: string,
    data: ModifyWebhookWithTokenData,
  ): Promise<ModifyWebhookWithTokenBody> {
    return this.patch(
      WEBHOOK_TOKEN(webhookId, webhookToken),
      `modifyWebhookWithToken_${webhookId}_${webhookToken}`,
      {
        data,
      },
    );
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
  pinMessage(
    channelId: Snowflake,
    messageId: Snowflake,
  ): Promise<PinMessageBody> {
    return this.put(
      CHANNEL_PIN(channelId, messageId),
      `pinMessage_${channelId}`,
    );
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
  removeGuildBan(
    guildId: Snowflake,
    userId: Snowflake,
  ): Promise<RemoveGuildBanBody> {
    return this.delete(GUILD_BAN(guildId, userId), `removeGuildBan_${guildId}`);
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
  removeGuildMember(
    guildId: Snowflake,
    userId: Snowflake,
  ): Promise<RemoveGuildMemberBody> {
    return this.delete(
      GUILD_MEMBER(guildId, userId),
      `removeGuildMember_${guildId}`,
    );
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
  removeGuildMemberRole(
    guildId: Snowflake,
    userId: Snowflake,
    roleId: Snowflake,
  ): Promise<RemoveGuildMemberRoleBody> {
    return this.delete(
      GUILD_MEMBER_ROLE(guildId, userId, roleId),
      `removeGuildMemberRole_${guildId}`,
    );
  }

  /**
   * https://discord.dev/resources/channel#remove-thread-member
   *
   * Removes another member from a thread. Requires the `MANAGE_THREADS` permission, or the creator of the thread if it is a `GUILD_PRIVATE_THREAD`. Also requires the thread is not archived. Returns a 204 empty response on success. Fires a [Thread Members Update](https://discord.dev/topics/gateway#thread-members-update) Gateway event.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   * @param userId https://discord.dev/resources/user#user-object
   */
  removeThreadMember(
    channelId: Snowflake,
    userId: Snowflake,
  ): Promise<RemoveThreadMemberBody> {
    return this.delete(
      CHANNEL_THREAD_MEMBER(channelId, userId),
      `removeThreadMember_${channelId}`,
    );
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
  searchGuildMembers(
    guildId: Snowflake,
    query: SearchGuildMembersQuery,
  ): Promise<SearchGuildMembersBody> {
    return this.get(
      GUILD_MEMBERS_SEARCH(guildId),
      `searchGuildMembers_${guildId}`,
      {
        query,
      },
    );
  }

  /**
   * https://discord.dev/resources/channel#start-thread-with-message
   *
   * Creates a new thread from an existing message. Returns a [channel](https://discord.dev/resources/channel#channel-object) on success, and a 400 BAD REQUEST on invalid parameters. Fires a [Thread Create](https://discord.dev/topics/gateway#thread-create) Gateway event.
   *
   * When called on a `GUILD_TEXT` channel, creates a `GUILD_PUBLIC_THREAD`. When called on a `GUILD_NEWS` channel, creates a `GUILD_NEWS_THREAD`. The id of the created thread will be the same as the id of the message, and as such a message can only have a single thread created from it.
   *
   * > info
   * > This endpoint supports the `X-Audit-Log-Reason` header.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   * @param messageId https://discord.dev/resources/channel#message-object
   */
  startThreadWithMessage(
    channelId: Snowflake,
    messageId: Snowflake,
    data: StartThreadWithMessageData,
  ): Promise<StartThreadWithMessageBody> {
    return this.post(
      CHANNEL_MESSAGE_THREADS(channelId, messageId),
      `startThreadWithMessage_${channelId}`,
      {
        data,
      },
    );
  }

  /**
   * https://discord.dev/resources/channel#start-thread-without-message
   *
   * Creates a new thread that is not connected to an existing message. The created thread defaults to a `GUILD_PRIVATE_THREAD`\*. Returns a [channel](https://discord.dev/resources/channel#channel-object) on success, and a 400 BAD REQUEST on invalid parameters. Fires a [Thread Create](https://discord.dev/topics/gateway#thread-create) Gateway event.
   *
   * > info
   * > This endpoint supports the `X-Audit-Log-Reason` header.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   */
  startThreadWithoutMessage(
    channelId: Snowflake,
    data: StartThreadWithoutMessageData,
  ): Promise<StartThreadWithoutMessageBody> {
    return this.post(
      CHANNEL_THREADS(channelId),
      `startThreadWithoutMessage_${channelId}`,
      {
        data,
      },
    );
  }

  /**
   * https://discord.dev/resources/guild-template#sync-guild-template
   *
   * Syncs the template to the guild's current state. Requires the `MANAGE_GUILD` permission. Returns the [guild template](https://discord.dev/resources/guild-template#guild-template-object) object on success.
   *
   * @param guildId https://discord.dev/resources/guild#guild-object
   * @param templateCode https://discord.dev/resources/guild-template#guild-template-object
   */
  syncGuildTemplate(
    guildId: Snowflake,
    templateCode: string,
  ): Promise<SyncGuildTemplateBody> {
    return this.put(
      GUILD_TEMPLATE(guildId, templateCode),
      `syncGuildTemplate_${guildId}`,
    );
  }

  /**
   * https://discord.dev/resources/channel#trigger-typing-indicator
   *
   * Post a typing indicator for the specified channel. Generally bots should **not** implement this route. However, if a bot is responding to a command and expects the computation to take a few seconds, this endpoint may be called to let the user know that the bot is processing their message. Returns a 204 empty response on success. Fires a [Typing Start](https://discord.dev/topics/gateway#typing-start) Gateway event.
   *
   * @param channelId https://discord.dev/resources/channel#channel-object
   */
  triggerTypingIndicator(
    channelId: Snowflake,
  ): Promise<TriggerTypingIndicatorBody> {
    return this.post(
      CHANNEL_TYPING(channelId),
      `triggerTypingIndicator_${channelId}`,
    );
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
  unpinMessage(
    channelId: Snowflake,
    messageId: Snowflake,
  ): Promise<UnpinMessageBody> {
    return this.delete(
      CHANNEL_PIN(channelId, messageId),
      `unpinMessage_${channelId}`,
    );
  }
  //#endregion methods
}
