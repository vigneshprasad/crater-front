import DateTime from "@/common/utils/datetime/DateTime";

export type StreamCategory = {
  pk: number;
  name: string;
  photo?: string;
  tagline?: string;
  show_on_home_page: boolean;
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
