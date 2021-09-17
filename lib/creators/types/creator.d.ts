import { Community } from "./community";

export type Creator = {
  name?: string;
  about?: string;
  certified: boolean;
  cover_file?: string;
  default_community: Community;
  follower_count: number;
  id: number;
  number_of_subscribers: number;
  photo?: string;
  type?: string;
  user: string;
};
