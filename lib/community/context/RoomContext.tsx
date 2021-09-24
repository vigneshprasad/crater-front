import { createContext, PropsWithChildren } from "react";

import { Room } from "@/community/types/community";

export const RoomContext = createContext<Room | undefined>(undefined);

export type IRoomProviderProps = PropsWithChildren<{
  intialData: Room;
}>;

export function RoomProvider({
  children,
  intialData,
}: IRoomProviderProps): JSX.Element {
  return (
    <RoomContext.Provider value={intialData}>{children}</RoomContext.Provider>
  );
}
