import { useSession } from "next-auth/client";
import { useEffect, useRef, useCallback, useState } from "react";

import {
  WSMessageTypes,
  WSWebinarLiveParticipantCount,
} from "../types/community";

const SOCKET_URL = process.env.NEXT_PUBLIC_WEBINAR_SOCKET_URL as string;

interface IUseWebinarSocketResult {
  followerCount: number | null;
}

export default function useWebinarSocket(
  groupId: string
): IUseWebinarSocketResult {
  const [session] = useSession();
  const _socket = useRef<WebSocket>();
  const [followerCount, setFollowerCount] = useState<number | null>(null);
  const interval = useRef<NodeJS.Timer>();

  const messageHandler = useCallback(
    (event: MessageEvent<string>) => {
      if (event.data) {
        const data = JSON.parse(event.data);
        if (data.type === WSMessageTypes.live_count) {
          setFollowerCount((data as WSWebinarLiveParticipantCount).count);
        }
      }
    },
    [setFollowerCount]
  );

  const sendData = useCallback(() => {
    if (_socket.current) {
      const data = {
        event: "live_count",
      };
      _socket.current?.send(JSON.stringify(data));
    }
  }, [_socket]);

  const onInit = useCallback(() => {
    if (_socket.current) {
      if (interval.current) {
        clearInterval(interval.current);
        interval.current = undefined;
      }

      _socket.current.addEventListener("message", messageHandler);
      interval.current = setInterval(sendData, 10000);
    }
  }, [_socket, sendData, messageHandler]);

  useEffect(() => {
    if (session && session.user) {
      const token = session.user.apiToken;
      _socket.current = new WebSocket(
        `${SOCKET_URL}/webinar/${groupId}/${token}/`
      );
      _socket.current.onopen = onInit;
    }

    return () => {
      if (_socket.current) {
        _socket.current.removeEventListener("message", messageHandler);
        _socket.current.close();
        _socket.current = undefined;
      }
    };
  }, [session, groupId, messageHandler, onInit]);

  return {
    followerCount,
  };
}
