export type Community = {
  creator: number;
  id: number;
  is_active: boolean;
  is_default: boolean;
  name: string;
};

export type CommunityMember = {
  community: number;
  id: number;
  user: string;
  user_detail: {
    name?: string;
    photo?: string;
  };
};

export type Speaker = {
  email: string;
  introduction: string;
  name: string;
  photo?: string;
  pk: string;
};

export type Topic = {
  id: number;
  article: number;
  article_detail?: unknown;
  creator?: string;
  description?: string;
  image?: string;
  is_active: boolean;
  is_approved: boolean;
  name: string;
  parent?: number;
  root?: number;
};

export type Group = {
  attendees: string[];
  closed: boolean;
  closed_at?: string;
  description?: string;
  end: string;
  host?: string;
  host_detail?: Speaker;
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
  speakers_detail_list?: Speaker[];
  attendees_detail_list?: Speaker[];
  start: string;
  topic?: number;
  topic_detail?: Topic;
  type: number;
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

export type Webinar = Group;
