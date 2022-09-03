import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { INotifcation, NotificationType } from "./types";

export interface INotificationStackState {
  notifications: JSX.Element[];
  showNotification: (node: JSX.Element) => Promise<void>;
}

export const NotificationStackContext = createContext(
  {} as INotificationStackState
);

type IProviderProps = {
  chldren?: React.ReactNode | undefined;
};

export function NotificationStackProvider({
  ...rest
}: IProviderProps): JSX.Element {
  const [notifications, setNotifications] = useState<JSX.Element[]>([]);

  const showNotification = useCallback(async (node: JSX.Element) => {}, []);

  const value = useMemo<INotificationStackState>(
    () => ({
      notifications,
      showNotification,
    }),
    [notifications, showNotification]
  );

  return <NotificationStackContext.Provider value={value} {...rest} />;
}

export default function useNotificationStackState(): INotificationStackState {
  const context = useContext(NotificationStackContext);

  if (!context) {
    throw new Error("Use NotificationStackProvider in tree");
  }

  return context;
}
