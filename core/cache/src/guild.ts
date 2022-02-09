import type { AcceptedLocales, Snowflake } from "../../types/src/reference.ts";
import type {
  GuildChannel,
  ThreadChannel,
} from "../../types/src/resources/channel.ts";
import type { Emoji } from "../../types/src/resources/emoji.ts";
import type {
  DefaultMessageNotificationLevel,
  ExplicitContentFilterLevel,
  Guild,
  GuildFeatures,
  GuildMember,
  GuildNSFWLevel,
  MfaLevel,
  PremiumTier,
  SystemChannelFlags,
  VerificationLevel,
  WelcomeScreen,
} from "../../types/src/resources/guild.ts";
import type { GuildScheduledEvent } from "../../types/src/resources/guild_scheduled_event.ts";
import type { StageInstance } from "../../types/src/resources/stage_instance.ts";
import type { Sticker } from "../../types/src/resources/sticker.ts";
import type {
  VoiceRegion,
  VoiceState,
} from "../../types/src/resources/voice.ts";
import type { DispatchPayloadPresenceUpdateData } from "../../types/src/topics/gateway.ts";
import type { Permissions, Role } from "../../types/src/topics/permissions.ts";
import * as logger from "../../util/src/logger.ts";

/** Debug */
export const unknownGuildKeys = new Set<string>();

export class CacheGuild {
  name!: string;
  icon!: string | null;
  iconHash?: string | null;
  splash!: string | null;
  discoverySplash!: string | null;
  owner?: boolean;
  ownerId!: bigint;
  permissions?: Permissions;
  region!: VoiceRegion;
  afkChannelId!: bigint | null;
  afkTimeout!: number;
  widgetEnabled?: boolean;
  widgetChannelId?: Snowflake | null;
  verificationLevel!: VerificationLevel;
  defaultMessageNotifications!: DefaultMessageNotificationLevel;
  explicitContentFilter!: ExplicitContentFilterLevel;
  roles: Role[];
  emojis: Emoji[];
  features!: GuildFeatures[];
  mfaLevel!: MfaLevel;
  applicationId!: bigint | null;
  systemChannelId!: bigint | null;
  systemChannelFlags!: SystemChannelFlags;
  rulesChannelId!: bigint | null;
  joinedAt?: number;
  large?: boolean;
  unavailable?: boolean;
  memberCount?: number;
  voiceStates?: Partial<VoiceState>[];
  members?: GuildMember[];
  channels?: GuildChannel[];
  threads?: ThreadChannel[];
  presences?: DispatchPayloadPresenceUpdateData[];
  maxPresences?: number | null;
  maxMembers?: number;
  vanityUrlCode!: string | null;
  description!: string | null;
  banner!: string | null;
  premiumTier!: PremiumTier;
  premiumSubscriptionCount?: number;
  preferredLocale!: AcceptedLocales;
  publicUpdatesChannelId!: bigint | null;
  maxVideoChannelUsers?: number;
  approximateMemberCount?: number;
  approximatePresenceCount?: number;
  welcomeScreen?: WelcomeScreen;
  nsfwLevel!: GuildNSFWLevel;
  stageInstances?: StageInstance;
  stickers?: Sticker[];
  guildScheduledEvents?: GuildScheduledEvent[];
  premiumProgressBarEnabled?: boolean;

  unknown: Record<string, unknown> = {};

  constructor(data: Guild, public id = BigInt(data.id), event?: string) {
    this.roles = data.roles;
    this.emojis = data.emojis;
    this.joinedAt = data.joined_at ? Date.parse(data.joined_at) : void 0;
    this.large = data.large;
    this.voiceStates = data.voice_states;
    this.members = data.members;
    this.channels = data.channels;
    this.threads = data.threads;
    this.presences = data.presences;
    this.stageInstances = data.stage_instances;
    this.stickers = data.stickers;
    this.guildScheduledEvents = data.guild_scheduled_events;

    this.update(data, event);
  }

  update(data: Partial<Guild>, event?: string) {
    for (const key in data) {
      switch (key) {
        case "id":
        case "roles":
        case "emojis":
        case "joined_at":
        case "large":
        case "voice_states":
        case "members":
        case "channels":
        case "threads":
        case "presences":
        case "stage_instances":
        case "stickers":
        case "guild_scheduled_events": {
          /* Ignored fields */
          break;
        }

        case "icon_hash":
        case "discovery_splash":
        case "afk_timeout":
        case "widget_enabled":
        case "verification_level":
        case "default_message_notifications":
        case "explicit_content_filter":
        case "mfa_level":
        case "system_channel_flags":
        case "member_count":
        case "max_presences":
        case "max_members":
        case "vanity_url_code":
        case "premium_tier":
        case "premium_subscription_count":
        case "preferred_locale":
        case "max_video_channel_users":
        case "approximate_member_count":
        case "approximate_presence_count":
        case "welcome_screen":
        case "nsfw_level":
        case "premium_progress_bar_enabled": {
          // @ts-ignore: Intersection error
          this[keys[key]] = data[key];
          break;
        }

        case "owner_id":
        case "afk_channel_id":
        case "widget_channel_id":
        case "application_id":
        case "system_channel_id":
        case "rules_channel_id":
        case "public_updates_channel_id": {
          const id = data[key];
          // @ts-ignore: Intersection error
          this[keys[key]] = id && BigInt(id);
          break;
        }

        case "name":
        case "icon":
        case "splash":
        case "owner":
        case "permissions":
        case "region":
        case "features":
        case "unavailable":
        case "description":
        case "banner": {
          // @ts-ignore: Intersection error
          this[key] = data[key]!;
          break;
        }

        default: {
          if (!unknownGuildKeys.has(key)) {
            unknownGuildKeys.add(key);
            logger.debug(`Unknown guild key "${key}" in event "${event}"`);
          }
          this.unknown[key] = data[key as keyof Guild]!;
          break;
        }
      }
    }
  }
}

const keys = {
  icon_hash: "iconHash",
  discovery_splash: "discoverySplash",
  owner_id: "ownerId",
  afk_channel_id: "afkChannelId",
  afk_timeout: "afkTimeout",
  widget_enabled: "widgetEnabled",
  widget_channel_id: "widgetChannelId",
  verification_level: "verificationLevel",
  default_message_notifications: "defaultMessageNotifications",
  explicit_content_filter: "explicitContentFilter",
  mfa_level: "mfaLevel",
  application_id: "applicationId",
  system_channel_id: "systemChannelId",
  system_channel_flags: "systemChannelFlags",
  rules_channel_id: "rulesChannelId",
  member_count: "memberCount",
  max_presences: "maxPresences",
  max_members: "maxMembers",
  vanity_url_code: "vanityUrlCode",
  premium_tier: "premiumTier",
  premium_subscription_count: "premiumSubscriptionCount",
  preferred_locale: "preferredLocale",
  public_updates_channel_id: "publicUpdatesChannelId",
  max_video_channel_users: "maxVideoChannelUsers",
  approximate_member_count: "approximateMemberCount",
  approximate_presence_count: "approximatePresenceCount",
  welcome_screen: "welcomeScreen",
  nsfw_level: "nsfwLevel",
  premium_progress_bar_enabled: "premiumProgressBarEnabled",
} as const;
