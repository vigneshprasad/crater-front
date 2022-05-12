import { Profile } from "next-auth";

import { Creator } from "@/creators/types/creator";
import { StreamCategory } from "@/creators/types/stream";

export type Community = {
  creator: number;
  id: number;
  is_active: boolean;
  is_default: boolean;
  name: string;
};

export type Speaker = {
  email: string;
  introduction: string;
  name: string;
  photo?: string;
  pk: string;
  slug?: string;
  creator_detail?: Creator;
};

export type Topic = {
  id: number;
  article: number;
  article_detail?: unknown;
  creator?: string;
  description?: string;
  image: string;
  is_active: boolean;
  is_approved: boolean;
  name: string;
  parent?: number;
  root?: number;
  slug?: string;
};

export type Group = {
  attendees: string[];
  closed: boolean;
  closed_at?: string;
  description?: string;
  end: string;
  host: string;
  host_detail: Speaker;
  id: number;
  is_live: boolean;
  interests: number[];
  interests_detail_list?: {
    icon?: string;
    name: string;
    pk: number;
  }[];
  is_approved: boolean;
  is_past: boolean;
  is_speaker: boolean;
  max_speakers: number;
  medium: number;
  privacy: number;
  relevancy: number;
  speakers?: string[];
  speakers_detail_list: Speaker[];
  attendees_detail_list: Speaker[];
  start: string;
  topic: number;
  topic_detail: Topic;
  type: number;
  rsvp: boolean | null;
  series: number | null;
  recording_details?: {
    dyte_recordings: number[];
    dyte_recordings_details: unknown[];
    id: number;
    is_published: string;
    recording: string;
    published_at: string;
  };
};

export enum ParticpantType {
  speaker = 1,
  attendee = 2,
}

export enum RequestStatus {
  pending = 0,
  accepted = 1,
  declined = 2,
}

export interface GroupRequest {
  pk: number;
  requester: string;
  group: number;
  status: RequestStatus;
  is_recommended?: boolean;
  group_detail: Group;
  participant_type: ParticpantType;
}

export type PostGroupRequest = Omit<
  GroupRequest,
  "pk" | "requester" | "group_detail"
>;

export type Room = Group;

export type Webinar = Group & {
  host_profile_details?: Profile;
};

export interface UserProperties {
  pk: string;
  photo?: string;
  name?: string;
  introduction?: string;
}

export interface Follower {
  creator: number;
  followed_at: string;
  id: number;
  profile_detail: Profile;
  unfollowed: boolean;
  unfollowed_at: null | string;
  user: string;
  notify: boolean;
}

export interface CommunityMember {
  id: number;
  community: number;
  joined_at: string;
  user: string;
  profile_detail: Profile;
}

export enum WSMessageTypes {
  live_count = "live_count",
}

export interface WSMessage {
  type: WSMessageTypes;
  [key: string]: unknown;
}

export interface WSWebinarLiveParticipantCount extends WSMessage {
  type: WSMessageTypes.live_count;
  count: number;
}

export interface Series {
  id: number;
  topic: number;
  topic_detail: Topic;
  groups: number[];
  groups_detail_list: Webinar[];
  categories: number[];
  categories_detail_list: StreamCategory[];
  host: string;
  host_detail: Speaker;
  start: string;
}
