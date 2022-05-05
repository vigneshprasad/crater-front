export enum ChatMessageType {
  TEXT = 1,
  REACTION = 2,
  ACTION = 3,
}

export enum ChatActionType {
  FOLLOW = 1,
  REFERRAL = 2,
  STREAMS = 3,
  MOBILE_APP = 4,
}

export interface ChatMessage {
  id: number;
  created_at: string;
  message: string;
  group: number;
  sender: string;
  type: ChatMessageType;
  data?: {
    name: string;
    file: string;
    image: string;
  };
  display_name?: string;
  sender_detail: {
    pk: string;
    name: string;
    email: string;
    first_name: string;
  };
  action: ChatActionType;
}
