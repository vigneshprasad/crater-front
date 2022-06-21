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
