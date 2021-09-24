import { useContext } from "react";
import useSWR from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { Room } from "@/community/types/community";

import { RoomContext } from "../context/RoomContext";

export type IUseRoomProps = {
  id?: number;
};

export type IUseRoomState = {
  room?: Room;
  error: unknown;
  loading: boolean;
};

export function useRoom({ id }: IUseRoomProps): IUseRoomState {
  const intial = useContext(RoomContext);
  const { data, error } = useSWR<Room>(
    id ? `${API_URL_CONSTANTS.community.getAllRooms}${id}/` : null,
    { initialData: intial }
  );
  return {
    room: data,
    error,
    loading: !data && !error,
  };
}
