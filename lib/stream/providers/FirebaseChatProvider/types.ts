import { QueryDocumentSnapshot, Timestamp } from "firebase/firestore";

export enum ChatMessageType {
  TEXT = 1,
  REACTION = 2,
}

export interface ChatUserDetails {
  pk: string;
  name: string;
  email: string;
  first_name: string;
}

export interface ChatMessage {
  created_at: Timestamp;
  message: string;
  group: string | number;
  sender: string;
  type: ChatMessageType;
  data?: {
    name: string;
    file: string;
    image: string;
  };
  display_name?: string;
  sender_details?: ChatUserDetails;
}

export const ChatMessageConvertor = {
  toFirestore: (value: ChatMessage): ChatMessage => value,
  fromFirestore: (snap: QueryDocumentSnapshot): ChatMessage =>
    snap.data() as ChatMessage,
};

export const ChatUserDetailConvertor = {
  toFirestore: (value: ChatUserDetails): ChatUserDetails => value,
  fromFirestore: (snap: QueryDocumentSnapshot): ChatUserDetails =>
    snap.data() as ChatUserDetails,
};
