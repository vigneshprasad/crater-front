import { Community } from "./community";

export type Creator = {
  certified: boolean;
  cover_file?: string;
  default_community: Community;
  follower_count: number;
  id: number;
  number_of_subscribers: number;
  profile_properties?: Profile;
  type?: string;
  user: string;
};
