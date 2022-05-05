import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";

import { SOCKET_IO_BASE_URL } from "@/common/constants/global.constants";

import { UserPermission } from "../types/auth";
import useAuth from "./AuthContext";

interface ISystemSocketContextState {
  permission?: UserPermission;
}

const SystemSocketContext = createContext({} as ISystemSocketContextState);

type IProviderProps = {
  children?: React.ReactNode | React.ReactNode[];
};

export function SystemSocketProvider({
  children,
}: IProviderProps): JSX.Element {
  const { user } = useAuth();
  const socket = useRef<Socket | null>(null);
  const [permission, setPermission] = useState<UserPermission | undefined>(
    undefined
  );

  useEffect(() => {
    if (socket.current === null && user) {
      socket.current = io(SOCKET_IO_BASE_URL, {
        transports: ["websocket"],
        query: {
          token: user.apiToken,
        },
      });

      socket.current.on("connect", () => {
        socket.current?.emit(
          "user-permission:get",
          {},
          (response: UserPermission) => {
            setPermission(response);
          }
        );
      });

      socket.current.on("user-permission:updated", (data: UserPermission) => {
        setPermission(data);
      });
    }
  }, [socket, user, setPermission]);

  const value = useMemo(() => ({ permission }), [permission]);

  return (
    <SystemSocketContext.Provider value={value}>
      {children}
    </SystemSocketContext.Provider>
  );
}

export default function useSystemSocket(): ISystemSocketContextState {
  const context = useContext(SystemSocketContext);

  if (!context) {
    throw new Error("You need to wrap AuthModalProvider.");
  }

  return context;
}
