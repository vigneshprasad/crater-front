import { Profile } from "next-auth";

import { Community } from "../../community/types/community";

export type PointOfContact = {
  photo?: string;
  name: string;
  email: string;
  phone_number: string;
};

export type Creator = {
  name?: string;
  photo?: string;
  certified: boolean;
  cover_file?: string;
  default_community: Community;
  follower_count: number;
  id: number;
  subscriber_count: number;
  profile_detail: Profile;
  type?: string;
  user: string;
  slug: string;
  is_follower: boolean;
  show_club_members: boolean;
  video?: string;
  show_analytics: boolean;
  is_subscriber: boolean;
  point_of_contact: string;
  point_of_contact_detail: PointOfContact;
  tokens_enabled: boolean;
};

export type ClubMembersCount = {
  count: number;
};

export type FollowerGrowth = {
  percentage: number;
};

export type AverageEngagement = ClubMembersCount;

export type ComparativeEngagement = FollowerGrowth;

export type UsersByCrater = FollowerGrowth;

export type CreatorRanking = {
  pk: number;
  slug: string;
  name: string;
  image?: string;
  stream_id: number;
  stream_topic: string;
  stream_image: string;
  stream_date: string;
};

export type TopCreators = {
  rank?: number;
  creator_ranking: CreatorRanking[];
};

export type ClubMembersGrowth = {
  rsvp_at: string;
  rsvp_count: number;
};

export type TrafficSourceType = {
  source_name: string;
  count: number;
};

export enum ConversionFunnelKey {
  RSVP = "RSVP",
  Subscribers = "Subscribers",
  RecurringUsers = "Recurring Users",
}

export type ConversionFunnel = {
  name: ConversionFunnelKey;
  value: number;
};

export type CreatorRank = {
  id: number;
  user: string;
  subscriber_count: number;
  slug: string;
  is_follower: boolean;
  profile_detail: {
    id: number;
    name: string;
    photo: string;
  };
  watch_time: number;
};

export type CreatorStats = {
  name: string;
  value: number;
};
