import DateTime from "@/common/utils/datetime/DateTime";

export type StreamFormArgs = {
  topic: string;
  description?: string;
  image?: string;
  start: DateTime;
};

export type Stream = {
  pk: number;
};
