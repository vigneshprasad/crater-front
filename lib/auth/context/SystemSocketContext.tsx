import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { useTheme } from "styled-components";

import { useNotifications } from "@/common/components/objects/NotificationStack/context";
import { INotificationData } from "@/common/components/objects/NotificationStack/types";
import { SOCKET_IO_BASE_URL } from "@/common/constants/global.constants";

import { UserPermission } from "../types/auth";
import useAuth from "./AuthContext";

interface ISystemSocketContextState {
  permission?: UserPermission;
  socket: Socket | null;
}

const SystemSocketContext = createContext({} as ISystemSocketContextState);

type IProviderProps = {
  children?: React.ReactNode | React.ReactNode[];
};

export function SystemSocketProvider({
  children,
}: IProviderProps): JSX.Element {
  const { user } = useAuth();
  const { colors } = useTheme();
  const socket = useRef<Socket | null>(null);
  const [permission, setPermission] = useState<UserPermission | undefined>(
    undefined
  );
  const { showNotification } = useNotifications();

  useEffect(() => {
    if (socket.current === null && user) {
      socket.current = io(SOCKET_IO_BASE_URL, {
        transports: ["websocket"],
        withCredentials: true,
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

      socket.current.on("user:notification", (data: INotificationData) => {
        switch (data.type) {
          case "creator-sale-accepted":
            showNotification(
              {
                title: "Payment confirmed by creator",
                description:
                  "Our team will connect you with the creator after the stream ends.",
                iconProps: {
                  icon: "CheckCircle",
                  color: colors.greenSuccess,
                },
              },
              2 * 60 * 1000,
              true
            );
            break;

          case "creator-sale-declined":
            showNotification(
              {
                title: "Payment failed",
                description:
                  "Looks like the payment didn’t go through. Retry or contact us for queries.",
                iconProps: {
                  icon: "AlertCircle",
                  color: colors.error,
                },
              },
              2 * 60 * 1000,
              true
            );
            break;
        }
      });
    }
  }, [socket, user, setPermission, colors, showNotification]);

  const value = useMemo(
    () => ({ permission, socket: socket.current }),
    [permission, socket]
  );

  return (
    <SystemSocketContext.Provider value={value}>
      {children}
    </SystemSocketContext.Provider>
  );
}

export default function useSystemSocket(): ISystemSocketContextState {
  const context = useContext(SystemSocketContext);

  if (!context) {
    throw new Error("You need to wrap SystemSocketProvider.");
  }

  return context;
}
