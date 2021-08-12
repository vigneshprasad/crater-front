import { PropsWithChildren } from "react";

import { Box } from "../../atoms";

export type ITabBarProps<T> = {
  items: T[];
  renderItem: (item: T) => JSX.Element;
};

export function TabBar<T>({
  items,
  renderItem,
}: PropsWithChildren<ITabBarProps<T>>): JSX.Element {
  return (
    <Box display="flex" flexDirection="row">
      {items.map((item) => renderItem(item))}
    </Box>
  );
}
