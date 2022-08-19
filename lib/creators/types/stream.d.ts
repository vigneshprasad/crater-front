import DateTime from "@/common/utils/datetime/DateTime";

export type StreamCategory = {
  pk: number;
  name: string;
  slug: string;
  photo?: string;
  tagline?: string;
  show_on_home_page: boolean;
  is_follower: boolean;
};

export type StreamFormArgs = {
  topic: string;
  description?: string;
  image?: string;
  start: DateTime;
  categories: StreamCategory[];
  rtmp_link?: string;
};

export type CreateWebinar = Partial<Webinar> & {
  topic_title?: string;
  topic_image?: string;
  rtmp_link?: string;
};

export type TopStreams = {
  id: number;
  topic_title: string;
  topic_image?: string;
  start: string;
  // rsvp_count: number;
  // messages_count: number;
};

export type ChannelStats = {
  total_stream_time: number;
  total_streams: number;
  total_followers: number;
  average_stream_length: number;
  average_stream_engagement: number;
};

export type PlatformStats = {
  total_creators: number;
  total_streams: number;
  chat_engagement: number;
  total_stream_time: number;
};

export type StreamCategoryDistribution = {
  id: number;
  name: string;
  value: number;
};
