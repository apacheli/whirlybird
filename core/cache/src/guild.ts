import type { AcceptedLocales } from "../../types/src/reference.ts";
import type {
  DefaultMessageNotificationLevel,
  ExplicitContentFilterLevel,
  Guild,
  GuildFeatures,
  GuildNsfwLevel,
  MfaLevel,
  PremiumTier,
  SystemChannelFlags,
  VerificationLevel,
  WelcomeScreen,
} from "../../types/src/resources/guild.ts";
import type {
  VoiceRegion,
  VoiceState,
} from "../../types/src/resources/voice.ts";
import type { Permissions } from "../../types/src/topics/permissions.ts";
import type { CacheClient } from "./cache_client.ts";
import { CacheMap } from "./cache_map.ts";
import { CacheChannel } from "./channel.ts";
import { CacheEmoji } from "./emoji.ts";
import { CacheGuildMember } from "./guild_member.ts";
import { CacheGuildScheduledEvent } from "./guild_scheduled_event.ts";
import { CachePresence } from "./presence.ts";
import { CacheRole } from "./role.ts";
import { CacheStageInstance } from "./stage_instance.ts";
import { CacheSticker } from "./sticker.ts";

export class CacheGuild {
  id;

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
  widgetChannelId?: bigint | null;
  verificationLevel!: VerificationLevel;
  defaultMessageNotifications!: DefaultMessageNotificationLevel;
  explicitContentFilter!: ExplicitContentFilterLevel;
  roles;
  emojis;
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
  members;
  channels;
  threads;
  presences;
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
  nsfwLevel!: GuildNsfwLevel;
  stageInstances;
  stickers;
  guildScheduledEvents;
  premiumProgressBarEnabled?: boolean;

  constructor(data: Guild, client: CacheClient) {
    this.id = BigInt(data.id);

    this.roles = new CacheMap(CacheRole, client);
    for (const role of data.roles) {
      this.roles.add(role.id, role);
    }
    this.emojis = new CacheMap(CacheEmoji, client);
    for (const emoji of data.emojis) {
      this.emojis.add(emoji.id, emoji);
    }
    this.joinedAt = data.joined_at ? Date.parse(data.joined_at) : undefined;
    this.large = data.large;
    this.voiceStates = data.voice_states;
    this.members = new CacheMap(CacheGuildMember, client);
    if (data.members) {
      for (const member of data.members) {
        client.users.add(member.user!.id, member.user!);
        this.members.add(member.user!.id, member);
      }
    }
    this.channels = new CacheMap(CacheChannel, client);
    if (data.channels?.length) {
      for (const channel of data.channels) {
        this.channels.add(channel.id, channel);
      }
    }
    this.threads = new CacheMap(CacheChannel, client);
    if (data.threads?.length) {
      for (const thread of data.threads) {
        this.channels.add(thread.id, thread);
      }
    }
    this.presences = new CacheMap(CachePresence, client);
    if (data.presences) {
      for (const presence of data.presences) {
        this.presences.add(presence.user.id, presence);
      }
    }
    this.stageInstances = new CacheMap(CacheStageInstance, client);
    if (data.stage_instances?.length) {
      for (const stangeInstance of data.stage_instances) {
        this.stageInstances.add(stangeInstance.id, stangeInstance);
      }
    }
    this.stickers = new CacheMap(CacheSticker, client);
    if (data.stickers) {
      for (const sticker of data.stickers) {
        this.stickers.add(sticker.id, sticker);
      }
    }
    this.guildScheduledEvents = new CacheMap(CacheGuildScheduledEvent, client);
    if (data.guild_scheduled_events?.length) {
      for (const guildScheduledEvent of data.guild_scheduled_events) {
        this.guildScheduledEvents.add(
          guildScheduledEvent.id,
          guildScheduledEvent,
        );
      }
    }
  }

