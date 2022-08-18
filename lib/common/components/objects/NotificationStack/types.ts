export enum NotificationType {
  generic,
}

export type INotifcation = {
  node: JSX.Element;
  shown: boolean;
  type: NotificationType;
};
