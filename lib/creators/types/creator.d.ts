import { Profile } from "next-auth";

import { Community } from "../../community/types/community";

export type Creator = {
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
};

export type ClubMembersCount = {
  count: number;
};

export type FollowerGrowth = {
  percentage: number;
};

export type AverageEngagement = ClubMembersCount;

export type ComparativeEngagement = FollowerGrowth;

export type TopCreators = {
  creator_user_pk: number;
  creator_name: string;
  creator_image?: string;
  stream_topic: string;
  follower_count: number;
};

export type ClubMembersGrowth = {
  followed_at_date: string;
  follower_count: number;
};

export type TrafficSourceType = {
  source_name: string;
  count: number;
};

export type ConversionFunnel = {
  name: string;
  count: number;
  fill: string;
};
