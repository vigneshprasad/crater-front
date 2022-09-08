import {
  createContext,
  useMemo,
  useState,
  useContext,
  useCallback,
} from "react";

import { NotificationLargeProps } from "./NotficationLarge";
import { NotificationProps } from "./Notification";

export interface NotificationStackContextState {
  notifications: NotificationProps[];
  largeNotfications: NotificationLargeProps[];
  showNotification: (
    props: NotificationProps,
    duration: number,
    autoHide: boolean
  ) => void;
  showLargeNotification: (
    props: NotificationLargeProps,
    duration: number,
    autoHide: boolean
  ) => void;
}

export const NotificationStackContext = createContext(
  {} as NotificationStackContextState
);

type ProviderProps = {
  children?: React.ReactNode | undefined;
};

export function NotificationStackProvider({
  ...rest
}: ProviderProps): JSX.Element {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);
  const [largeNotfications, setLargeNotifications] = useState<
    NotificationLargeProps[]
  >([]);

  const showNotification = useCallback(
    (props: NotificationProps, duration: number, autoHide: boolean) => {
      setNotifications((val) => [
        ...val,
        {
          ...props,
          onClose: () => {
            const updated = notifications.splice(-1);
            setNotifications(updated);
          },
        },
      ]);

      if (autoHide) {
        setTimeout(() => {
          const updated = notifications.splice(-1);
          setNotifications(updated);
        }, duration);
      }
    },
    [setNotifications, notifications]
  );

  const showLargeNotification = useCallback(
    (props: NotificationLargeProps, duration: number, autoHide: boolean) => {
      setLargeNotifications((val) => [
        ...val,
        {
          ...props,
          onClose: () => {
            const updated = largeNotfications.splice(-1);
            setLargeNotifications(updated);
          },
        },
      ]);

      if (autoHide) {
        setTimeout(() => {
          const updated = largeNotfications.splice(-1);
          setLargeNotifications(updated);
        }, duration);
      }
    },
    [setLargeNotifications, largeNotfications]
  );

  const value = useMemo(
    () => ({
      notifications,
      showNotification,
      showLargeNotification,
      largeNotfications,
    }),
    [notifications, showNotification, showLargeNotification, largeNotfications]
  );

  return <NotificationStackContext.Provider value={value} {...rest} />;
}

export function useNotifications(): NotificationStackContextState {
  const context = useContext(NotificationStackContext);

  if (!context) {
    throw new Error("You need to wrap NotificationStackProvider.");
  }

  return context;
}
