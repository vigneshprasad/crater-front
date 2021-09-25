import useSWR from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";

import { Room } from "../../community/types/community";

export type IUseRoomsProps = {
  host?: string;
};
export type IUseRoomsState = {
  rooms?: Room[];
};

export function useRooms({ host }: IUseRoomsProps): IUseRoomsState {
  const url = host
    ? `${API_URL_CONSTANTS.community.getAllRooms}?host=${host}`
    : API_URL_CONSTANTS.community.getAllRooms;
  const { data } = useSWR<Room[]>(url);
  return {
    rooms: data,
  };
}
