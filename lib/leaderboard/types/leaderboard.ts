export interface Challenge {
  id: number;
  name: string;
  title: string;
  description?: string;
  image?: string;
  categories: number[];
  start: string;
  end: string;
  duration_types: number[];
  participants: string[];
  rules?: string;
}

export interface DurationType {
  id: number;
  name: string;
}

export interface Leaderboard {
  id: number;
  challenge: number;
  start: string;
  end: string;
  duration_type: number;
  participants: number[];
  is_active: boolean;
  last_calculated_at: string;
  duration_type_detail: DurationType;
}

export interface UserLeaderboard {
  id: number;
  user: string;
  leaderboard: number;
  rank: number;
  total_minutes: number;
  is_active: boolean;
  last_calculated_at: string;
  user_detail: {
    name: string;
    photo: string;
  };
  creator_detail: {
    slug: string;
  };
}
