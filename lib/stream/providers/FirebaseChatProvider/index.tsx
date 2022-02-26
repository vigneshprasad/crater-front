import { useContext } from "react";

import { FirebaseChatContext, IFirebaseChatState } from "./context";

export * from "./provider";

export default function useFirebaseChat(): IFirebaseChatState {
  const context = useContext(FirebaseChatContext);

  if (!context) {
    throw new Error("Please use StreamChatProvider in tree.");
  }
  return context;
}
