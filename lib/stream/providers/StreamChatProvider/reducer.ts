import produce from "immer";

import { ChatAction, StreamChatState } from "./types";

const StreamChatReducer = produce(
  (draft: StreamChatState, action: ChatAction) => {
    switch (action.type) {
      case "connect":
        draft.connected = true;
        break;
      case "group_messages_received":
        draft.messages = action.payload.messages;
        break;
      case "new_group_message":
        draft.messages.unshift(action.payload);
      default:
        break;
    }
  }
);

export default StreamChatReducer;
