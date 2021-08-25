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

export type Room = {
  attendees: unknown[];
  closed: boolean;
  closed_at?: string;
  description?: string;
  end: string;
  host?: string;
  host_detail?: Speaker;
  id: number;
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
  start: string;
  topic?: number;
  topic_detail?: Topic;
  type: number;
};
