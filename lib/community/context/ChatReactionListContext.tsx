import { createContext, useMemo, useContext, PropsWithChildren } from "react";
import useSWR from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { ChatReaction } from "@/stream/types/chatReaction";

interface IChatReactionListState {
  reactions?: ChatReaction[];
  error?: unknown;
  loading: boolean;
}

export const ChatReactionListContext = createContext(
  {} as IChatReactionListState
);

export type IProviderProps = PropsWithChildren<unknown>;

export function ChatReactionListProvider({
  ...rest
}: IProviderProps): JSX.Element {
  const { data: reactions, error } = useSWR<ChatReaction[]>(
    API_URL_CONSTANTS.chat.getChatReactions,
    {}
  );

  const value: IChatReactionListState = useMemo(
    () => ({ reactions, error, loading: !reactions && !error }),
    [reactions, error]
  );

  return <ChatReactionListContext.Provider value={value} {...rest} />;
}

export default function useChatReactionList(): IChatReactionListState {
  const context = useContext(ChatReactionListContext);

  if (!context) {
    throw new Error("Please use ChatReactionListProvider in tree.");
  }

  return context;
}
