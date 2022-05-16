import { ChatMessage } from "@/stream/types/streamChat";

/// State
export interface StreamChatState {
  connected: boolean;
  messages: ChatMessage[];
}

/// Actions
type ConnectedChatAction = {
  type: "connect";
};

type MessageRecievedAction = {
  type: "group_messages_received";
  payload: {
    messages: ChatMessage[];
  };
};

type NewGroupMessageAction = {
  type: "new_group_message";
  payload: ChatMessage;
};

export type ChatAction =
  | ConnectedChatAction
  | MessageRecievedAction
  | NewGroupMessageAction;
