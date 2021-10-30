import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";

import useAuth from "@/auth/context/AuthContext";
import { WEBSOCKET_BASE_URL } from "@/common/constants/global.constants";
import { ChatMessage } from "@/stream/types/streamChat";

import StreamChatReducer from "./reducer";
import { StreamChatState } from "./types";

export interface StreamChatContextState {
  messages: ChatMessage[];
  connected: boolean;
  sendGroupMessage: (message: string) => void;
}

export const StreamChatContext = createContext({} as StreamChatContextState);

type ProviderProps = PropsWithChildren<{
  groupId: string | number;
}>;

const intialState: StreamChatState = {
  connected: false,
  messages: [],
};

export default function StreamChatProvider({
  groupId,
  ...rest
}: ProviderProps): JSX.Element {
  const { session } = useAuth();
  const _socket = useRef<WebSocket>();
  const [state, dispatch] = useReducer(StreamChatReducer, intialState);

  const onInit = useCallback(() => {
    if (_socket.current) {
      dispatch({
        type: "connect",
      });
    }
  }, []);

  const messageHandler = useCallback(
    (event: MessageEvent<string>) => {
      if (event.data) {
        const data = JSON.parse(event.data);
        dispatch(data);
      }
    },
    [dispatch]
  );

  const sendGroupMessage = useCallback(
    (message: string) => {
      if (_socket.current) {
        const data = {
          type: "send_group_message",
          payload: {
            message,
          },
        };

        _socket.current.send(JSON.stringify(data));
      }
    },
    [_socket]
  );

  useEffect(() => {
    if (session && session.user) {
      const token = session.user.apiToken;
      _socket.current = new WebSocket(
        `${WEBSOCKET_BASE_URL}/group/${groupId}/?token=${token}`
      );
      _socket.current.addEventListener("open", onInit);
      _socket.current.addEventListener("message", messageHandler);
    }

    return () => {
      if (_socket.current) {
        _socket.current.removeEventListener("open", onInit);
        _socket.current.removeEventListener("message", messageHandler);
        _socket.current.close();
        _socket.current = undefined;
      }
    };
  }, [groupId, messageHandler, onInit, session]);

  const value = useMemo(
    () => ({
      messages: state.messages,
      connected: state.connected,
      sendGroupMessage,
    }),
    [state, sendGroupMessage]
  );

  return <StreamChatContext.Provider value={value} {...rest} />;
}
