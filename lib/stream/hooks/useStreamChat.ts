import { useContext } from "react";

import {
  StreamChatContext,
  StreamChatContextState,
} from "../providers/StreamChatProvider";

export default function useStreamChat(): StreamChatContextState {
  const context = useContext(StreamChatContext);

  if (!context) {
    throw new Error("Please use StreamChatProvider in tree.");
  }

  return context;
}
