import { createContext } from "react";

import { Room } from "@/creators/types/community";

export const RoomContext = createContext<Room | undefined>(undefined);

export type IRoomProviderProps = {
  intialData: Room;
};

export const RoomProvider = ({ children, intialData }: IRoomProviderProps) => {
  return (
    <RoomContext.Provider value={intialData}>{children}</RoomContext.Provider>
  );
};
