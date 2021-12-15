import DateTime from "@/common/utils/datetime/DateTime";

export type StreamCategory = {
  pk: number;
  name: string;
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
