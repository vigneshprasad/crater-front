import { useEffect, useRef } from "react";

const SOCKET_URL = process.env.NEXT_PUBLIC_WEBINAR_SOCKET_URL as string;

interface IUseWebinarSocketResult {
  connected?: boolean;
}

export default function useWebinarSocket(): IUseWebinarSocketResult {
  const _socket = useRef<WebSocket>();

  useEffect(() => {
    _socket.current = new WebSocket(SOCKET_URL);
  }, []);

  console.log(_socket.current);

  return {
    connected: true,
  };
}