  __update__(data: Partial<Guild>) {
    if (data.name !== undefined) {
      this.name = data.name;
    }
    if (data.icon !== undefined) {
      this.icon = data.icon;
    }
    if (data.icon_hash !== undefined) {
      this.iconHash = data.icon_hash;
    }
    if (data.splash !== undefined) {
      this.splash = data.splash;
    }
    if (data.discovery_splash !== undefined) {
      this.discoverySplash = data.discovery_splash;
    }
    if (data.owner !== undefined) {
      this.owner = data.owner;
    }
    if (data.owner_id !== undefined) {
      this.ownerId = BigInt(data.owner_id);
    }
    if (data.permissions !== undefined) {
      this.permissions = data.permissions;
    }
    if (data.region !== undefined) {
      this.region = data.region;
    }
    if (data.afk_channel_id !== undefined) {
      this.afkChannelId = data.afk_channel_id && BigInt(data.afk_channel_id);
    }
    if (data.afk_timeout !== undefined) {
      this.afkTimeout = data.afk_timeout;
    }
    if (data.widget_enabled !== undefined) {
      this.widgetEnabled = data.widget_enabled;
    }
    if (data.widget_channel_id !== undefined) {
      this.widgetChannelId = data.widget_channel_id &&
        BigInt(data.widget_channel_id);
    }
    if (data.verification_level !== undefined) {
      this.verificationLevel = data.verification_level;
    }
    if (data.default_message_notifications !== undefined) {
      this.defaultMessageNotifications = data.default_message_notifications;
    }
    if (data.explicit_content_filter !== undefined) {
      this.explicitContentFilter = data.explicit_content_filter;
    }
    if (data.features !== undefined) {
      this.features = data.features;
    }
    if (data.mfa_level !== undefined) {
      this.mfaLevel = data.mfa_level;
    }
    if (data.application_id !== undefined) {
      this.applicationId = data.application_id && BigInt(data.application_id);
    }
    if (data.system_channel_id !== undefined) {
      this.systemChannelId = data.system_channel_id &&
        BigInt(data.system_channel_id);
    }
    if (data.system_channel_flags !== undefined) {
      this.systemChannelFlags = data.system_channel_flags;
    }
    if (data.rules_channel_id !== undefined) {
      this.rulesChannelId = data.rules_channel_id &&
        BigInt(data.rules_channel_id);
    }
    if (data.unavailable !== undefined) {
      this.unavailable = data.unavailable;
    }
    if (data.member_count !== undefined) {
      this.memberCount = data.member_count;
    }
    if (data.max_presences !== undefined) {
      this.maxPresences = data.max_presences;
    }
    if (data.max_members !== undefined) {
      this.maxMembers = data.max_members;
    }
    if (data.vanity_url_code !== undefined) {
      this.vanityUrlCode = data.vanity_url_code;
    }
    if (data.description !== undefined) {
      this.description = data.description;
    }
    if (data.banner !== undefined) {
      this.banner = data.banner;
    }
    if (data.premium_tier !== undefined) {
      this.premiumTier = data.premium_tier;
    }
    if (data.premium_subscription_count !== undefined) {
      this.premiumSubscriptionCount = data.premium_subscription_count;
    }
    if (data.preferred_locale !== undefined) {
      this.preferredLocale = data.preferred_locale;
    }
    if (data.public_updates_channel_id !== undefined) {
      this.publicUpdatesChannelId = data.public_updates_channel_id &&
        BigInt(data.public_updates_channel_id);
    }
    if (data.max_video_channel_users !== undefined) {
      this.maxVideoChannelUsers = data.max_video_channel_users;
    }
    if (data.approximate_member_count !== undefined) {
      this.approximateMemberCount = data.approximate_member_count;
    }
    if (data.approximate_presence_count !== undefined) {
      this.approximatePresenceCount = data.approximate_presence_count;
    }
    if (data.welcome_screen !== undefined) {
      this.welcomeScreen = data.welcome_screen;
    }
    if (data.nsfw_level !== undefined) {
      this.nsfwLevel = data.nsfw_level;
    }
    if (data.premium_progress_bar_enabled !== undefined) {
      this.premiumProgressBarEnabled = data.premium_progress_bar_enabled;
    }
  }
}
