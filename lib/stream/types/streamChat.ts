export enum ChatMessageType {
  TEXT = 1,
  REACTION = 2,
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
}
