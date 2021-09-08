export type Profile = {
  pk: number;
  name: string;
  role: string;
  photo?: string;
  uuid: string;
  cover?: string;
  cover_file?: string;
  cover_thumbnail?: string;
};

export type CoverFile = {
  pk: number;
  file: string;
};
