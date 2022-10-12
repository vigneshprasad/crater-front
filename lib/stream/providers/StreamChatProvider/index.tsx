import { createContext, useEffect, useMemo, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

import useAuth from "@/auth/context/AuthContext";
import { SOCKET_IO_BASE_URL } from "@/common/constants/global.constants";

import { IChatRoomJoinResponse, IChatRoomUserJoinedResponse } from "./types";

export interface StreamChatContextState {
  room?: string;
  viewerCount?: number;
}

export const StreamChatContext = createContext({} as StreamChatContextState);

type ProviderProps = {
  id: string;
  children?: React.ReactNode | React.ReactNode[];
};

export default function StreamChatProvider({
  id,
  children,
}: ProviderProps): JSX.Element {
  const { user } = useAuth();
  const socket = useRef<Socket | null>(null);
  const [room, setRoom] = useState<string | undefined>(undefined);
  const [viewerCount, setViewerCount] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (socket.current === null && id && user?.apiToken) {
      socket.current = io(`${SOCKET_IO_BASE_URL}/chat`, {
        transports: ["websocket"],
        withCredentials: true,
        query: {
          token: user.apiToken,
        },
      });

      socket.current.on("connect", () => {
        socket.current?.emit(
          "chat:join-room",
          {
            group: id,
          },
          ({ room, viewerCount }: IChatRoomJoinResponse) => {
            setRoom(room);
            setViewerCount(viewerCount);
          }
        );
      });

      socket.current.on(
        "chat:room-joined",
        (payload: IChatRoomUserJoinedResponse) => {
          setViewerCount(payload.viewerCount);
        }
      );

      socket.current.on(
        "chat:room-left",
        (payload: IChatRoomUserJoinedResponse) => {
          setViewerCount(payload.viewerCount);
        }
      );
    }

    return () => {
      if (socket.current) {
        socket.current.close();
        socket.current = null;
      }
    };
  }, [id, socket, user]);

  const value = useMemo(
    () => ({
      room,
      viewerCount,
    }),
    [room, viewerCount]
  );

  return (
    <StreamChatContext.Provider value={value}>
      {children}
    </StreamChatContext.Provider>
  );
}
