import { QueryDocumentSnapshot, Timestamp } from "firebase/firestore";
import { EmojiKeys } from "public/images/emoji";

import { Webinar } from "@/community/types/community";
import { ChatActionType } from "@/stream/types/streamChat";

export enum ChatMessageType {
  TEXT = 1,
  REACTION = 2,
  ACTION = 3,
  STICKER = 4,
  PROMPT = 5,
}

export interface ChatUserDetails {
  pk: string;
  name: string;
  email: string;
  first_name: string;
}

export interface ChatMessage {
  id: string;
  created_at: Timestamp;
  message: string;
  group: string | number;
  sender: string;
  type: ChatMessageType;
  data?: {
    name?: string;
    file?: string;
    image?: string;
    sticker?: EmojiKeys;
    stream?: Webinar;
  };
  display_name?: string;
  sender_details?: ChatUserDetails;
  action: ChatActionType;
}

export const ChatMessageConvertor = {
  toFirestore: (value: ChatMessage): ChatMessage => value,
  fromFirestore: (snap: QueryDocumentSnapshot): ChatMessage =>
    ({
      id: snap.id,
      ...snap.data(),
    } as ChatMessage),
};

export const ChatUserDetailConvertor = {
  toFirestore: (value: ChatUserDetails): ChatUserDetails => value,
  fromFirestore: (snap: QueryDocumentSnapshot): ChatUserDetails =>
    snap.data() as ChatUserDetails,
};
