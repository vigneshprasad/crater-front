export interface StreamRecording {
  group: number;
  recording: string;
  dyte_recordings: number[];
  is_published: boolean;
}

export interface StreamQuestion {
  id: number;
  group: number;
  question: string;
  sender: string;
  upvotes: number;
  upvote: boolean;
  created_at: string;
  sender_detail: {
    pk: string;
    name: string;
  };
}

export interface StreamQuestionUpvote {
  id: number;
  question: number;
  user: string;
  upvote: boolean;
}

export interface UserCategory {
  id: number;
  user: string;
  category: number;
  followed: boolean;
  followed_at: string;
  unfollowed_at: string;
}

export interface SuggestedTopic {
  id: number;
  name: string;
  category: number;
}

export interface StreamUpvote {
  id: number;
  group: number;
  user: string;
  upvote: boolean;
}

export enum SortByField {
  TODAY = "today",
  THIS_WEEK = "this_week",
  NEXT_WEEK = "next_week",
  THIS_MONTH = "this_month",
  RECENTLY_ADDED = "recently_added",
}

export enum StreamCreationSteps {
  GetStarted,
  BasicDetails,
  AddThumbnail,
  OtherSettings,
}
