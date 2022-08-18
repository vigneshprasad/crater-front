import { createContext, useCallback, useMemo, useState } from "react";

import { INotifcation, NotificationType } from "./types";

export interface INotificationStackState {
  notifications: INotifcation[];
  showNotification: (
    node: JSX.Element,
    type: NotificationType
  ) => Promise<void>;
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
  const [notifications, setNotifications] = useState<INotifcation[]>([]);

  const showNotification = useCallback(
    async (node: JSX.Element, type: NotificationType) => {},
    []
  );

  const value = useMemo<INotificationStackState>(
    () => ({
      notifications,
      showNotification,
    }),
    [notifications, showNotification]
  );

  return <NotificationStackContext.Provider value={value} {...rest} />;
}
